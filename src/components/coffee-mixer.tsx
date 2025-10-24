"use client";

import { useState, useMemo, useTransition, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Bot, Lightbulb, Plus, Shuffle, Sparkles, Star, FlaskConical, ThumbsUp, ThumbsDown, Calculator, Timer, Thermometer } from 'lucide-react';
import type { z } from 'genkit';

import type { FlavorProfile, Recipe, IngredientOption, BrandOption, ExperimentResult, TastePreference } from '@/lib/definitions';
import { ingredientCategories, type IngredientCost } from '@/lib/ingredients';
import { FLAVOR_PROFILE_KEYS } from '@/lib/definitions';
import { capitalize } from '@/lib/utils';
import { getAIFlavorDescription, getAIExperimentRating, getAICoffeeName } from '@/app/actions';
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
import CostCalculator from './cost-calculator';
import BaristaMathAssistant from './barista-math-assistant';
import BrewTimer from './brew-timer';
import TemperatureCurve from './temperature-curve';

const initialRecipe: Recipe = {
  id: '',
  name: 'Your Current Blend',
  coffeeBeans: 'arabica',
  coffeeBeansAmount: 18,
  roastLevel: 'medium',
  roastLevelAmount: 18,
  brewingMethod: 'espresso-machine',
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
  sweetener: 'none',
  sweetenerAmount: 0,
  sweetenerBrand: undefined,
  toppings: 'none',
  toppingsAmount: 0,
  toppingsBrand: undefined,
};

