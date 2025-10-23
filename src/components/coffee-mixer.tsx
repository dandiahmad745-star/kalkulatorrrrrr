"use client";

import { useState, useMemo, useTransition } from 'react';
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
import FlavorProfileChart from './flavor-profile-chart';
import RecipeCard from './recipe-card';
import { SteamingCoffeeIcon } from './icons';

const initialRecipe: Recipe = {
  id: '',
  coffeeBeans: 'arabica',
  roastLevel: 'medium',
  brewingMethod: 'espresso',
  milk: 'none',
  milkBrand: undefined,
  creamer: 'none',
  creamerBrand: undefined,
  syrup: 'none',
  syrupBrand: undefined,
  toppings: 'none',
  toppingsBrand: undefined,
};

const CoffeeMixer = () => {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [flavorDescription, setFlavorDescription] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleIngredientChange = (category: keyof Recipe, value: string) => {
    setRecipe((prev) => {
      const newRecipe = { ...prev, [category]: value };

      const resetBrandAndSetDefault = (
        ingredientKey: keyof Recipe, 
        brandKey: keyof Recipe, 
        ingredientOptions: IngredientOption[]
      ) => {
        if (category === ingredientKey) {
          if (value === 'none') {
            newRecipe[brandKey] = undefined;
          } else {
            const selectedIngredient = ingredientOptions.find(i => i.value === value);
            newRecipe[brandKey] = selectedIngredient?.brands?.[0]?.value;
          }
        }
      };
      
      resetBrandAndSetDefault('milk', 'milkBrand', ingredientCategories.milk);
      resetBrandAndSetDefault('creamer', 'creamerBrand', ingredientCategories.creamer);
      resetBrandAndSetDefault('syrup', 'syrupBrand', ingredientCategories.syrup);
      resetBrandAndSetDefault('toppings', 'toppingsBrand', ingredientCategories.toppings);

      return newRecipe;
    });
  };

  const handleRandomize = () => {
    const randomRecipe: Partial<Recipe> = {};
    (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach((key) => {
      const options = ingredientCategories[key];
      const randomOption = options[Math.floor(Math.random() * options.length)];
      randomRecipe[key as keyof Recipe] = randomOption.value;
      
      const brandKey = `${key}Brand` as keyof Recipe;
      if (randomOption.value !== 'none' && randomOption.brands) {
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
      .filter(([key, value]) => key !== 'id' && value !== 'none' && value)
      .map(([key, value]) => `${capitalize(key.replace(/([A-Z])/g, ' $1'))}: ${capitalize(value as string)}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    toast({ title: 'Recipe Copied!', description: 'Ready to share your masterpiece.' });
  };

  const handleGenerateDescription = () => {
    startTransition(async () => {
      setFlavorDescription('');
      const formatIngredient = (name: string, brand?: string) => brand ? `${name} (${brand})` : name;
      
      const input = {
        coffeeBeans: recipe.coffeeBeans,
        roastLevel: recipe.roastLevel,
        brewingMethod: recipe.brewingMethod,
        milk: formatIngredient(recipe.milk, recipe.milkBrand),
        creamer: formatIngredient(recipe.creamer, recipe.creamerBrand),
        syrup: formatIngredient(recipe.syrup, recipe.syrupBrand),
        toppings: formatIngredient(recipe.toppings, recipe.toppingsBrand),
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

    return FLAVOR_PROFILE_KEYS.reduce((profile, key) => {
      let score = 0;
      (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach(cat => {
        const selectedValue = recipe[cat as keyof Recipe] as string;
        const option = ingredientCategories[cat].find(o => o.value === selectedValue);
        if (option?.scores[key]) {
          score += option.scores[key]!;
        }

        const brandKey = `${cat}Brand` as keyof Recipe;
        const selectedBrandValue = recipe[brandKey] as string | undefined;

        if (option?.brands && selectedBrandValue) {
          const brand = option.brands.find(b => b.value === selectedBrandValue);
          if (brand?.scores[key]) {
            score += brand.scores[key]!;
          }
        }
      });
      profile[key] = score;
      return profile;
    }, baseProfile);
  }, [recipe]);
  
  const renderBrandSelector = (
    ingredientKey: keyof typeof ingredientCategories, 
    brandKey: keyof Recipe,
    label: string
  ) => {
    const selectedIngredient = ingredientCategories[ingredientKey].find(i => i.value === recipe[ingredientKey]);
    if (recipe[ingredientKey] !== 'none' && selectedIngredient?.brands) {
      return (
        <div className="space-y-2 pl-2 pt-2">
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
            {Object.entries(ingredientCategories).map(([key, options]) => (
              <div key={key} className="space-y-2">
                <Label>{capitalize(key.replace(/([A-Z])/g, ' $1'))}</Label>
                <Select
                  value={recipe[key as keyof Recipe] as string || 'none'}
                  onValueChange={(value) => handleIngredientChange(key as keyof Recipe, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${key}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option: IngredientOption) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {renderBrandSelector(key as keyof typeof ingredientCategories, `${key}Brand` as keyof Recipe, `${capitalize(key)} Brand`)}
              </div>
            ))}
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
