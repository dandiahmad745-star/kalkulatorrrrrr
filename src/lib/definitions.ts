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
}

export interface IngredientOption {
  label: string;
  value: string;
  scores: Partial<FlavorProfile>;
  brands?: BrandOption[];
}

export interface Recipe {
  id: string;
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
}

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
