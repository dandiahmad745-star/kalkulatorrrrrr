import type { IngredientOption } from './definitions';

// Scores are calculated per 10g or 10ml
export const coffeeBeans: IngredientOption[] = [
  { label: 'Arabica', value: 'arabica', unit: 'g', scores: { acidity: 2, body: 1, caffeine: 2, aroma: 3 }, color: '#4b382a' },
  { label: 'Robusta', value: 'robusta', unit: 'g', scores: { bitterness: 3, body: 3, caffeine: 4 }, color: '#3d2d1f' },
  { label: 'Liberica', value: 'liberica', unit: 'g', scores: { sweetness: 1, bitterness: 2, body: 2, aroma: 1 }, color: '#5a422d' },
  { label: 'Excelsa', value: 'excelsa', unit: 'g', scores: { acidity: 2, bitterness: 1, body: 1 }, color: '#604a36' },
];

export const roastLevels: IngredientOption[] = [
  { label: 'Light', value: 'light', unit: 'g', scores: { acidity: 3, bitterness: 1, body: 1, aroma: 2 }, color: '#c5a98b' },
  { label: 'Medium', value: 'medium', unit: 'g', scores: { sweetness: 1, acidity: 1, bitterness: 2, body: 2, aroma: 1 }, color: '#8b6b4f' },
  { label: 'Dark', value: 'dark', unit: 'g', scores: { bitterness: 3, body: 3, aroma: -1 }, color: '#5a3a22' },
];

export const brewingMethods: IngredientOption[] = [
  // Brewing methods affect extraction, not really 'amount', but we keep unit for consistency
  { label: 'Espresso', value: 'espresso', unit: 'ml', scores: { bitterness: 2, body: 3, caffeine: 3, aftertaste: 2 }, color: '#3d2b1f' },
  { label: 'Pour Over', value: 'pour-over', unit: 'ml', scores: { acidity: 2, body: -1, aroma: 2, aftertaste: 1 }, color: '#6b4f2c' },
  { label: 'French Press', value: 'french-press', unit: 'ml', scores: { bitterness: 1, body: 2, aftertaste: 1 }, color: '#533c23' },
  { label: 'Cold Brew', value: 'cold-brew', unit: 'ml', scores: { sweetness: 1, bitterness: -2, acidity: -2, caffeine: 3 }, color: '#4a2c1a' },
];

export const milks: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'ml', scores: {}, color: 'transparent' },
  {
    label: 'Whole Milk',
    value: 'whole-milk',
    unit: 'ml',
    scores: { sweetness: 1, body: 1, acidity: -1 },
    color: '#fffbf5',
    brands: [
        { label: 'Greenfields', value: 'greenfields', scores: { body: 1, sweetness: 1, aftertaste: 1 } },
        { label: 'Ultra Milk', value: 'ultra-milk', scores: { body: 0, sweetness: 2 } },
    ]
  },
  {
    label: 'SKM',
    value: 'skm',
    unit: 'ml',
    scores: { sweetness: 3, body: 2, acidity: -1 },
    color: '#fff5e8',
    brands: [
        { label: 'Frisian Flag', value: 'frisian-flag', scores: { sweetness: 2, body: 1 } },
        { label: 'Indomilk', value: 'indomilk', scores: { sweetness: 2 } }
    ]
  },
  { 
    label: 'Oat Milk', 
    value: 'oat-milk', 
    unit: 'ml',
    scores: { sweetness: 2, body: 0 },
    color: '#f5f1e8',
    brands: [
        { label: 'Oatly', value: 'oatly', scores: { sweetness: 1, body: 1 } }
    ]
  },
  { 
    label: 'Almond Milk', 
    value: 'almond-milk', 
    unit: 'ml',
    scores: { sweetness: 1, aroma: 1 },
    color: '#f7f2ea',
    brands: [
        { label: 'Alpro', value: 'alpro', scores: { sweetness: 1, aroma: 0 } }
    ]
  },
];

