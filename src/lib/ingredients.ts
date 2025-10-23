import type { IngredientOption } from './definitions';

export const coffeeBeans: IngredientOption[] = [
  { label: 'Arabica', value: 'arabica', scores: { acidity: 2, body: 1, caffeine: 2, aroma: 3 } },
  { label: 'Robusta', value: 'robusta', scores: { bitterness: 3, body: 3, caffeine: 4 } },
  { label: 'Liberica', value: 'liberica', scores: { sweetness: 1, bitterness: 2, body: 2, aroma: 1 } },
  { label: 'Excelsa', value: 'excelsa', scores: { acidity: 2, bitterness: 1, body: 1 } },
];

export const roastLevels: IngredientOption[] = [
  { label: 'Light', value: 'light', scores: { acidity: 3, bitterness: 1, body: 1, aroma: 2 } },
  { label: 'Medium', value: 'medium', scores: { sweetness: 1, acidity: 1, bitterness: 2, body: 2, aroma: 1 } },
  { label: 'Dark', value: 'dark', scores: { bitterness: 3, body: 3, aroma: -1 } },
];

export const brewingMethods: IngredientOption[] = [
  { label: 'Espresso', value: 'espresso', scores: { bitterness: 2, body: 3, caffeine: 3, aftertaste: 2 } },
  { label: 'Pour Over', value: 'pour-over', scores: { acidity: 2, body: -1, aroma: 2, aftertaste: 1 } },
  { label: 'French Press', value: 'french-press', scores: { bitterness: 1, body: 2, aftertaste: 1 } },
  { label: 'Cold Brew', value: 'cold-brew', scores: { sweetness: 1, bitterness: -2, acidity: -2, caffeine: 3 } },
];

export const milks: IngredientOption[] = [
  { label: 'None', value: 'none', scores: {} },
  {
    label: 'Whole Milk',
    value: 'whole-milk',
    scores: { sweetness: 1, body: 1, acidity: -1 },
    brands: [
        { label: 'Greenfields', value: 'greenfields', scores: { body: 1, sweetness: 1, aftertaste: 1 } },
        { label: 'Ultra Milk', value: 'ultra-milk', scores: { body: 0, sweetness: 2 } },
    ]
  },
  {
    label: 'SKM',
    value: 'skm',
    scores: { sweetness: 3, body: 2, acidity: -1 },
    brands: [
        { label: 'Frisian Flag', value: 'frisian-flag', scores: { sweetness: 2, body: 1 } },
        { label: 'Indomilk', value: 'indomilk', scores: { sweetness: 2 } }
    ]
  },
  { 
    label: 'Oat Milk', 
    value: 'oat-milk', 
    scores: { sweetness: 2, body: 0 },
    brands: [
        { label: 'Oatly', value: 'oatly', scores: { sweetness: 1, body: 1 } }
    ]
  },
  { 
    label: 'Almond Milk', 
    value: 'almond-milk', 
    scores: { sweetness: 1, aroma: 1 },
    brands: [
        { label: 'Alpro', value: 'alpro', scores: { sweetness: 1, aroma: 0 } }
    ]
  },
];

export const creamers: IngredientOption[] = [
  { label: 'None', value: 'none', scores: {} },
  {
    label: 'Original',
    value: 'original',
    scores: { sweetness: 2, body: 1 },
    brands: [
      { label: 'Coffeemate', value: 'coffeemate', scores: { sweetness: 1, body: 2 } },
      { label: 'Indocafe Creamer', value: 'indocafe', scores: { body: 1 } },
    ]
  },
  { label: 'Vanilla', value: 'vanilla', scores: { sweetness: 3, aroma: 2 } },
  { label: 'Hazelnut', value: 'hazelnut', scores: { sweetness: 2, aroma: 3, aftertaste: 1 } },
  { label: 'Caramel', value: 'caramel-creamer', scores: { sweetness: 4, aftertaste: 2 } },
];

export const syrups: IngredientOption[] = [
  { label: 'None', value: 'none', scores: {} },
  {
    label: 'Caramel',
    value: 'caramel',
    scores: { sweetness: 5, aftertaste: 1 },
    brands: [
      { label: 'Monin', value: 'monin', scores: { sweetness: 1, aroma: 1 } },
      { label: 'DaVinci', value: 'davinci', scores: { sweetness: 2 } },
      { label: 'Torani', value: 'torani', scores: { sweetness: 1, aftertaste: -1 } },
    ],
  },
  {
    label: 'Chocolate',
    value: 'chocolate',
    scores: { sweetness: 4, bitterness: 1, body: 1 },
    brands: [
      { label: 'Monin', value: 'monin', scores: { bitterness: 1 } },
      { label: 'Ghirardelli', value: 'ghirardelli', scores: { body: 1, aftertaste: 1 } },
      { label: 'Torani', value: 'torani', scores: { sweetness: 1 } },
    ],
  },
  {
    label: 'Vanilla',
    value: 'vanilla-syrup',
    scores: { sweetness: 5, aroma: 2 },
    brands: [
      { label: 'Monin', value: 'monin', scores: { aroma: 1 } },
      { label: 'DaVinci', value: 'davinci', scores: {} },
      { label: 'Torani', value: 'torani', scores: { sweetness: 1 } },
    ],
  },
];

export const toppings: IngredientOption[] = [
  { label: 'None', value: 'none', scores: {} },
  { label: 'Whipped Cream', value: 'whipped-cream', scores: { sweetness: 2, body: 1 } },
  {
    label: 'Chocolate Shavings',
    value: 'chocolate-shavings',
    scores: { sweetness: 1, bitterness: 1, aroma: 1 },
    brands: [
        { label: 'Van Houten', value: 'van-houten', scores: { bitterness: 1, body: 1 } },
        { label: 'Cadbury', value: 'cadbury', scores: { sweetness: 1 } },
    ]
  },
  { label: 'Cinnamon', value: 'cinnamon', scores: { aroma: 2, aftertaste: 1 } },
  {
    label: 'Caramel Drizzle',
    value: 'caramel-drizzle',
    scores: { sweetness: 3 },
    brands: [
        { label: 'Monin', value: 'monin', scores: { sweetness: 1 } },
        { label: 'Ghirardelli', value: 'ghirardelli', scores: { aftertaste: 1 } },
    ]
  },
];

export const ingredientCategories = {
  coffeeBeans,
  roastLevel: roastLevels,
  brewingMethod: brewingMethods,
  milk: milks,
  creamer: creamers,
  syrup: syrups,
  toppings: toppings,
};
