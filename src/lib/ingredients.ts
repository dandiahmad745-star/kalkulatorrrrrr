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

const syrupBrands = [
  { label: 'Monin', value: 'monin', scores: { sweetness: 1, aroma: 1, aftertaste: 1 } },
  { label: 'DaVinci', value: 'davinci', scores: { sweetness: 2, aftertaste: -1 } },
  { label: 'Torani', value: 'torani', scores: { sweetness: 1, aroma: -1, aftertaste: -1 } },
  { label: 'Ghirardelli', value: 'ghirardelli', scores: { body: 1, aftertaste: 1, bitterness: 1 } },
];

export const syrups: IngredientOption[] = [
  { label: 'None', value: 'none', scores: {} },
  { label: 'Vanilla', value: 'vanilla-syrup', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands },
  { label: 'French Vanilla', value: 'french-vanilla', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: syrupBrands },
  { label: 'Caramel', value: 'caramel', scores: { sweetness: 5, body: 1, aftertaste: 1 }, brands: syrupBrands },
  { label: 'Salted Caramel', value: 'salted-caramel', scores: { sweetness: 4, body: 1, aftertaste: 2 }, brands: syrupBrands },
  { label: 'Hazelnut', value: 'hazelnut-syrup', scores: { sweetness: 3, aroma: 4, aftertaste: 1 }, brands: syrupBrands },
  { label: 'Almond', value: 'almond-syrup', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands },
  { label: 'Macadamia Nut', value: 'macadamia-nut', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: syrupBrands },
  { label: 'Toffee Nut', value: 'toffee-nut', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: syrupBrands },
  { label: 'Butterscotch', value: 'butterscotch', scores: { sweetness: 5, body: 1 }, brands: syrupBrands },
  { label: 'Irish Cream', value: 'irish-cream', scores: { sweetness: 4, body: 2, aroma: 2 }, brands: syrupBrands },
  { label: 'Mocha', value: 'mocha', scores: { sweetness: 3, bitterness: 1, body: 1 }, brands: syrupBrands },
  { label: 'White Chocolate', value: 'white-chocolate', scores: { sweetness: 5, body: 1 }, brands: syrupBrands },
  { label: 'Dark Chocolate', value: 'dark-chocolate', scores: { sweetness: 2, bitterness: 3, body: 1 }, brands: syrupBrands },
  { label: 'Milk Chocolate', value: 'milk-chocolate', scores: { sweetness: 4, bitterness: 1, body: 1 }, brands: syrupBrands },
  { label: 'Peppermint', value: 'peppermint', scores: { sweetness: 3, aroma: 5, aftertaste: 3 }, brands: syrupBrands },
  { label: 'Spearmint', value: 'spearmint', scores: { sweetness: 3, aroma: 4, aftertaste: 2 }, brands: syrupBrands },
  { label: 'Cinnamon', value: 'cinnamon-syrup', scores: { sweetness: 2, aroma: 4, aftertaste: 2 }, brands: syrupBrands },
  { label: 'Gingerbread', value: 'gingerbread', scores: { sweetness: 3, aroma: 4, aftertaste: 2 }, brands: syrupBrands },
  { label: 'Pumpkin Spice', value: 'pumpkin-spice', scores: { sweetness: 3, aroma: 4, body: 1 }, brands: syrupBrands },
  { label: 'Brown Sugar Cinnamon', value: 'brown-sugar-cinnamon', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands },
  { label: 'Maple', value: 'maple', scores: { sweetness: 5, aroma: 2 }, brands: syrupBrands },
  { label: 'Honey', value: 'honey', scores: { sweetness: 4, aroma: 1, aftertaste: 1 }, brands: syrupBrands },
  { label: 'Coconut', value: 'coconut', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands },
  { label: 'Banana', value: 'banana', scores: { sweetness: 4, aroma: 2 }, brands: syrupBrands },
  { label: 'Strawberry', value: 'strawberry', scores: { sweetness: 4, acidity: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Raspberry', value: 'raspberry', scores: { sweetness: 3, acidity: 2, aroma: 2 }, brands: syrupBrands },
  { label: 'Blueberry', value: 'blueberry', scores: { sweetness: 3, acidity: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Blackberry', value: 'blackberry', scores: { sweetness: 3, acidity: 1, aroma: 3 }, brands: syrupBrands },
  { label: 'Cherry', value: 'cherry', scores: { sweetness: 4, acidity: 1 }, brands: syrupBrands },
  { label: 'Peach', value: 'peach', scores: { sweetness: 4, acidity: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Mango', value: 'mango', scores: { sweetness: 5, acidity: 1, aroma: 3 }, brands: syrupBrands },
  { label: 'Pineapple', value: 'pineapple', scores: { sweetness: 4, acidity: 2, aroma: 2 }, brands: syrupBrands },
  { label: 'Passion Fruit', value: 'passion-fruit', scores: { sweetness: 4, acidity: 3, aroma: 3 }, brands: syrupBrands },
  { label: 'Lychee', value: 'lychee', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands },
  { label: 'Watermelon', value: 'watermelon', scores: { sweetness: 3, aroma: 1 }, brands: syrupBrands },
  { label: 'Kiwi', value: 'kiwi', scores: { sweetness: 3, acidity: 2 }, brands: syrupBrands },
  { label: 'Melon', value: 'melon', scores: { sweetness: 3, aroma: 1 }, brands: syrupBrands },
  { label: 'Apple', value: 'apple', scores: { sweetness: 3, acidity: 1 }, brands: syrupBrands },
  { label: 'Green Apple', value: 'green-apple', scores: { sweetness: 2, acidity: 3 }, brands: syrupBrands },
  { label: 'Lemon', value: 'lemon', scores: { sweetness: 2, acidity: 4 }, brands: syrupBrands },
  { label: 'Lime', value: 'lime', scores: { sweetness: 2, acidity: 4 }, brands: syrupBrands },
  { label: 'Orange', value: 'orange', scores: { sweetness: 3, acidity: 3 }, brands: syrupBrands },
  { label: 'Blood Orange', value: 'blood-orange', scores: { sweetness: 3, acidity: 3, bitterness: 1 }, brands: syrupBrands },
  { label: 'Grapefruit', value: 'grapefruit', scores: { sweetness: 2, acidity: 3, bitterness: 2 }, brands: syrupBrands },
  { label: 'Tiramisu', value: 'tiramisu', scores: { sweetness: 4, bitterness: 1, body: 2, aroma: 3 }, brands: syrupBrands },
  { label: 'Cookies & Cream', value: 'cookies-cream', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Cotton Candy', value: 'cotton-candy', scores: { sweetness: 6, aroma: 1 }, brands: syrupBrands },
  { label: 'Bubblegum', value: 'bubblegum', scores: { sweetness: 5, aroma: 2 }, brands: syrupBrands },
  { label: 'Marshmallow', value: 'marshmallow', scores: { sweetness: 5, body: 1, aroma: 1 }, brands: syrupBrands },
  { label: 'Pistachio', value: 'pistachio', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands },
  { label: 'Lavender', value: 'lavender', scores: { sweetness: 2, aroma: 4 }, brands: syrupBrands },
  { label: 'Rose', value: 'rose', scores: { sweetness: 2, aroma: 5 }, brands: syrupBrands },
  { label: 'Jasmine', value: 'jasmine', scores: { sweetness: 1, aroma: 5 }, brands: syrupBrands },
  { label: 'Hibiscus', value: 'hibiscus', scores: { sweetness: 2, acidity: 2, aroma: 3 }, brands: syrupBrands },
  { label: 'Cardamom', value: 'cardamom', scores: { sweetness: 1, aroma: 4, aftertaste: 2 }, brands: syrupBrands },
  { label: 'Chai Spice', value: 'chai-spice', scores: { sweetness: 2, aroma: 5, aftertaste: 2 }, brands: syrupBrands },
  { label: 'Cinnamon Roll', value: 'cinnamon-roll', scores: { sweetness: 5, aroma: 4, body: 1 }, brands: syrupBrands },
  { label: 'Butter Pecan', value: 'butter-pecan', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: syrupBrands },
  { label: 'Almond Praline', value: 'almond-praline', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands },
  { label: 'Nougat', value: 'nougat', scores: { sweetness: 4, body: 1 }, brands: syrupBrands },
  { label: 'Crème Brûlée', value: 'creme-brulee', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Custard', value: 'custard', scores: { sweetness: 4, body: 2 }, brands: syrupBrands },
  { label: 'Biscuit', value: 'biscuit', scores: { sweetness: 2, body: 1 }, brands: syrupBrands },
  { label: 'Cookie Dough', value: 'cookie-dough', scores: { sweetness: 5, body: 1 }, brands: syrupBrands },
  { label: 'Maple Pecan', value: 'maple-pecan', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands },
  { label: 'Peanut Butter', value: 'peanut-butter', scores: { sweetness: 3, body: 2, aroma: 2 }, brands: syrupBrands },
  { label: 'S’mores', value: 'smores', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Candy Cane', value: 'candy-cane', scores: { sweetness: 4, aroma: 4 }, brands: syrupBrands },
  { label: 'Toasted Marshmallow', value: 'toasted-marshmallow', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands },
  { label: 'Chocolate Mint', value: 'chocolate-mint', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: syrupBrands },
  { label: 'Mocha Caramel', value: 'mocha-caramel', scores: { sweetness: 5, body: 1, bitterness: 1 }, brands: syrupBrands },
  { label: 'White Chocolate Raspberry', value: 'white-chocolate-raspberry', scores: { sweetness: 5, acidity: 1, aroma: 2 }, brands: syrupBrands },
  { label: 'Almond Toffee', value: 'almond-toffee', scores: { sweetness: 5, aroma: 2, body: 1 }, brands: syrupBrands },
  { label: 'Brownie Batter', value: 'brownie-batter', scores: { sweetness: 5, body: 2, bitterness: 1 }, brands: syrupBrands },
  { label: 'Honeycomb', value: 'honeycomb', scores: { sweetness: 6 }, brands: syrupBrands },
  { label: 'Coffee Liqueur', value: 'coffee-liqueur', scores: { sweetness: 3, bitterness: 2, body: 1, aroma: 3 }, brands: syrupBrands },
  { label: 'Amaretto', value: 'amaretto', scores: { sweetness: 4, aroma: 4 }, brands: syrupBrands },
  { label: 'Rum Caramel', value: 'rum-caramel', scores: { sweetness: 5, aroma: 3, body: 1 }, brands: syrupBrands },
  { label: 'Bourbon Vanilla', value: 'bourbon-vanilla', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: syrupBrands },
  { label: 'Espresso Roast', value: 'espresso-roast', scores: { sweetness: 1, bitterness: 4, body: 2, aroma: 4 }, brands: syrupBrands },
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
