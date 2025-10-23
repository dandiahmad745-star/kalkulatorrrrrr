
"use client";

import { useState, useMemo, useTransition, useEffect } from 'react';
import { Bot, Lightbulb, Plus, Shuffle, Sparkles, Star, FlaskConical, ThumbsUp, ThumbsDown } from 'lucide-react';

import type { FlavorProfile, Recipe, IngredientOption, BrandOption, ExperimentResult } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';
import { FLAVOR_PROFILE_KEYS } from '@/lib/definitions';
import { capitalize } from '@/lib/utils';
import { getAIFlavorDescription, getAIExperimentRating } from '@/app/actions';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import CupVisualizer from './cup-visualizer';


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
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [experimentResult, setExperimentResult] = useState<ExperimentResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [toastInfo, setToastInfo] = useState<{ title: string; description: string } | null>(null);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (toastInfo) {
      toast({title: toastInfo.title, description: toastInfo.description});
      setToastInfo(null);
    }
  }, [toastInfo, toast]);

  const handleIngredientChange = (category: keyof Recipe, value: string | number) => {
     setRecipe(prev => {
      const newRecipe = { ...prev, [category]: value };

      if (typeof value === 'string' && value === 'none') {
        const amountKey = `${category}Amount` as keyof Recipe;
        if (amountKey in newRecipe) {
          (newRecipe as any)[amountKey] = 0;
        }
      }

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
      const formatIngredient = (key: keyof Recipe, name: string, brand?: string) => {
        const amountKey = `${key}Amount` as keyof Recipe;
        const amount = recipe[amountKey];
        const unit = ingredientCategories[key as keyof typeof ingredientCategories]?.find(o => o.value === name)?.unit;
        if (name === 'none') return 'none';
        
        let formatted = `${amount}${unit} ${name}`;
        if (brand) {
          formatted += ` (${brand})`;
        }
        return formatted;
      };

      const input = {
        coffeeBeans: formatIngredient('coffeeBeans', recipe.coffeeBeans),
        roastLevel: recipe.roastLevel,
        brewingMethod: formatIngredient('brewingMethod', recipe.brewingMethod),
        milk: formatIngredient('milk', recipe.milk, recipe.milkBrand),
        creamer: formatIngredient('creamer', recipe.creamer, recipe.creamerBrand),
        syrup: formatIngredient('syrup', recipe.syrup, recipe.syrupBrand),
        toppings: formatIngredient('toppings', recipe.toppings, recipe.toppingsBrand),
      };

      if (activeTab === 'profile') {
        setFlavorDescription('');
        setAiSuggestion('');
        const result = await getAIFlavorDescription(input);
        if (result.success) {
          setFlavorDescription(result.data.flavorDescription);
          setAiSuggestion(result.data.suggestion);
        } else {
          toast({ variant: 'destructive', title: 'Error', description: result.error || 'Could not generate AI description.' });
        }
      } else if (activeTab === 'experiment') {
        setExperimentResult(null);
        const result = await getAIExperimentRating(input);
        if (result.success) {
          setExperimentResult(result.data);
        } else {
          toast({ variant: 'destructive', title: 'Error', description: result.error || 'Failed to generate experiment rating.' });
        }
      }
    });
  };

  const flavorProfile = useMemo<FlavorProfile>(() => {
    const baseProfile: FlavorProfile = {
      sweetness: 0, bitterness: 0, acidity: 0, body: 0, aroma: 0, aftertaste: 0, caffeine: 0
    };

    const STANDARD_UNIT = 10; 

    return FLAVOR_PROFILE_KEYS.reduce((profile, key) => {
      let score = 0;
      (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach(cat => {
        const selectedValue = recipe[cat as keyof Recipe] as string;
        const amount = recipe[`${cat}Amount` as keyof Recipe] as number || 0;
        
        const option = ingredientCategories[cat].find(o => o.value === selectedValue);
        const unit = option?.unit;
        const multiplier = amount / (unit === 'g' ? 10 : 15);

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

    const isAmountDisabled = recipe[cat as keyof Recipe] === 'none';
    
    const showAmountInput = unit;

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
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="p-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile"><Star className="mr-2"/> Flavor Profile</TabsTrigger>
                <TabsTrigger value="experiment"><FlaskConical className="mr-2"/> Experiment Mode</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="profile">
              <CardHeader className="pt-0">
                <CardTitle>Your Current Blend</CardTitle>
                <CardDescription>The estimated flavor profile and description of your creation.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-5">
                <div className="md:col-span-2">
                  <h3 className="mb-4 text-center font-semibold">Cup Visualizer</h3>
                  <CupVisualizer recipe={recipe} />
                </div>
                <div className="md:col-span-3">
                  <h3 className="mb-4 text-center font-semibold">Flavor Profile</h3>
                  <FlavorProfileChart profile={flavorProfile} />
                </div>
                <div className="md:col-span-5">
                  <h3 className="mb-2 font-semibold">AI Flavor Description</h3>
                  <Card className="flex-grow flex flex-col p-4 bg-secondary/50 min-h-[150px]">
                    {isPending && activeTab === 'profile' ? (
                      <div className="m-auto flex flex-col items-center gap-2 text-muted-foreground">
                        <SteamingCoffeeIcon className="h-12 w-12" />
                        <span>Brewing description...</span>
                      </div>
                    ) : flavorDescription ? (
                      <div className="space-y-4">
                        <p className="text-sm leading-relaxed">{flavorDescription}</p>
                        {aiSuggestion && (
                          <>
                            <Separator/>
                            <div className="flex items-start gap-3">
                               <Lightbulb className="h-5 w-5 mt-0.5 text-primary flex-shrink-0" />
                              <p className="text-sm text-muted-foreground font-medium">
                                <span className="font-bold text-foreground">Saran:</span> {aiSuggestion}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="m-auto flex flex-col items-center gap-2 text-center text-muted-foreground">
                        <Bot className="h-10 w-10" />
                        <p className="text-sm">Click the button to generate an AI-powered flavor description.</p>
                      </div>
                    )}
                  </Card>
                </div>
              </CardContent>
            </TabsContent>
            
            <TabsContent value="experiment">
               <CardHeader className="pt-0">
                <CardTitle>Experiment Mode</CardTitle>
                <CardDescription>Let the AI rate your experimental creation!</CardDescription>
              </CardHeader>
              <CardContent>
                 <Card className="flex-grow flex flex-col p-4 bg-secondary/50 min-h-[300px]">
                    {isPending && activeTab === 'experiment' ? (
                      <div className="m-auto flex flex-col items-center gap-2 text-muted-foreground">
                        <SteamingCoffeeIcon className="h-12 w-12" />
                        <span>Rating experiment...</span>
                      </div>
                    ) : experimentResult ? (
                      <div className="space-y-4">
                        <div>
                          <Label>Experimental Score</Label>
                          <div className="flex items-center gap-2">
                             <Progress value={experimentResult.experimentalScore} className="w-[60%]" />
                             <span className="font-bold text-lg">{experimentResult.experimentalScore}/100</span>
                          </div>
                        </div>
                        <div>
                           <Label>Suitability for Serving</Label>
                           <div className={`flex items-center gap-2 font-bold ${experimentResult.suitableForServing ? 'text-green-600' : 'text-red-600'}`}>
                              {experimentResult.suitableForServing ? <ThumbsUp/> : <ThumbsDown/>}
                              <span>{experimentResult.suitableForServing ? 'Recommended' : 'Not Recommended'}</span>
                           </div>
                        </div>
                         <Separator/>
                        <div>
                          <Label>Realistic Taste</Label>
                          <p className="text-sm leading-relaxed">{experimentResult.realisticTasteDescription}</p>
                        </div>
                        <div>
                          <Label>Justification</Label>
                          <p className="text-sm text-muted-foreground leading-relaxed">{experimentResult.justification}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="m-auto flex flex-col items-center gap-2 text-center text-muted-foreground">
                        <FlaskConical className="h-10 w-10" />
                        <p className="text-sm">Mix your ingredients, then click the button below to get an AI rating.</p>
                      </div>
                    )}
                  </Card>
              </CardContent>
            </TabsContent>
          </Tabs>

          <div className="p-6 pt-0">
            <Button onClick={handleGenerateDescription} disabled={isPending} className="w-full">
              <Sparkles /> Generate with AI
            </Button>
          </div>
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

    

    