const creamerBrands = [
  { label: 'Coffeemate', value: 'coffeemate', scores: { sweetness: 1, body: 2 } },
  { label: 'Indocafe Creamer', value: 'indocafe', scores: { body: 1 } },
  { label: 'International Delight', value: 'international-delight', scores: { sweetness: 2, aroma: 1 } },
  { label: 'Starbucks Creamer', value: 'starbucks', scores: { sweetness: 1, body: 1, aroma: 1 } },
  { label: 'Max Creamer', value: 'max-creamer', scores: { sweetness: 2, body: 1 } },
  { label: 'Tropicana Slim Creamer', value: 'tropicana-slim', scores: { sweetness: 0, body: 0 } },
];

export const creamers: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'ml', scores: {}, brands: creamerBrands, color: 'transparent' },
  { label: 'Original', value: 'original', unit: 'ml', scores: { sweetness: 2, body: 1 }, brands: creamerBrands.slice(0, 5), color: '#fff8f0' },
  { label: 'Sweet Cream', value: 'sweet-cream', unit: 'ml', scores: { sweetness: 3, body: 2 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#fffaf5' },
  { label: 'French Vanilla', value: 'french-vanilla-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f8f5ee' },
  { label: 'Vanilla Bean', value: 'vanilla-bean', unit: 'ml', scores: { sweetness: 3, aroma: 4 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#f7f4ed' },
  { label: 'Caramel', value: 'caramel-creamer', unit: 'ml', scores: { sweetness: 4, aftertaste: 2 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f2eada' },
  { label: 'Salted Caramel', value: 'salted-caramel-creamer', unit: 'ml', scores: { sweetness: 3, body: 1, aftertaste: 2 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#f0e8d8' },
  { label: 'Hazelnut', value: 'hazelnut-creamer', unit: 'ml', scores: { sweetness: 2, aroma: 3, aftertaste: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f3efea' },
  { label: 'Toffee Nut', value: 'toffee-nut-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: [creamerBrands[3]], color: '#e9e1d3' },
  { label: 'Irish Cream', value: 'irish-cream-creamer', unit: 'ml', scores: { sweetness: 4, body: 2, aroma: 2 }, brands: [creamerBrands[2]], color: '#f0ede7' },
  { label: 'Crème Brûlée', value: 'creme-brulee-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: [creamerBrands[2]], color: '#f5efe1' },
  { label: 'Butter Pecan', value: 'butter-pecan-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: [creamerBrands[2]], color: '#ede6d9' },
  { label: 'Amaretto', value: 'amaretto-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: [creamerBrands[2]], color: '#f3eee9' },
  { label: 'Chocolate', value: 'chocolate-creamer', unit: 'ml', scores: { sweetness: 3, bitterness: 1 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#dcd1c6' },
  { label: 'Mocha', value: 'mocha-creamer', unit: 'ml', scores: { sweetness: 3, bitterness: 1, body: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#c9bbae' },
  { label: 'White Chocolate', value: 'white-chocolate-creamer', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#fdfaf5' },
  { label: 'Chocolate Hazelnut', value: 'chocolate-hazelnut', unit: 'ml', scores: { sweetness: 4, aroma: 3, bitterness: 1 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#d6c6b8' },
  { label: 'Toffee', value: 'toffee', unit: 'ml', scores: { sweetness: 5 }, brands: [creamerBrands[2]], color: '#e0d5c6' },
  { label: 'Butterscotch', value: 'butterscotch-creamer', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: [creamerBrands[2]], color: '#e8dccb' },
  { label: 'Cookies & Cream', value: 'cookies-cream-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#e6e2de' },
  { label: 'Cookie Dough', value: 'cookie-dough-creamer', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: [creamerBrands[2]], color: '#eaddd0' },
  { label: 'Cinnamon', value: 'cinnamon-creamer', unit: 'ml', scores: { sweetness: 2, aroma: 4, aftertaste: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#f1e9e1' },
  { label: 'Cinnamon Roll', value: 'cinnamon-roll-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 4, body: 1 }, brands: [creamerBrands[2]], color: '#f3eae2' },
  { label: 'Pumpkin Spice', value: 'pumpkin-spice-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 4, body: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f5e7d8' },
  { label: 'Peppermint Mocha', value: 'peppermint-mocha', unit: 'ml', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f0e5e0' },
  { label: 'Peppermint', value: 'peppermint-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 5, aftertaste: 3 }, brands: [creamerBrands[2]], color: '#f8f8f8' },
  { label: 'Mint Chocolate', value: 'mint-chocolate', unit: 'ml', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: [creamerBrands[2]], color: '#e5dcd7' },
  { label: 'Maple', value: 'maple-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [creamerBrands[2]], color: '#efdfc6' },
  { label: 'Maple Pecan', value: 'maple-pecan-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: [creamerBrands[2]], color: '#e8d9c4' },
  { label: 'Honey', value: 'honey-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 1, aftertaste: 1 }, brands: [], color: '#f8eecf' },
  { label: 'Honey Vanilla', value: 'honey-vanilla', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: [], color: '#f6eccb' },
  { label: 'Vanilla Caramel', value: 'vanilla-caramel', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#f2e8d5' },
  { label: 'Coconut', value: 'coconut-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#f9f6f1' },
  { label: 'Coconut Cream', value: 'coconut-cream', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: [creamerBrands[2]], color: '#faf8f4' },
  { label: 'Coconut Caramel', value: 'coconut-caramel', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: [creamerBrands[3]], color: '#f5eee3' },
  { label: 'Almond', value: 'almond-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [creamerBrands[2]], color: '#f7f2eb' },
  { label: 'Almond Vanilla', value: 'almond-vanilla', unit: 'ml', scores: { sweetness: 3, aroma: 4 }, brands: [], color: '#f6f1ea' },
  { label: 'Almond Caramel', value: 'almond-caramel', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: [], color: '#f3ebe0' },
  { label: 'Oat Sweet Cream', value: 'oat-sweet-cream', unit: 'ml', scores: { sweetness: 3, body: 1 }, brands: [], color: '#f5f1e8' },
  { label: 'Oat Vanilla', value: 'oat-vanilla', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [], color: '#f4f0e7' },
  { label: 'Oat Hazelnut', value: 'oat-hazelnut', unit: 'ml', scores: { sweetness: 2, aroma: 4 }, brands: [], color: '#f3efea' },
  { label: 'Macadamia Nut', value: 'macadamia-nut-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: [creamerBrands[3]], color: '#f4f0eb' },
  { label: 'Pistachio', value: 'pistachio-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [creamerBrands[2]], color: '#f0f3ea' },
  { label: 'Brown Sugar', value: 'brown-sugar', unit: 'ml', scores: { sweetness: 4 }, brands: [creamerBrands[0]], color: '#e6d8c8' },
  { label: 'Brown Sugar Cinnamon', value: 'brown-sugar-cinnamon-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: [creamerBrands[0]], color: '#e5d7c8' },
  { label: 'Chai Spice', value: 'chai-spice-creamer', unit: 'ml', scores: { sweetness: 2, aroma: 5, aftertaste: 2 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#e8dccf' },
  { label: 'Tiramisu', value: 'tiramisu-creamer', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 2, aroma: 3 }, brands: [creamerBrands[2]], color: '#e8e0d4' },
  { label: 'S’mores', value: 'smores-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#e2d8ce' },
  { label: 'Marshmallow', value: 'marshmallow-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 1 }, brands: [creamerBrands[2]], color: '#f8f8f8' },
  { label: 'Toasted Marshmallow', value: 'toasted-marshmallow-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: [creamerBrands[3]], color: '#f5f0e9' },
  { label: 'Cotton Candy', value: 'cotton-candy-creamer', unit: 'ml', scores: { sweetness: 6, aroma: 1 }, brands: [creamerBrands[2]], color: '#fdeff2' },
  { label: 'Birthday Cake', value: 'birthday-cake', unit: 'ml', scores: { sweetness: 6, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#fcf8e8' },
  { label: 'Sugar Cookie', value: 'sugar-cookie', unit: 'ml', scores: { sweetness: 5 }, brands: [creamerBrands[0]], color: '#fcf8f0' },
  { label: 'Vanilla Bourbon', value: 'vanilla-bourbon', unit: 'ml', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: [], color: '#f5efde' },
  { label: 'Vanilla Latte', value: 'vanilla-latte', unit: 'ml', scores: { sweetness: 4, caffeine: 1 }, brands: [creamerBrands[2]], color: '#f2ece3' },
  { label: 'Caramel Latte', value: 'caramel-latte', unit: 'ml', scores: { sweetness: 5, caffeine: 1 }, brands: [], color: '#efeadf' },
  { label: 'Caramel Macchiato', value: 'caramel-macchiato', unit: 'ml', scores: { sweetness: 5, body: 1, caffeine: 1 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#f0e8de' },
  { label: 'Mocha Latte', value: 'mocha-latte', unit: 'ml', scores: { sweetness: 4, bitterness: 1, caffeine: 1 }, brands: [creamerBrands[2]], color: '#dcd1c6' },
  { label: 'Chocolate Truffle', value: 'chocolate-truffle', unit: 'ml', scores: { sweetness: 5, bitterness: 2, body: 2 }, brands: [], color: '#b9a79a' },
  { label: 'Chocolate Mocha', value: 'chocolate-mocha', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 1, caffeine: 1 }, brands: [], color: '#c3b3a5' },
  { label: 'White Chocolate Raspberry', value: 'white-chocolate-raspberry-creamer', unit: 'ml', scores: { sweetness: 5, acidity: 1, aroma: 2 }, brands: [creamerBrands[2]], color: '#fceef2' },
  { label: 'Raspberry Cheesecake', value: 'raspberry-cheesecake', unit: 'ml', scores: { sweetness: 5, acidity: 1, body: 1 }, brands: [], color: '#fbe9ed' },
  { label: 'Strawberry Cream', value: 'strawberry-cream', unit: 'ml', scores: { sweetness: 5, acidity: 1 }, brands: [creamerBrands[2]], color: '#fceef0' },
  { label: 'Banana Cream', value: 'banana-cream', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [], color: '#fcf8e8' },
  { label: 'Coconut Mocha', value: 'coconut-mocha', unit: 'ml', scores: { sweetness: 4, aroma: 3, bitterness: 1 }, brands: [], color: '#ded5cd' },
  { label: 'Maple Walnut', value: 'maple-walnut', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [], color: '#e6d8c3' },
  { label: 'Vanilla Almond', value: 'vanilla-almond', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: [], color: '#f6f1ea' },
  { label: 'Coffeehouse Blend', value: 'coffeehouse-blend', unit: 'ml', scores: { body: 1, caffeine: 1 }, brands: [], color: '#e2d8d0' },
  { label: 'Classic Cream', value: 'classic-cream', unit: 'ml', scores: { body: 2 }, brands: [creamerBrands[1], creamerBrands[4]], color: '#fff9f2' },
  { label: 'Velvety Cream', value: 'velvety-cream', unit: 'ml', scores: { body: 3 }, brands: [], color: '#fffbf5' },
  { label: 'Oat & Almond Blend', value: 'oat-almond-blend', unit: 'ml', scores: { body: 1, sweetness: 2 }, brands: [], color: '#f6f2e9' },
  { label: 'Coconut & Caramel Blend', value: 'coconut-caramel-blend', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: [], color: '#f5eee3' },
  { label: 'Zero Sugar Vanilla', value: 'zero-sugar-vanilla', unit: 'ml', scores: { sweetness: 1, aroma: 3 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f8f5f0' },
  { label: 'Zero Sugar Hazelnut', value: 'zero-sugar-hazelnut', unit: 'ml', scores: { sweetness: 1, aroma: 3 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f3efea' },
  { label: 'Zero Sugar Caramel', value: 'zero-sugar-caramel', unit: 'ml', scores: { sweetness: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f2eada' },
  { label: 'Zero Sugar Sweet Cream', value: 'zero-sugar-sweet-cream', unit: 'ml', scores: { sweetness: 1, body: 2 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f8f6f2' },
];

const syrupBrands = [
  { label: 'Monin', value: 'monin', scores: { sweetness: 1, aroma: 1, aftertaste: 1 } },
  { label: 'DaVinci', value: 'davinci', scores: { sweetness: 2, aftertaste: -1 } },
  { label: 'Torani', value: 'torani', scores: { sweetness: 1, aroma: -1, aftertaste: -1 } },
  { label: 'Ghirardelli', value: 'ghirardelli', scores: { body: 1, aftertaste: 1, bitterness: 1 } },
];

export const syrups: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'ml', scores: {}, brands: syrupBrands, color: 'transparent' },
  { label: 'Vanilla', value: 'vanilla-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands, color: '#f8f0e3' },
  { label: 'French Vanilla', value: 'french-vanilla-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: syrupBrands, color: '#f5e8d5' },
  { label: 'Caramel', value: 'caramel-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aftertaste: 1 }, brands: syrupBrands, color: '#c68f4b' },
  { label: 'Salted Caramel', value: 'salted-caramel-syrup', unit: 'ml', scores: { sweetness: 4, body: 1, aftertaste: 2 }, brands: syrupBrands, color: '#b8814a' },
  { label: 'Hazelnut', value: 'hazelnut-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, aftertaste: 1 }, brands: syrupBrands, color: '#d4a77e' },
  { label: 'Almond', value: 'almond-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands, color: '#e5d4c1' },
  { label: 'Macadamia Nut', value: 'macadamia-nut-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: syrupBrands, color: '#e9dccd' },
  { label: 'Toffee Nut', value: 'toffee-nut-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: syrupBrands, color: '#c0956d' },
  { label: 'Butterscotch', value: 'butterscotch-syrup', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: syrupBrands, color: '#d89f53' },
  { label: 'Irish Cream', value: 'irish-cream-syrup', unit: 'ml', scores: { sweetness: 4, body: 2, aroma: 2 }, brands: syrupBrands, color: '#e6d9c8' },
  { label: 'Mocha', value: 'mocha-syrup', unit: 'ml', scores: { sweetness: 3, bitterness: 1, body: 1 }, brands: syrupBrands, color: '#8b6b5c' },
  { label: 'White Chocolate', value: 'white-chocolate-syrup', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: syrupBrands, color: '#fcf6f0' },
  { label: 'Dark Chocolate', value: 'dark-chocolate-syrup', unit: 'ml', scores: { sweetness: 2, bitterness: 3, body: 1 }, brands: syrupBrands, color: '#583a2e' },
  { label: 'Milk Chocolate', value: 'milk-chocolate-syrup', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 1 }, brands: syrupBrands, color: '#a07a65' },
  { label: 'Peppermint', value: 'peppermint-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 5, aftertaste: 3 }, brands: syrupBrands, color: '#f0fcfc' },
  { label: 'Spearmint', value: 'spearmint-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#e6f7f2' },
  { label: 'Cinnamon', value: 'cinnamon-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#d9a37c' },
  { label: 'Gingerbread', value: 'gingerbread-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#b57a4a' },
  { label: 'Pumpkin Spice', value: 'pumpkin-spice-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, body: 1 }, brands: syrupBrands, color: '#d88e4e' },
  { label: 'Brown Sugar Cinnamon', value: 'brown-sugar-cinnamon-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands, color: '#c9935f' },
  { label: 'Maple', value: 'maple-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: syrupBrands, color: '#b87333' },
  { label: 'Honey', value: 'honey-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 1, aftertaste: 1 }, brands: syrupBrands, color: '#f6bb42' },
  { label: 'Coconut', value: 'coconut-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands, color: '#f5f5f5' },
  { label: 'Banana', value: 'banana-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: syrupBrands, color: '#fcf4a3' },
  { label: 'Strawberry', value: 'strawberry-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#e54561' },
  { label: 'Raspberry', value: 'raspberry-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 2, aroma: 2 }, brands: syrupBrands, color: '#c02a54' },
  { label: 'Blueberry', value: 'blueberry-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#7b579f' },
  { label: 'Blackberry', value: 'blackberry-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 1, aroma: 3 }, brands: syrupBrands, color: '#5e3a5a' },
  { label: 'Cherry', value: 'cherry-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 1 }, brands: syrupBrands, color: '#a11a36' },
  { label: 'Peach', value: 'peach-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#fbc17d' },
  { label: 'Mango', value: 'mango-syrup', unit: 'ml', scores: { sweetness: 5, acidity: 1, aroma: 3 }, brands: syrupBrands, color: '#ffb833' },
  { label: 'Pineapple', value: 'pineapple-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 2, aroma: 2 }, brands: syrupBrands, color: '#f8d448' },
  { label: 'Passion Fruit', value: 'passion-fruit-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 3, aroma: 3 }, brands: syrupBrands, color: '#f7aa01' },
  { label: 'Lychee', value: 'lychee-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands, color: '#f8e4e0' },
  { label: 'Watermelon', value: 'watermelon-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 1 }, brands: syrupBrands, color: '#fa7e8a' },
  { label: 'Kiwi', value: 'kiwi-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 2 }, brands: syrupBrands, color: '#a4c24a' },
  { label: 'Melon', value: 'melon-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 1 }, brands: syrupBrands, color: '#c8e698' },
  { label: 'Apple', value: 'apple-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 1 }, brands: syrupBrands, color: '#e8d282' },
  { label: 'Green Apple', value: 'green-apple-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 3 }, brands: syrupBrands, color: '#c5d964' },
  { label: 'Lemon', value: 'lemon-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 4 }, brands: syrupBrands, color: '#f7da4c' },
  { label: 'Lime', value: 'lime-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 4 }, brands: syrupBrands, color: '#c0d93f' },
  { label: 'Orange', value: 'orange-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 3 }, brands: syrupBrands, color: '#f6921e' },
  { label: 'Blood Orange', value: 'blood-orange-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 3, bitterness: 1 }, brands: syrupBrands, color: '#e04928' },
  { label: 'Grapefruit', value: 'grapefruit-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 3, bitterness: 2 }, brands: syrupBrands, color: '#f3735a' },
  { label: 'Tiramisu', value: 'tiramisu-syrup', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 2, aroma: 3 }, brands: syrupBrands, color: '#d4b79b' },
  { label: 'Cookies & Cream', value: 'cookies-cream-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands, color: '#e8e2db' },
  { label: 'Cotton Candy', value: 'cotton-candy-syrup', unit: 'ml', scores: { sweetness: 6, aroma: 1 }, brands: syrupBrands, color: '#fdeff2' },
  { label: 'Bubblegum', value: 'bubblegum-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: syrupBrands, color: '#f7c3e0' },
  { label: 'Marshmallow', value: 'marshmallow-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 1 }, brands: syrupBrands, color: '#fafafa' },
  { label: 'Pistachio', value: 'pistachio-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands, color: '#d8e4c3' },
  { label: 'Lavender', value: 'lavender-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 4 }, brands: syrupBrands, color: '#d3c5e5' },
  { label: 'Rose', value: 'rose-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 5 }, brands: syrupBrands, color: '#f5d1d8' },
  { label: 'Jasmine', value: 'jasmine-syrup', unit: 'ml', scores: { sweetness: 1, aroma: 5 }, brands: syrupBrands, color: '#fcf8e3' },
  { label: 'Hibiscus', value: 'hibiscus-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 2, aroma: 3 }, brands: syrupBrands, color: '#d94c79' },
  { label: 'Cardamom', value: 'cardamom-syrup', unit: 'ml', scores: { sweetness: 1, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#e8d8c3' },
  { label: 'Chai Spice', value: 'chai-spice-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 5, aftertaste: 2 }, brands: syrupBrands, color: '#c9a17e' },
  { label: 'Cinnamon Roll', value: 'cinnamon-roll-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 4, body: 1 }, brands: syrupBrands, color: '#e6c3a5' },
  { label: 'Butter Pecan', value: 'butter-pecan-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: syrupBrands, color: '#c9a987' },
  { label: 'Almond Praline', value: 'almond-praline-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands, color: '#c49c7a' },
  { label: 'Nougat', value: 'nougat-syrup', unit: 'ml', scores: { sweetness: 4, body: 1 }, brands: syrupBrands, color: '#e5d9d0' },
  { label: 'Crème Brûlée', value: 'creme-brulee-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands, color: '#f8d99c' },
  { label: 'Custard', value: 'custard-syrup', unit: 'ml', scores: { sweetness: 4, body: 2 }, brands: syrupBrands, color: '#fbe29f' },
  { label: 'Biscuit', value: 'biscuit-syrup', unit: 'ml', scores: { sweetness: 2, body: 1 }, brands: syrupBrands, color: '#dcc4aa' },
  { label: 'Cookie Dough', value: 'cookie-dough-syrup', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: syrupBrands, color: '#d5b99a' },
  { label: 'Maple Pecan', value: 'maple-pecan-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands, color: '#c38743' },
  { label: 'Peanut Butter', value: 'peanut-butter-syrup', unit: 'ml', scores: { sweetness: 3, body: 2, aroma: 2 }, brands: syrupBrands, color: '#c68e5d' },
  { label: 'S’mores', value: 'smores-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands, color: '#976f4f' },
  { label: 'Candy Cane', value: 'candy-cane-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: syrupBrands, color: '#f6e4e6' },
  { label: 'Toasted Marshmallow', value: 'toasted-marshmallow-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands, color: '#f4e8d8' },
  { label: 'Chocolate Mint', value: 'chocolate-mint-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: syrupBrands, color: '#90a59f' },
  { label: 'Mocha Caramel', value: 'mocha-caramel-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, bitterness: 1 }, brands: syrupBrands, color: '#a57c5a' },
  { label: 'White Chocolate Raspberry', value: 'white-chocolate-raspberry-syrup', unit: 'ml', scores: { sweetness: 5, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#f8dfe5' },
  { label: 'Almond Toffee', value: 'almond-toffee-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 2, body: 1 }, brands: syrupBrands, color: '#c49b74' },
  { label: 'Brownie Batter', value: 'brownie-batter-syrup', unit: 'ml', scores: { sweetness: 5, body: 2, bitterness: 1 }, brands: syrupBrands, color: '#7a5442' },
  { label: 'Honeycomb', value: 'honeycomb-syrup', unit: 'ml', scores: { sweetness: 6 }, brands: syrupBrands, color: '#f5ab00' },
  { label: 'Coffee Liqueur', value: 'coffee-liqueur-syrup', unit: 'ml', scores: { sweetness: 3, bitterness: 2, body: 1, aroma: 3 }, brands: syrupBrands, color: '#6a4531' },
  { label: 'Amaretto', value: 'amaretto-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: syrupBrands, color: '#d8b998' },
  { label: 'Rum Caramel', value: 'rum-caramel-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3, body: 1 }, brands: syrupBrands, color: '#b97b3a' },
  { label: 'Bourbon Vanilla', value: 'bourbon-vanilla-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: syrupBrands, color: '#c89542' },
  { label: 'Espresso Roast', value: 'espresso-roast-syrup', unit: 'ml', scores: { sweetness: 1, bitterness: 4, body: 2, aroma: 4 }, brands: syrupBrands, color: '#2a1a12' },
];

export const toppings: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'g', scores: {}, color: 'transparent' },
  { label: 'Whipped Cream', value: 'whipped-cream', unit: 'g', scores: { sweetness: 2, body: 1 }, color: '#f7f7f7' },
  {
    label: 'Chocolate Shavings',
    value: 'chocolate-shavings',
    unit: 'g',
    scores: { sweetness: 1, bitterness: 1, aroma: 1 },
    color: '#4d301f',
    brands: [
        { label: 'Van Houten', value: 'van-houten', scores: { bitterness: 1, body: 1 } },
        { label: 'Cadbury', value: 'cadbury', scores: { sweetness: 1 } },
    ]
  },
  { label: 'Cinnamon', value: 'cinnamon', unit: 'g', scores: { aroma: 2, aftertaste: 1 }, color: '#a05c2d' },
  {
    label: 'Caramel Drizzle',
    value: 'caramel-drizzle',
    unit: 'ml',
    scores: { sweetness: 3 },
    color: '#d48a45',
    brands: [
        { label: 'Monin', value: 'monin-drizzle', scores: { sweetness: 1 } },
        { label: 'Ghirardelli', value: 'ghirardelli-drizzle', scores: { aftertaste: 1 } },
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


    