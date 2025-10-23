"use client";

import { useState, useMemo, useEffect, useTransition } from 'react';
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
  creamer: 'none',
  syrup: 'none',
  syrupBrand: undefined,
  toppings: 'none',
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
      // If syrup is changed to none, reset brand
      if (category === 'syrup' && value === 'none') {
        newRecipe.syrupBrand = undefined;
      }
      // If syrup is changed, set default brand if available
      if (category === 'syrup' && value !== 'none') {
        const selectedSyrup = ingredientCategories.syrup.find(s => s.value === value);
        newRecipe.syrupBrand = selectedSyrup?.brands?.[0]?.value;
      }
      return newRecipe;
    });
  };

  const handleRandomize = () => {
    const randomRecipe: Partial<Recipe> = {};
    Object.entries(ingredientCategories).forEach(([key, options]) => {
      const randomOption = options[Math.floor(Math.random() * options.length)];
      randomRecipe[key as keyof Recipe] = randomOption.value;
      if (key === 'syrup' && randomOption.value !== 'none' && randomOption.brands) {
        const randomBrand = randomOption.brands[Math.floor(Math.random() * randomOption.brands.length)];
        randomRecipe.syrupBrand = randomBrand.value;
      }
    });
    setRecipe(prev => ({ ...prev, ...randomRecipe }));
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
      const input = {
        coffeeBeans: recipe.coffeeBeans,
        roastLevel: recipe.roastLevel,
        brewingMethod: recipe.brewingMethod,
        milk: recipe.milk,
        creamer: recipe.creamer,
        syrup: `${recipe.syrup} ${recipe.syrupBrand ? `(${recipe.syrupBrand})` : ''}`,
        toppings: recipe.toppings,
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
      Object.keys(ingredientCategories).forEach(cat => {
        const category = cat as keyof typeof ingredientCategories;
        const selectedValue = recipe[category as keyof Recipe];
        const option = ingredientCategories[category].find(o => o.value === selectedValue);
        if (option?.scores[key]) {
          score += option.scores[key]!;
        }

        if (category === 'syrup' && option?.brands && recipe.syrupBrand) {
          const brand = option.brands.find(b => b.value === recipe.syrupBrand);
          if (brand?.scores[key]) {
            score += brand.scores[key]!;
          }
        }
      });
      profile[key] = score;
      return profile;
    }, baseProfile);
  }, [recipe]);
  
  const currentSyrup = ingredientCategories.syrup.find(s => s.value === recipe.syrup);

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
                {key === 'syrup' && recipe.syrup !== 'none' && currentSyrup?.brands && (
                  <div className="space-y-2 pl-2 pt-2">
                    <Label className="text-sm text-muted-foreground">Syrup Brand</Label>
                    <Select
                      value={recipe.syrupBrand || ''}
                      onValueChange={(value) => handleIngredientChange('syrupBrand', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {currentSyrup.brands.map((brand: BrandOption) => (
                          <SelectItem key={brand.value} value={brand.value}>
                            {brand.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
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