const getDefaultCosts = (): IngredientCost => {
  const costs: IngredientCost = {};
  (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach(category => {
    ingredientCategories[category].forEach(ingredient => {
      costs[`${category}__${ingredient.value}`] = ingredient.cost;
      if (ingredient.brands) {
        ingredient.brands.forEach(brand => {
          costs[`${category}__${ingredient.value}__${brand.value}`] = brand.cost;
        });
      }
    });
  });
  return costs;
};

interface CoffeeMixerProps {
  initialTastePreference: TastePreference | null;
}

const CoffeeMixer = forwardRef<{ randomize: (pref: TastePreference) => void }, CoffeeMixerProps>(
  ({ initialTastePreference }, ref) => {
  const [recipe, setRecipe] = useState<Recipe>(initialRecipe);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [flavorDescription, setFlavorDescription] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [experimentResult, setExperimentResult] = useState<ExperimentResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isNamePending, startNameTransition] = useTransition();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [ingredientCosts, setIngredientCosts] = useState<IngredientCost>(getDefaultCosts());

  const handleIngredientChange = (category: keyof Omit<Recipe, 'id' | 'name'>, value: string | number) => {
     setRecipe(prev => {
      const newRecipe = { ...prev, [category]: value };

      if (category === 'coffeeBeans') {
        newRecipe.roastLevelAmount = newRecipe.coffeeBeansAmount;
      } else if (category === 'coffeeBeansAmount') {
        newRecipe.roastLevelAmount = Number(value);
      }


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
              newRecipe[brandKey] = selectedIngredient.brands[0]?.value;
            }
          }
        }
      };
      
      syncBrand('milk', 'milkBrand');
      syncBrand('creamer', 'creamerBrand');
      syncBrand('syrup', 'syrupBrand');
      syncBrand('sweetener', 'sweetenerBrand');
      syncBrand('toppings', 'toppingsBrand');

      return newRecipe;
    });
  };

  const handleRandomize = (preference: TastePreference | null = null) => {
    const randomRecipe: Partial<Recipe> = {};

    const getWeightedRandom = (options: IngredientOption[], scoreKey: keyof FlavorProfile) => {
        const weightedOptions = options.flatMap(option => {
            if (option.value === 'none') return []; // Don't pick 'none' for preferred taste
            const weight = Math.max(1, (option.scores[scoreKey] || 0) * 2);
            return Array(Math.floor(weight)).fill(option);
        });
        const finalOptions = weightedOptions.length > 0 ? weightedOptions : options.filter(o => o.value !== 'none');
        return finalOptions[Math.floor(Math.random() * finalOptions.length)];
    };


    (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach((key) => {
        const options = ingredientCategories[key];
        let randomOption: IngredientOption;

        if (preference) {
            switch (preference.key) {
                case 'sweetness':
                    if (key === 'syrup' || key === 'sweetener') {
                        randomOption = getWeightedRandom(options, 'sweetness');
                    } else {
                        randomOption = options[Math.floor(Math.random() * options.length)];
                    }
                    break;
                case 'bitterness':
                     if (key === 'coffeeBeans') {
                        randomOption = getWeightedRandom(options, 'bitterness');
                    } else if (key === 'roastLevel') {
                        randomOption = ingredientCategories.roastLevel.find(r => r.value === 'dark')!;
                    } else {
                        randomOption = options[Math.floor(Math.random() * options.length)];
                    }
                    break;
                case 'body': // Creamy
                    if (key === 'milk' || key === 'creamer') {
                         randomOption = getWeightedRandom(options, 'body');
                    } else {
                        randomOption = options[Math.floor(Math.random() * options.length)];
                    }
                    break;
                 case 'acidity': // Fruity
                    if (key === 'coffeeBeans' || key === 'roastLevel' || key === 'syrup') {
                         randomOption = getWeightedRandom(options, 'acidity');
                    } else {
                        randomOption = options[Math.floor(Math.random() * options.length)];
                    }
                    break;
                case 'aroma': // Nutty / Aroma
                    if (key === 'syrup' || key === 'creamer') {
                        randomOption = getWeightedRandom(options, 'aroma');
                    } else {
                        randomOption = options[Math.floor(Math.random() * options.length)];
                    }
                    break;
                default:
                    randomOption = options[Math.floor(Math.random() * options.length)];
            }
        } else {
            randomOption = options[Math.floor(Math.random() * options.length)];
        }
        
        if(!randomOption) randomOption = options[Math.floor(Math.random() * options.length)];

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

    setRecipe(prev => ({ ...prev, ...randomRecipe as Recipe, id: '', name: 'Your Current Blend' }));
    toast({ title: preference ? `Recipe for "${preference.label}" Generated!` : 'Random Recipe Generated!', description: 'A new concoction is ready for you.' });
  };
  
  useImperativeHandle(ref, () => ({
    randomize: handleRandomize
  }));


  const handleSaveRecipe = () => {
    const newRecipe = { ...recipe, id: new Date().toISOString() };
    setSavedRecipes((prev) => [newRecipe, ...prev]);
    toast({ title: 'Recipe Saved!', description: 'Your creation has been added to your collection.' });
  };

  const handleDeleteRecipe = (id: string) => {
    setSavedRecipes((prev) => prev.filter((r) => r.id !== id));
  };
  
  const handleCopyRecipe = (recipeToCopy: Recipe) => {
    const text = [
      `Name: ${recipeToCopy.name}`,
      ...Object.entries(recipeToCopy)
        .filter(([key, value]) => key !== 'id' && key !== 'name' && value !== 'none' && value && !key.endsWith('Amount'))
        .map(([key, value]) => {
            const amountKey = `${key}Amount` as keyof Recipe;
            const amount = recipeToCopy[amountKey];
            const unit = ingredientCategories[key as keyof typeof ingredientCategories]?.find(i => i.value === value)?.unit || '';
            return `${capitalize(key.replace(/([A-Z])/g, ' $1'))}: ${capitalize(value as string)} (${amount}${unit})`
        })
    ].join('\n');
    navigator.clipboard.writeText(text);
    toast({ title: 'Recipe Copied!', description: 'Ready to share your masterpiece.' });
  };

  const handleGenerateDescription = () => {
    startTransition(async () => {
      const formatIngredient = (key: keyof Recipe, name: string, brand?: string) => {
        const amountKey = `${key}Amount` as keyof Recipe;
        const amount = recipe[amountKey];
        const unit = ingredientCategories[key as keyof typeof ingredientCategories]?.find(o => o.value === name)?.unit;
        if (name === 'none' || !amount) return 'none';
        
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
        sweetener: formatIngredient('sweetener', recipe.sweetener, recipe.sweetenerBrand),
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

  const handleGenerateName = () => {
    startNameTransition(async () => {
      const getMainFlavor = () => {
        if (recipe.syrup !== 'none') return recipe.syrup;
        if (recipe.creamer !== 'none') return recipe.creamer;
        if (recipe.milk !== 'none') return recipe.milk;
        return 'none';
      };
      
      const input = {
        coffeeBeans: recipe.coffeeBeans,
        roastLevel: recipe.roastLevel,
        brewingMethod: recipe.brewingMethod,
        mainFlavor: getMainFlavor(),
        topping: recipe.toppings,
      };

      const result = await getAICoffeeName(input);
      if (result.success) {
        setRecipe(prev => ({ ...prev, name: result.data.name }));
        toast({ title: 'Name Generated!', description: `Your coffee is now called "${result.data.name}".` });
      } else {
        toast({ variant: 'destructive', title: 'Error', description: result.error || 'Could not generate coffee name.' });
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
        const amount = recipe[`${cat}Amount` as keyof Recipe] as number || 0;
        
        if (!selectedValue || selectedValue === 'none' || amount === 0) {
          return;
        }

        const option = ingredientCategories[cat].find(o => o.value === selectedValue);
        if (!option) return;

        const unit = option?.unit;
        // The multiplier makes the flavor calculation more realistic based on quantity.
        // Base amount for 1x multiplier is 10g or 15ml.
        const multiplier = amount / (unit === 'g' ? 10 : 15);

        if (option.scores[key]) {
          score += (option.scores[key]! * multiplier);
        }

        const brandKey = `${cat}Brand` as keyof Recipe;
        const selectedBrandValue = recipe[brandKey] as string | undefined;

        if (option.brands && selectedBrandValue) {
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
    const selectedIngredient = ingredientCategories[ingredientKey].find(i => i.value === recipe[ingredientKey as keyof Recipe]);
    if (recipe[ingredientKey as keyof Recipe] !== 'none' && selectedIngredient?.brands && selectedIngredient.brands.length > 0) {
      return (
        <div className="space-y-2 mt-2">
          <Label className="text-sm text-muted-foreground">{label}</Label>
          <Select
            value={recipe[brandKey] as string || ''}
            onValueChange={(value) => handleIngredientChange(brandKey as any, value)}
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
              onValueChange={(value) => handleIngredientChange(cat as any, value)}
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
                onChange={(e) => handleIngredientChange(amountKey as any, parseInt(e.target.value, 10) || 0)}
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
      <div className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Coffee Builder</CardTitle>
            <CardDescription>Craft your ideal coffee.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {(Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).map((key) => renderIngredientSelector(key))}
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => handleRandomize(null)} variant="secondary" className="flex-1">
                <Shuffle /> Randomize
              </Button>
              <Button onClick={handleSaveRecipe} className="flex-1">
                <Plus /> Save Recipe
              </Button>
            </div>
          </CardContent>
        </Card>
        <CostCalculator 
          recipe={recipe} 
          costs={ingredientCosts}
          onCostChange={setIngredientCosts}
        />
      </div>

      {/* Right Column: Results & Saved */}
      <div className="space-y-8 lg:col-span-2">
        {/* Current Blend */}
        <Card>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="p-6">
              <TabsList className="grid h-auto w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-5 md:h-10">
                <TabsTrigger value="profile"><Star className="mr-2"/> Flavor Profile</TabsTrigger>
                <TabsTrigger value="experiment"><FlaskConical className="mr-2"/> Experiment</TabsTrigger>
                <TabsTrigger value="temp-curve"><Thermometer className="mr-2"/> Kurva Suhu</TabsTrigger>
                <TabsTrigger value="barista-math"><Calculator className="mr-2"/> Barista Math</TabsTrigger>
                <TabsTrigger value="timer"><Timer className="mr-2"/> Brew Timer</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="profile">
              <CardHeader className="pt-0 flex-row items-center justify-between">
                <div>
                  <CardTitle>{isNamePending ? 'Naming...' : recipe.name}</CardTitle>
                  <CardDescription>The estimated flavor profile and description of your creation.</CardDescription>
                </div>
                <Button onClick={handleGenerateName} size="icon" variant="ghost" disabled={isNamePending}>
                  <Sparkles className="h-5 w-5"/>
                </Button>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-8 md:grid-cols-5">
                <div className="md:col-span-2">
                  <h3 className="mb-4 text-center font-semibold">Cup Visualizer</h3>
                  <CupVisualizer recipe={recipe} flavorProfile={flavorProfile}/>
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

            <TabsContent value="temp-curve">
              <CardHeader className="pt-0">
                <CardTitle>Simulasi Kurva Suhu</CardTitle>
                <CardDescription>Amati bagaimana profil rasa berubah saat kopi mendingin.</CardDescription>
              </CardHeader>
              <CardContent>
                <TemperatureCurve flavorProfile={flavorProfile} />
              </CardContent>
            </TabsContent>

            <TabsContent value="barista-math">
              <CardHeader className="pt-0">
                <CardTitle>Barista Math Assistant</CardTitle>
                <CardDescription>Calculate brew ratio, extraction, and more.</CardDescription>
              </CardHeader>
              <CardContent>
                <BaristaMathAssistant />
              </CardContent>
            </TabsContent>

            <TabsContent value="timer">
              <CardHeader className="pt-0">
                <CardTitle>Brew Timer</CardTitle>
                <CardDescription>Time your brew to perfection with AI recommendations.</CardDescription>
              </CardHeader>
              <CardContent>
                <BrewTimer recipe={recipe} />
              </CardContent>
            </TabsContent>

          </Tabs>

          <div className="p-6 pt-0">
            {(activeTab === 'profile' || activeTab === 'experiment') && (
              <Button onClick={handleGenerateDescription} disabled={isPending} className="w-full">
                <Sparkles /> Generate with AI
              </Button>
            )}
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
});
CoffeeMixer.displayName = 'CoffeeMixer';

export default CoffeeMixer;
