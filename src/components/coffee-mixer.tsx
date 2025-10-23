
"use client";

import { useState, useMemo, useTransition, useEffect } from 'react';
import { Bot, Plus, Shuffle, Sparkles } from 'lucide-react';

import type { FlavorProfile, Recipe, IngredientOption, BrandOption } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';
import { FLAVOR_PROFILE_KEYS } from '@/lib/definitions';
import { capitalize } from '@/lib/utils';
import { getAIFlavorDescription } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import FlavorProfileChart from './flavor-profile-chart';
import RecipeCard from './recipe-card';
import { SteamingCoffeeIcon } from './icons';

const initialRecipe: Recipe = {
  id: '',
  coffeeBeans: 'arabica',
  coffeeBeansAmount: 18,
  roastLevel: 'medium',
  roastLevelAmount: 18,
  brewingMethod: 'espresso',
  brewingMethodAmount: 40,
  milk: 'none',
  milkAmount: 0,
  milkBrand: undefined,
  creamer: 'none',
  creamerAmount: 0,
  creamerBrand: undefined,
  syrup: 'none',
  syrupAmount: 0,
  syrupBrand: undefined,
  toppings: 'none',
  toppingsAmount: 0,
  toppingsBrand: undefined,
};

const CoffeeMixer = () => {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [flavorDescription, setFlavorDescription] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [toastInfo, setToastInfo] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    if (toastInfo) {
      toast(toastInfo);
      setToastInfo(null);
    }
  }, [toastInfo, toast]);

  const handleIngredientChange = (category: keyof Recipe, value: string | number) => {
     setRecipe(prev => {
      const newRecipe = { ...prev, [category]: value };

      // If ingredient is set to 'none', reset its amount to 0
      if (typeof value === 'string' && value === 'none') {
        const amountKey = `${category}Amount` as keyof Recipe;
        if (amountKey in newRecipe) {
          (newRecipe as any)[amountKey] = 0;
        }
      }

      // If ingredient is changed from 'none' to something else, set a default amount
      if (typeof value === 'string' && value !== 'none' && prev[category as keyof Recipe] === 'none') {
        const amountKey = `${category}Amount` as keyof Recipe;
        if (amountKey in newRecipe) {
           const ingredientOption = ingredientCategories[category as keyof typeof ingredientCategories]?.find(i => i.value === value);
           if(ingredientOption?.unit === 'g') {
             (newRecipe as any)[amountKey] = 10;
           } else {
             (newRecipe as any)[amountKey] = 15;
           }
        }
      }

      const syncBrand = (
        ingredientKey: keyof typeof ingredientCategories,
        brandKey: keyof Recipe
      ) => {
        if (category === ingredientKey) {
          const selectedIngredient = ingredientCategories[ingredientKey].find(i => i.value === value);
          
          if (value === 'none' || !selectedIngredient?.brands || selectedIngredient.brands.length === 0) {
            newRecipe[brandKey] = undefined;
          } else {
            const currentBrand = newRecipe[brandKey] as string | undefined;
            const isBrandCompatible = selectedIngredient.brands.some(b => b.value === currentBrand);

            if (!isBrandCompatible) {
              const defaultBrand = selectedIngredient.brands[0]?.value;
              newRecipe[brandKey] = defaultBrand;
              if (currentBrand) {
                 setToastInfo({
                  title: 'Merek Disesuaikan',
                  description: `Merek sebelumnya tidak tersedia untuk rasa ini, dialihkan ke ${capitalize(defaultBrand || '')}.`,
                });
              }
            }
          }
        }
      };
      
      syncBrand('milk', 'milkBrand');
      syncBrand('creamer', 'creamerBrand');
      syncBrand('syrup', 'syrupBrand');
      syncBrand('toppings', 'toppingsBrand');

      return newRecipe;
    });
  };

  const handleRandomize = () => {
    const randomRecipe: Partial<Recipe> = {};
    (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach((key) => {
      const options = ingredientCategories[key];
      const randomOption = options[Math.floor(Math.random() * options.length)];
      randomRecipe[key as keyof Recipe] = randomOption.value;
      
      const amountKey = `${key}Amount` as keyof Recipe;
      if (randomOption.value === 'none') {
        randomRecipe[amountKey] = 0;
      } else {
        randomRecipe[amountKey] = Math.floor(Math.random() * (randomOption.unit === 'g' ? 20 : 30)) + 5;
      }

      const brandKey = `${key}Brand` as keyof Recipe;
      if (randomOption.value !== 'none' && randomOption.brands && randomOption.brands.length > 0) {
        const randomBrand = randomOption.brands[Math.floor(Math.random() * randomOption.brands.length)];
        randomRecipe[brandKey] = randomBrand.value;
      } else {
        randomRecipe[brandKey] = undefined;
      }
    });

    setRecipe(prev => ({ ...prev, ...randomRecipe as Recipe }));
    toast({ title: 'Random Recipe Generated!', description: 'A new concoction is ready for you.' });
  };


  const handleSaveRecipe = () => {
    const newRecipe = { ...recipe, id: new Date().toISOString() };
    setSavedRecipes((prev) => [newRecipe, ...prev]);
    toast({ title: 'Recipe Saved!', description: 'Your creation has been added to your collection.' });
  };

  const handleDeleteRecipe = (id: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  };
  
  const handleCopyRecipe = (recipeToCopy: Recipe) => {
    const text = Object.entries(recipeToCopy)
      .filter(([key, value]) => key !== 'id' && value !== 'none' && value && !key.endsWith('Amount'))
      .map(([key, value]) => {
          const amountKey = `${key}Amount` as keyof Recipe;
          const amount = recipeToCopy[amountKey];
          const unit = ingredientCategories[key as keyof typeof ingredientCategories]?.find(i => i.value === value)?.unit || '';
          return `${capitalize(key.replace(/([A-Z])/g, ' $1'))}: ${capitalize(value as string)} (${amount}${unit})`
      })
      .join('\n');
    navigator.clipboard.writeText(text);
    toast({ title: 'Recipe Copied!', description: 'Ready to share your masterpiece.' });
  };

  const handleGenerateDescription = () => {
    startTransition(async () => {
      setFlavorDescription('');
      const formatIngredient = (name: string, brand?: string) => brand ? `${name} (${brand})` : name;
      
      const input = {
        coffeeBeans: `${recipe.coffeeBeans} (${recipe.coffeeBeansAmount}g)`,
        roastLevel: recipe.roastLevel,
        brewingMethod: `${recipe.brewingMethod} (${recipe.brewingMethodAmount}ml)`,
        milk: recipe.milk === 'none' ? 'none' : formatIngredient(`${recipe.milkAmount}ml ${recipe.milk}`, recipe.milkBrand),
        creamer: recipe.creamer === 'none' ? 'none' : formatIngredient(`${recipe.creamerAmount}ml ${recipe.creamer}`, recipe.creamerBrand),
        syrup: recipe.syrup === 'none' ? 'none' : formatIngredient(`${recipe.syrupAmount}ml ${recipe.syrup}`, recipe.syrupBrand),
        toppings: recipe.toppings === 'none' ? 'none' : formatIngredient(`${recipe.toppingsAmount}g ${recipe.toppings}`, recipe.toppingsBrand),
      };
      const result = await getAIFlavorDescription(input);
      if (result.success) {
        setFlavorDescription(result.description);
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Could not generate AI description.',
        });
      }
    });
  };

  const flavorProfile = useMemo<FlavorProfile>(() => {
    const baseProfile: FlavorProfile = {
      sweetness: 0, bitterness: 0, acidity: 0, body: 0, aroma: 0, aftertaste: 0, caffeine: 0
    };

    const STANDARD_UNIT = 10; // scores are based on per 10g/ml

    return FLAVOR_PROFILE_KEYS.reduce((profile, key) => {
      let score = 0;
      (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach(cat => {
        const selectedValue = recipe[cat as keyof Recipe] as string;
        const amount = recipe[`${cat}Amount` as keyof Recipe] as number || 0;
        const multiplier = amount / STANDARD_UNIT;

        const option = ingredientCategories[cat].find(o => o.value === selectedValue);
        if (option?.scores[key]) {
          score += (option.scores[key]! * multiplier);
        }

        const brandKey = `${cat}Brand` as keyof Recipe;
        const selectedBrandValue = recipe[brandKey] as string | undefined;

        if (option?.brands && selectedBrandValue) {
          const brand = option.brands.find(b => b.value === selectedBrandValue);
          if (brand?.scores[key]) {
            score += (brand.scores[key]! * multiplier);
          }
        }
      });
      // Clamp the score to a reasonable range, e.g., 0-10, although total can exceed 10
      profile[key] = Math.max(0, score);
      return profile;
    }, baseProfile);
  }, [recipe]);
  
  const renderBrandSelector = (
    ingredientKey: keyof typeof ingredientCategories, 
    brandKey: keyof Recipe,
    label: string
  ) => {
    const selectedIngredient = ingredientCategories[ingredientKey].find(i => i.value === recipe[ingredientKey]);
    if (recipe[ingredientKey] !== 'none' && selectedIngredient?.brands && selectedIngredient.brands.length > 0) {
      return (
        <div className="space-y-2 mt-2">
          <Label className="text-sm text-muted-foreground">{label}</Label>
          <Select
            value={recipe[brandKey] as string || ''}
            onValueChange={(value) => handleIngredientChange(brandKey, value)}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${label}`} />
            </SelectTrigger>
            <SelectContent>
              {selectedIngredient.brands.map((brand: BrandOption) => (
                <SelectItem key={brand.value} value={brand.value}>
                  {brand.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    }
    return null;
  }
  
  const renderIngredientSelector = (cat: keyof typeof ingredientCategories) => {
    const options = ingredientCategories[cat];
    const amountKey = `${cat}Amount` as keyof Recipe;
    const brandKey = `${cat}Brand` as keyof Recipe;
    const selectedOption = options.find(o => o.value === recipe[cat as keyof Recipe]);
    const unit = selectedOption?.unit;

    const isAmountDisabled = recipe[cat as keyof Recipe] === 'none' || cat === 'roastLevel' || cat === 'brewingMethod';
    
    // Special handling for keys that shouldn't show amount inputs like roastLevel or brewingMethod if they act as modifiers
    const showAmountInput = unit && cat !== 'roastLevel' && cat !== 'brewingMethod';

    return (
      <div key={cat} className="space-y-2">
        <Label>{capitalize(cat.replace(/([A-Z])/g, ' $1'))}</Label>
        <div className={`grid gap-2 ${showAmountInput ? 'grid-cols-3' : 'grid-cols-1'}`}>
          <div className={`${showAmountInput ? 'col-span-2' : 'col-span-1'}`}>
            <Select
              value={recipe[cat as keyof Recipe] as string || 'none'}
              onValueChange={(value) => handleIngredientChange(cat as keyof Recipe, value)}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Select ${cat}`} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option: IngredientOption) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {showAmountInput && (
            <div className="relative">
              <Input
                type="number"
                value={recipe[amountKey] as number}
                onChange={(e) => handleIngredientChange(amountKey, parseInt(e.target.value, 10) || 0)}
                className="pr-8"
                disabled={isAmountDisabled}
              />
              <span className="absolute inset-y-0 right-3 flex items-center text-sm text-muted-foreground">
                {unit}
              </span>
            </div>
          )}
        </div>
        {renderBrandSelector(cat, brandKey, `${capitalize(cat)} Brand`)}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Left Column: Builder */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Coffee Builder</CardTitle>
            <CardDescription>Craft your ideal coffee.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.keys(ingredientCategories).map((key) => renderIngredientSelector(key as keyof typeof ingredientCategories))}
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleRandomize} variant="secondary" className="flex-1">
                <Shuffle /> Randomize
              </Button>
              <Button onClick={handleSaveRecipe} className="flex-1">
                <Plus /> Save Recipe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Results & Saved */}
      <div className="space-y-8 lg:col-span-2">
        {/* Current Blend */}
        <Card>
          <CardHeader>
            <CardTitle>Your Current Blend</CardTitle>
            <CardDescription>The estimated flavor profile and description of your creation.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-center font-semibold">Flavor Profile</h3>
              <FlavorProfileChart profile={flavorProfile} />
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-semibold">AI Flavor Description</h3>
              <Card className="flex-grow flex flex-col p-4 bg-secondary/50">
                {isPending ? (
                  <div className="m-auto flex flex-col items-center gap-2 text-muted-foreground">
                    <SteamingCoffeeIcon className="h-12 w-12" />
                    <span>Brewing description...</span>
                  </div>
                ) : flavorDescription ? (
                  <p className="text-sm leading-relaxed">{flavorDescription}</p>
                ) : (
                  <div className="m-auto flex flex-col items-center gap-2 text-center text-muted-foreground">
                    <Bot className="h-10 w-10" />
                    <p className="text-sm">Click the button to generate an AI-powered flavor description.</p>
                  </div>
                )}
              </Card>
              <Button onClick={handleGenerateDescription} disabled={isPending} className="mt-4 w-full">
                <Sparkles /> Generate with AI
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Saved Recipes */}
        {savedRecipes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Saved Recipes</CardTitle>
              <CardDescription>Your personal collection of coffee creations.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] w-full">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {savedRecipes.map((saved) => (
                    <RecipeCard key={saved.id} recipe={saved} onCopy={handleCopyRecipe} onDelete={handleDeleteRecipe} />
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CoffeeMixer;
