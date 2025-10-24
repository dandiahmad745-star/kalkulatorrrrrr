export type FlavorProfile = {
  sweetness: number;
  bitterness: number;
  acidity: number;
  body: number;
  aroma: number;
  aftertaste: number;
  caffeine: number;
};

export interface BrandOption {
  label: string;
  value: string;
  scores: Partial<FlavorProfile>;
  cost: number; // Cost per ml or g
}

export interface IngredientOption {
  label: string;
  value: string;
  unit: 'g' | 'ml';
  scores: Partial<FlavorProfile>;
  cost: number; // Cost per ml or g
  brands?: BrandOption[];
  color?: string; // e.g., '#6b4f2c'
  brewTime?: number; // Default brew time in seconds
}

export interface Recipe {
  id: string;
  name: string;
  coffeeBeans: string;
  coffeeBeansAmount: number;
  roastLevel: string;
  roastLevelAmount: number; // This might be conceptually odd, but for consistency
  brewingMethod: string;
  brewingMethodAmount: number;
  milk: string;
  milkAmount: number;
  milkBrand?: string;
  creamer: string;
  creamerAmount: number;
  creamerBrand?: string;
  syrup: string;
  syrupAmount: number;
  syrupBrand?: string;
  sweetener: string;
  sweetenerAmount: number;
  sweetenerBrand?: string;
  toppings: string;
  toppingsAmount: number;
  toppingsBrand?: string;
}

export interface ExperimentResult {
  realisticTasteDescription: string;
  suitableForServing: boolean;
  experimentalScore: number;
  justification: string;
}

export type GenerateRecipeFromDescriptionInput = {
  description: string;
};

export type GenerateRecipeFromDescriptionOutput = {
  coffeeBeans: string;
  roastLevel: string;
  brewingMethod: string;
  milk: string;
  milkBrand?: string;
  creamer: string;
  creamerBrand?: string;
  syrup: string;
  syrupBrand?: string;
  toppings: string;
  toppingsBrand?: string;
};

export type GetOptimalBrewTimeInput = {
  brewingMethod: string;
  coffeeAmount: number;
};

export type GetOptimalBrewTimeOutput = {
  optimalTime: number; // in seconds
  justification: string;
};

export const FLAVOR_PROFILE_KEYS: (keyof FlavorProfile)[] = [
  'sweetness',
  'bitterness',
  'acidity',
  'body',
  'aroma',
  'aftertaste',
  'caffeine',
];

export const FLAVOR_PROFILE_CONFIG = {
  sweetness: { label: 'Sweetness', color: 'hsl(var(--chart-1))' },
  bitterness: { label: 'Bitterness', color: 'hsl(var(--chart-2))' },
  acidity: { label: 'Acidity', color: 'hsl(var(--chart-3))' },
  body: { label: 'Body', color: 'hsl(var(--chart-4))' },
  aroma: { label: 'Aroma', color: 'hsl(var(--chart-5))' },
  aftertaste: { label: 'Aftertaste', color: 'hsl(var(--chart-1))' },
  caffeine: { label: 'Caffeine', color: 'hsl(var(--chart-2))' },
} as const;

    
    