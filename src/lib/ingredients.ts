import type { IngredientOption } from './definitions';

// Note: Costs are fictional and in a generic currency unit for calculation purposes.
// Cost is per gram or per ml.

export type IngredientCost = {
  [key: string]: number;
};

export const coffeeBeans: IngredientOption[] = [
  { label: 'Arabica', value: 'arabica', unit: 'g', scores: { acidity: 2, body: 1, caffeine: 2, aroma: 3 }, color: '#4b382a', cost: 150 },
  { label: 'Robusta', value: 'robusta', unit: 'g', scores: { bitterness: 3, body: 3, caffeine: 4 }, color: '#3d2d1f', cost: 100 },
  { label: 'Liberica', value: 'liberica', unit: 'g', scores: { sweetness: 1, bitterness: 2, body: 2, aroma: 1 }, color: '#5a422d', cost: 120 },
  { label: 'Excelsa', value: 'excelsa', unit: 'g', scores: { acidity: 2, bitterness: 1, body: 1 }, color: '#604a36', cost: 130 },
  { label: 'Kopi Luwak', value: 'luwak-coffee', unit: 'g', scores: { acidity: 1, body: 2, aroma: 4, aftertaste: 3 }, color: '#45322e', cost: 5000 },
  { label: 'Kopi Kintamani', value: 'kintamani-coffee', unit: 'g', scores: { acidity: 3, body: 1, aroma: 2 }, color: '#7b604e', cost: 200 },
  { label: 'Kopi Toraja', value: 'toraja-coffee', unit: 'g', scores: { bitterness: 1, body: 2, aroma: 3 }, color: '#5a422d', cost: 180 },
];

export const roastLevels: IngredientOption[] = [
  { label: 'Light', value: 'light', unit: 'g', scores: { acidity: 3, bitterness: 1, body: 1, aroma: 2 }, color: '#c5a98b', cost: 20 },
  { label: 'Medium', value: 'medium', unit: 'g', scores: { sweetness: 1, acidity: 1, bitterness: 2, body: 2, aroma: 1 }, color: '#8b6b4f', cost: 15 },
  { label: 'Dark', value: 'dark', unit: 'g', scores: { bitterness: 3, body: 3, aroma: -1 }, color: '#5a3a22', cost: 10 },
];

export const brewingMethods: IngredientOption[] = [
  // 1. Manual Brewing
  { label: 'Pour Over (V60)', value: 'pour-over-v60', unit: 'ml', scores: { acidity: 3, body: -1, aroma: 3, sweetness: 1 }, color: '#6b4f2c', cost: 4, brewTime: 180 },
  { label: 'Kalita Wave', value: 'kalita-wave', unit: 'ml', scores: { acidity: 2, body: 0, aroma: 2, sweetness: 2 }, color: '#705331', cost: 4, brewTime: 195 },
  { label: 'Melitta Dripper', value: 'melitta-dripper', unit: 'ml', scores: { acidity: 1, body: 1, aroma: 1, sweetness: 1 }, color: '#6a513c', cost: 3, brewTime: 210 },
  { label: 'Origami Dripper', value: 'origami-dripper', unit: 'ml', scores: { acidity: 3, body: -1, aroma: 3, sweetness: 2 }, color: '#7a5a3a', cost: 5, brewTime: 180 },
  { label: 'Chemex', value: 'chemex', unit: 'ml', scores: { acidity: 2, body: -2, aroma: 2, sweetness: 1, aftertaste: 1 }, color: '#80644b', cost: 5, brewTime: 240 },
  { label: 'AeroPress', value: 'aeropress', unit: 'ml', scores: { acidity: 2, body: 1, aroma: 2, sweetness: 2 }, color: '#4a382b', cost: 4, brewTime: 90 },
  { label: 'French Press', value: 'french-press', unit: 'ml', scores: { bitterness: 1, body: 3, aftertaste: 1 }, color: '#533c23', cost: 3, brewTime: 240 },
  { label: 'Clever Dripper', value: 'clever-dripper', unit: 'ml', scores: { body: 2, sweetness: 1, bitterness: 1 }, color: '#604832', cost: 4, brewTime: 180 },
  { label: 'Syphon / Vacuum Pot', value: 'syphon', unit: 'ml', scores: { acidity: 2, body: 0, aroma: 3, aftertaste: 2 }, color: '#7e5d3f', cost: 8, brewTime: 150 },
  { label: 'Vietnamese Drip (Phin)', value: 'vietnamese-drip', unit: 'ml', scores: { bitterness: 2, body: 2, sweetness: 1, caffeine: 3 }, color: '#402a1b', cost: 3, brewTime: 300 },
  { label: 'Turkish Coffee (Cezve)', value: 'turkish-coffee', unit: 'ml', scores: { bitterness: 3, body: 3, aroma: 1, aftertaste: 2 }, color: '#3b2a21', cost: 5, brewTime: 180 },
  { label: 'Moka Pot', value: 'moka-pot', unit: 'ml', scores: { bitterness: 3, body: 2, aftertaste: 1, caffeine: 2 }, color: '#3e2e23', cost: 3, brewTime: 300 },
  { label: 'Nel Drip (Flannel)', value: 'nel-drip', unit: 'ml', scores: { body: 3, sweetness: 2, acidity: 1, aroma: 2 }, color: '#5b412f', cost: 7, brewTime: 210 },
  { label: 'Woodneck Drip', value: 'woodneck-drip', unit: 'ml', scores: { body: 2, sweetness: 2, acidity: 1 }, color: '#684d38', cost: 7, brewTime: 180 },

  // 2. Espresso-Based Brewing
  { label: 'Espresso Machine', value: 'espresso-machine', unit: 'ml', scores: { bitterness: 2, body: 3, caffeine: 3, aftertaste: 2 }, color: '#3d2b1f', cost: 5, brewTime: 30 },
  { label: 'Lever Espresso', value: 'lever-espresso', unit: 'ml', scores: { sweetness: 1, body: 3, aroma: 2, aftertaste: 2 }, color: '#463226', cost: 7, brewTime: 32 },
  { label: 'Capsule Espresso', value: 'capsule-espresso', unit: 'ml', scores: { bitterness: 1, body: 1, caffeine: 2 }, color: '#554236', cost: 6, brewTime: 25 },
  { label: 'Portable Espresso', value: 'portable-espresso', unit: 'ml', scores: { body: 2, caffeine: 3, aftertaste: 1 }, color: '#513f33', cost: 5, brewTime: 45 },
  { label: 'Ristretto', value: 'ristretto', unit: 'ml', scores: { sweetness: 2, body: 2, acidity: 2, bitterness: 1, caffeine: 2 }, color: '#4a3120', cost: 5, brewTime: 20 },
  { label: 'Lungo', value: 'lungo', unit: 'ml', scores: { bitterness: 3, body: 1, caffeine: 4 }, color: '#6d5340', cost: 5, brewTime: 50 },
  { label: 'Doppio', value: 'doppio', unit: 'ml', scores: { bitterness: 2, body: 3, caffeine: 4, aftertaste: 2 }, color: '#3a281c', cost: 6, brewTime: 30 },
  
  // 3. Cold & Slow Brewing
  { label: 'Cold Brew Immersion', value: 'cold-brew-immersion', unit: 'ml', scores: { sweetness: 2, bitterness: -2, acidity: -2, caffeine: 4, body: 2 }, color: '#4a2c1a', cost: 6, brewTime: 57600 },
  { label: 'Cold Drip Tower', value: 'cold-drip-tower', unit: 'ml', scores: { sweetness: 1, bitterness: -2, acidity: -1, caffeine: 3, body: 1, aroma: 2 }, color: '#5c3d2a', cost: 9, brewTime: 21600 },
  { label: 'Flash Brew (Japanese)', value: 'flash-brew', unit: 'ml', scores: { acidity: 3, aroma: 3, sweetness: 1, body: -1 }, color: '#85634e', cost: 6, brewTime: 180 },
  { label: 'Nitro Cold Brew', value: 'nitro-cold-brew', unit: 'ml', scores: { sweetness: 2, bitterness: -2, acidity: -2, body: 3, aftertaste: 1 }, color: '#4e3a2b', cost: 8, brewTime: 57600 },
  { label: 'Dutch Coffee', value: 'dutch-coffee', unit: 'ml', scores: { sweetness: 2, acidity: -1, body: 1, aroma: 2 }, color: '#634532', cost: 9, brewTime: 18000 },

  // 4. Hybrid Brewing
  { label: 'AeroPress (Inverted)', value: 'aeropress-inverted', unit: 'ml', scores: { body: 2, sweetness: 2, acidity: 1, aroma: 1 }, color: '#523c2d', cost: 4, brewTime: 120 },
  { label: 'SteepShot Brewer', value: 'steepshot-brewer', unit: 'ml', scores: { body: 2, acidity: 2, sweetness: 1 }, color: '#5a4231', cost: 7, brewTime: 75 },

  // 5. Alternative & Experimental
  { label: 'Auto Drip Machine', value: 'auto-drip', unit: 'ml', scores: { body: 0, caffeine: 2 }, color: '#735b49', cost: 2, brewTime: 360 },
  { label: 'Percolator', value: 'percolator', unit: 'ml', scores: { bitterness: 3, body: 1, aftertaste: -1 }, color: '#614c3e', cost: 2, brewTime: 480 },
  { label: 'Sonic Brew (Ultrasonic)', value: 'sonic-brew', unit: 'ml', scores: { body: 1, aroma: 2, acidity: 1 }, color: '#7d6350', cost: 15, brewTime: 120 },

  // 6. Traditional / World Culture
  { label: 'Kopi Tubruk (Indonesia)', value: 'kopi-tubruk', unit: 'ml', scores: { bitterness: 2, body: 3, caffeine: 3, aftertaste: 2 }, color: '#443125', cost: 1, brewTime: 240 },
  { label: 'Kopi Tarek (Malaysia)', value: 'kopi-tarek', unit: 'ml', scores: { sweetness: 3, body: 2, bitterness: 1 }, color: '#a57a5a', cost: 2, brewTime: 300 },
  { label: 'Indian Filter Coffee', value: 'indian-filter-coffee', unit: 'ml', scores: { bitterness: 2, body: 2, sweetness: 1 }, color: '#6d4c38', cost: 3, brewTime: 600 },
  { label: 'Cuban Coffee', value: 'cuban-coffee', unit: 'ml', scores: { sweetness: 4, body: 3, bitterness: 2, caffeine: 3 }, color: '#503829', cost: 4, brewTime: 45 },
  { label: 'Arabic Coffee (Qahwa)', value: 'qahwa', unit: 'ml', scores: { aroma: 4, acidity: 1, body: -1 }, color: '#c5a98b', cost: 6, brewTime: 900 },
  { label: 'Ethiopian Jebena', value: 'ethiopian-jebena', unit: 'ml', scores: { body: 2, aroma: 3, aftertaste: 2 }, color: '#5a422d', cost: 5, brewTime: 420 },

  // 7. Modern / Premium Brewing
  { label: 'AI Barista Brewer', value: 'ai-barista-brewer', unit: 'ml', scores: { sweetness: 2, acidity: 2, body: 1, aroma: 2, aftertaste: 2 }, color: '#7b604e', cost: 20, brewTime: 180 },
  { label: 'Spinn Smart Brewer', value: 'spinn-smart-brewer', unit: 'ml', scores: { sweetness: 1, body: 1, aroma: 1 }, color: '#6f5747', cost: 18, brewTime: 120 },
  { label: 'Ratio Eight Brewer', value: 'ratio-eight-brewer', unit: 'ml', scores: { acidity: 2, body: 0, aroma: 2, sweetness: 2 }, color: '#8a6e5b', cost: 19, brewTime: 240 },
];


export const milks: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'ml', scores: {}, color: 'transparent', cost: 0 },
  {
    label: 'Whole Milk',
    value: 'whole-milk',
    unit: 'ml',
    scores: { sweetness: 1, body: 1, acidity: -1 },
    color: '#fffbf5',
    cost: 15,
    brands: [
        { label: 'Greenfields', value: 'greenfields', scores: { body: 1, sweetness: 1, aftertaste: 1 }, cost: 18 },
        { label: 'Ultra Milk', value: 'ultra-milk', scores: { body: 0, sweetness: 2 }, cost: 12 },
    ]
  },
   {
    label: 'Low Fat Milk',
    value: 'low-fat-milk',
    unit: 'ml',
    scores: { sweetness: 0.5, body: -1 },
    color: '#fcfcfc',
    cost: 16,
    brands: [
        { label: 'Greenfields', value: 'greenfields', scores: { body: -1 }, cost: 19 },
        { label: 'Ultra Milk', value: 'ultra-milk', scores: { sweetness: 1 }, cost: 13 },
    ]
  },
  {
    label: 'SKM',
    value: 'skm',
    unit: 'ml',
    scores: { sweetness: 3, body: 2, acidity: -1 },
    color: '#fff5e8',
    cost: 25,
    brands: [
        { label: 'Frisian Flag', value: 'frisian-flag', scores: { sweetness: 2, body: 1 }, cost: 28 },
        { label: 'Indomilk', value: 'indomilk', scores: { sweetness: 2 }, cost: 22 }
    ]
  },
  { 
    label: 'Oat Milk', 
    value: 'oat-milk', 
    unit: 'ml',
    scores: { sweetness: 2, body: 0 },
    color: '#f5f1e8',
    cost: 30,
    brands: [
        { label: 'Oatly', value: 'oatly', scores: { sweetness: 1, body: 1 }, cost: 35 }
    ]
  },
  { 
    label: 'Almond Milk', 
    value: 'almond-milk', 
    unit: 'ml',
    scores: { sweetness: 1, aroma: 1 },
    color: '#f7f2ea',
    cost: 28,
    brands: [
        { label: 'Alpro', value: 'alpro', scores: { sweetness: 1, aroma: 0 }, cost: 32 }
    ]
  },
];

const creamerBrands = [
  { label: 'Coffeemate', value: 'coffeemate', scores: { sweetness: 1, body: 2 }, cost: 45 },
  { label: 'Indocafe Creamer', value: 'indocafe', scores: { body: 1 }, cost: 30 },
  { label: 'International Delight', value: 'international-delight', scores: { sweetness: 2, aroma: 1 }, cost: 55 },
  { label: 'Starbucks Creamer', value: 'starbucks', scores: { sweetness: 1, body: 1, aroma: 1 }, cost: 60 },
  { label: 'Max Creamer', value: 'max-creamer', scores: { sweetness: 2, body: 1 }, cost: 25 },
  { label: 'Tropicana Slim Creamer', value: 'tropicana-slim', scores: { sweetness: 0, body: 0 }, cost: 70 },
];

export const creamers: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'ml', scores: {}, brands: creamerBrands, color: 'transparent', cost: 0 },
  { label: 'Original', value: 'original', unit: 'ml', scores: { sweetness: 2, body: 1 }, brands: creamerBrands.slice(0, 5), color: '#fff8f0', cost: 40 },
  { label: 'Non-Dairy Creamer', value: 'non-dairy', unit: 'ml', scores: { sweetness: 1, body: 0.5 }, brands: creamerBrands, color: '#fcfaf7', cost: 42 },
  { label: 'Creamy Blend', value: 'creamy-blend', unit: 'ml', scores: { sweetness: 1, body: 3 }, brands: creamerBrands, color: '#fffaf5', cost: 45 },
  { label: 'Sweet Cream', value: 'sweet-cream', unit: 'ml', scores: { sweetness: 3, body: 2 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#fffaf5', cost: 42 },
  { label: 'French Vanilla', value: 'french-vanilla-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f8f5ee', cost: 45 },
  { label: 'Vanilla Bean', value: 'vanilla-bean', unit: 'ml', scores: { sweetness: 3, aroma: 4 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#f7f4ed', cost: 48 },
  { label: 'Caramel', value: 'caramel-creamer', unit: 'ml', scores: { sweetness: 4, aftertaste: 2 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f2eada', cost: 45 },
  { label: 'Salted Caramel', value: 'salted-caramel-creamer', unit: 'ml', scores: { sweetness: 3, body: 1, aftertaste: 2 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#f0e8d8', cost: 48 },
  { label: 'Hazelnut', value: 'hazelnut-creamer', unit: 'ml', scores: { sweetness: 2, aroma: 3, aftertaste: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f3efea', cost: 45 },
  { label: 'Toffee Nut', value: 'toffee-nut-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: [creamerBrands[3]], color: '#e9e1d3', cost: 50 },
  { label: 'Irish Cream', value: 'irish-cream-creamer', unit: 'ml', scores: { sweetness: 4, body: 2, aroma: 2 }, brands: [creamerBrands[2]], color: '#f0ede7', cost: 52 },
  { label: 'Crème Brûlée', value: 'creme-brulee-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: [creamerBrands[2]], color: '#f5efe1', cost: 55 },
  { label: 'Butter Pecan', value: 'butter-pecan-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: [creamerBrands[2]], color: '#ede6d9', cost: 53 },
  { label: 'Amaretto', value: 'amaretto-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: [creamerBrands[2]], color: '#f3eee9', cost: 54 },
  { label: 'Chocolate', value: 'chocolate-creamer', unit: 'ml', scores: { sweetness: 3, bitterness: 1 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#dcd1c6', cost: 45 },
  { label: 'Mocha', value: 'mocha-creamer', unit: 'ml', scores: { sweetness: 3, bitterness: 1, body: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#c9bbae', cost: 48 },
  { label: 'White Chocolate', value: 'white-chocolate-creamer', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#fdfaf5', cost: 50 },
  { label: 'Chocolate Hazelnut', value: 'chocolate-hazelnut', unit: 'ml', scores: { sweetness: 4, aroma: 3, bitterness: 1 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#d6c6b8', cost: 52 },
  { label: 'Toffee', value: 'toffee', unit: 'ml', scores: { sweetness: 5 }, brands: [creamerBrands[2]], color: '#e0d5c6', cost: 48 },
  { label: 'Butterscotch', value: 'butterscotch-creamer', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: [creamerBrands[2]], color: '#e8dccb', cost: 50 },
  { label: 'Cookies & Cream', value: 'cookies-cream-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#e6e2de', cost: 55 },
  { label: 'Cookie Dough', value: 'cookie-dough-creamer', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: [creamerBrands[2]], color: '#eaddd0', cost: 54 },
  { label: 'Cinnamon', value: 'cinnamon-creamer', unit: 'ml', scores: { sweetness: 2, aroma: 4, aftertaste: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#f1e9e1', cost: 42 },
  { label: 'Cinnamon Roll', value: 'cinnamon-roll-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 4, body: 1 }, brands: [creamerBrands[2]], color: '#f3eae2', cost: 55 },
  { label: 'Pumpkin Spice', value: 'pumpkin-spice-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 4, body: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f5e7d8', cost: 55 },
  { label: 'Peppermint Mocha', value: 'peppermint-mocha', unit: 'ml', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[3]], color: '#f0e5e0', cost: 55 },
  { label: 'Peppermint', value: 'peppermint-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 5, aftertaste: 3 }, brands: [creamerBrands[2]], color: '#f8f8f8', cost: 45 },
  { label: 'Mint Chocolate', value: 'mint-chocolate', unit: 'ml', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: [creamerBrands[2]], color: '#e5dcd7', cost: 50 },
  { label: 'Maple', value: 'maple-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [creamerBrands[2]], color: '#efdfc6', cost: 50 },
  { label: 'Maple Pecan', value: 'maple-pecan-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: [creamerBrands[2]], color: '#e8d9c4', cost: 52 },
  { label: 'Honey', value: 'honey-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 1, aftertaste: 1 }, brands: [], color: '#f8eecf', cost: 60 },
  { label: 'Honey Vanilla', value: 'honey-vanilla', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: [], color: '#f6eccb', cost: 62 },
  { label: 'Vanilla Caramel', value: 'vanilla-caramel', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#f2e8d5', cost: 48 },
  { label: 'Coconut', value: 'coconut-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#f9f6f1', cost: 50 },
  { label: 'Coconut Cream', value: 'coconut-cream', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: [creamerBrands[2]], color: '#faf8f4', cost: 52 },
  { label: 'Coconut Caramel', value: 'coconut-caramel', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: [creamerBrands[3]], color: '#f5eee3', cost: 55 },
  { label: 'Almond', value: 'almond-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [creamerBrands[2]], color: '#f7f2eb', cost: 50 },
  { label: 'Almond Vanilla', value: 'almond-vanilla', unit: 'ml', scores: { sweetness: 3, aroma: 4 }, brands: [], color: '#f6f1ea', cost: 52 },
  { label: 'Almond Caramel', value: 'almond-caramel', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: [], color: '#f3ebe0', cost: 54 },
  { label: 'Oat Sweet Cream', value: 'oat-sweet-cream', unit: 'ml', scores: { sweetness: 3, body: 1 }, brands: [], color: '#f5f1e8', cost: 55 },
  { label: 'Oat Vanilla', value: 'oat-vanilla', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [], color: '#f4f0e7', cost: 57 },
  { label: 'Oat Hazelnut', value: 'oat-hazelnut', unit: 'ml', scores: { sweetness: 2, aroma: 4 }, brands: [], color: '#f3efea', cost: 58 },
  { label: 'Macadamia Nut', value: 'macadamia-nut-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: [creamerBrands[3]], color: '#f4f0eb', cost: 60 },
  { label: 'Pistachio', value: 'pistachio-creamer', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: [creamerBrands[2]], color: '#f0f3ea', cost: 62 },
  { label: 'Brown Sugar', value: 'brown-sugar', unit: 'ml', scores: { sweetness: 4 }, brands: [creamerBrands[0]], color: '#e6d8c8', cost: 45 },
  { label: 'Brown Sugar Cinnamon', value: 'brown-sugar-cinnamon-creamer', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: [creamerBrands[0]], color: '#e5d7c8', cost: 48 },
  { label: 'Chai Spice', value: 'chai-spice-creamer', unit: 'ml', scores: { sweetness: 2, aroma: 5, aftertaste: 2 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#e8dccf', cost: 55 },
  { label: 'Tiramisu', value: 'tiramisu-creamer', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 2, aroma: 3 }, brands: [creamerBrands[2]], color: '#e8e0d4', cost: 60 },
  { label: 'S’mores', value: 'smores-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#e2d8ce', cost: 58 },
  { label: 'Marshmallow', value: 'marshmallow-creamer', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 1 }, brands: [creamerBrands[2]], color: '#f8f8f8', cost: 45 },
  { label: 'Toasted Marshmallow', value: 'toasted-marshmallow-creamer', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: [creamerBrands[3]], color: '#f5f0e9', cost: 50 },
  { label: 'Cotton Candy', value: 'cotton-candy-creamer', unit: 'ml', scores: { sweetness: 6, aroma: 1 }, brands: [creamerBrands[2]], color: '#fdeff2', cost: 60 },
  { label: 'Birthday Cake', value: 'birthday-cake', unit: 'ml', scores: { sweetness: 6, aroma: 2 }, brands: [creamerBrands[0], creamerBrands[2]], color: '#fcf8e8', cost: 62 },
  { label: 'Sugar Cookie', value: 'sugar-cookie', unit: 'ml', scores: { sweetness: 5 }, brands: [creamerBrands[0]], color: '#fcf8f0', cost: 55 },
  { label: 'Vanilla Bourbon', value: 'vanilla-bourbon', unit: 'ml', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: [], color: '#f5efde', cost: 65 },
  { label: 'Vanilla Latte', value: 'vanilla-latte', unit: 'ml', scores: { sweetness: 4, caffeine: 1 }, brands: [creamerBrands[2]], color: '#f2ece3', cost: 55 },
  { label: 'Caramel Latte', value: 'caramel-latte', unit: 'ml', scores: { sweetness: 5, caffeine: 1 }, brands: [], color: '#efeadf', cost: 58 },
  { label: 'Caramel Macchiato', value: 'caramel-macchiato', unit: 'ml', scores: { sweetness: 5, body: 1, caffeine: 1 }, brands: [creamerBrands[2], creamerBrands[3]], color: '#f0e8de', cost: 60 },
  { label: 'Mocha Latte', value: 'mocha-latte', unit: 'ml', scores: { sweetness: 4, bitterness: 1, caffeine: 1 }, brands: [creamerBrands[2]], color: '#dcd1c6', cost: 58 },
  { label: 'Chocolate Truffle', value: 'chocolate-truffle', unit: 'ml', scores: { sweetness: 5, bitterness: 2, body: 2 }, brands: [], color: '#b9a79a', cost: 65 },
  { label: 'Chocolate Mocha', value: 'chocolate-mocha', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 1, caffeine: 1 }, brands: [], color: '#c3b3a5', cost: 60 },
  { label: 'White Chocolate Raspberry', value: 'white-chocolate-raspberry-creamer', unit: 'ml', scores: { sweetness: 5, acidity: 1, aroma: 2 }, brands: [creamerBrands[2]], color: '#fceef2', cost: 65 },
  { label: 'Raspberry Cheesecake', value: 'raspberry-cheesecake', unit: 'ml', scores: { sweetness: 5, acidity: 1, body: 1 }, brands: [], color: '#fbe9ed', cost: 68 },
  { label: 'Strawberry Cream', value: 'strawberry-cream', unit: 'ml', scores: { sweetness: 5, acidity: 1 }, brands: [creamerBrands[2]], color: '#fceef0', cost: 60 },
  { label: 'Banana Cream', value: 'banana-cream', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [], color: '#fcf8e8', cost: 58 },
  { label: 'Coconut Mocha', value: 'coconut-mocha', unit: 'ml', scores: { sweetness: 4, aroma: 3, bitterness: 1 }, brands: [], color: '#ded5cd', cost: 62 },
  { label: 'Maple Walnut', value: 'maple-walnut', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: [], color: '#e6d8c3', cost: 60 },
  { label: 'Vanilla Almond', value: 'vanilla-almond', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: [], color: '#f6f1ea', cost: 55 },
  { label: 'Coffeehouse Blend', value: 'coffeehouse-blend', unit: 'ml', scores: { body: 1, caffeine: 1 }, brands: [], color: '#e2d8d0', cost: 50 },
  { label: 'Classic Cream', value: 'classic-cream', unit: 'ml', scores: { body: 2 }, brands: [creamerBrands[1], creamerBrands[4]], color: '#fff9f2', cost: 35 },
  { label: 'Velvety Cream', value: 'velvety-cream', unit: 'ml', scores: { body: 3 }, brands: [], color: '#fffbf5', cost: 40 },
  { label: 'Oat & Almond Blend', value: 'oat-almond-blend', unit: 'ml', scores: { body: 1, sweetness: 2 }, brands: [], color: '#f6f2e9', cost: 60 },
  { label: 'Coconut & Caramel Blend', value: 'coconut-caramel-blend', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: [], color: '#f5eee3', cost: 62 },
  { label: 'Zero Sugar Vanilla', value: 'zero-sugar-vanilla', unit: 'ml', scores: { sweetness: 1, aroma: 3 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f8f5f0', cost: 50 },
  { label: 'Zero Sugar Hazelnut', value: 'zero-sugar-hazelnut', unit: 'ml', scores: { sweetness: 1, aroma: 3 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f3efea', cost: 50 },
  { label: 'Zero Sugar Caramel', value: 'zero-sugar-caramel', unit: 'ml', scores: { sweetness: 1 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f2eada', cost: 50 },
  { label: 'Zero Sugar Sweet Cream', value: 'zero-sugar-sweet-cream', unit: 'ml', scores: { sweetness: 1, body: 2 }, brands: [creamerBrands[0], creamerBrands[2], creamerBrands[5]], color: '#f8f6f2', cost: 48 },
];

const syrupBrands = [
  { label: 'Monin', value: 'monin', scores: { sweetness: 1, aroma: 1, aftertaste: 1 }, cost: 80 },
  { label: 'DaVinci', value: 'davinci', scores: { sweetness: 2, aftertaste: -1 }, cost: 70 },
  { label: 'Torani', value: 'torani', scores: { sweetness: 1, aroma: -1, aftertaste: -1 }, cost: 75 },
  { label: 'Ghirardelli', value: 'ghirardelli', scores: { body: 1, aftertaste: 1, bitterness: 1 }, cost: 90 },
];

export const syrups: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'ml', scores: {}, brands: syrupBrands, color: 'transparent', cost: 0 },
  { label: 'Vanilla', value: 'vanilla-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands, color: '#f8f0e3', cost: 70 },
  { label: 'French Vanilla', value: 'french-vanilla-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: syrupBrands, color: '#f5e8d5', cost: 75 },
  { label: 'Caramel', value: 'caramel-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aftertaste: 1 }, brands: syrupBrands, color: '#c68f4b', cost: 72 },
  { label: 'Salted Caramel', value: 'salted-caramel-syrup', unit: 'ml', scores: { sweetness: 4, body: 1, aftertaste: 2 }, brands: syrupBrands, color: '#b8814a', cost: 78 },
  { label: 'Hazelnut', value: 'hazelnut-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, aftertaste: 1 }, brands: syrupBrands, color: '#d4a77e', cost: 75 },
  { label: 'Almond', value: 'almond-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands, color: '#e5d4c1', cost: 75 },
  { label: 'Macadamia Nut', value: 'macadamia-nut-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3, body: 1 }, brands: syrupBrands, color: '#e9dccd', cost: 80 },
  { label: 'Toffee Nut', value: 'toffee-nut-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: syrupBrands, color: '#c0956d', cost: 82 },
  { label: 'Butterscotch', value: 'butterscotch-syrup', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: syrupBrands, color: '#d89f53', cost: 78 },
  { label: 'Irish Cream', value: 'irish-cream-syrup', unit: 'ml', scores: { sweetness: 4, body: 2, aroma: 2 }, brands: syrupBrands, color: '#e6d9c8', cost: 85 },
  { label: 'Mocha', value: 'mocha-syrup', unit: 'ml', scores: { sweetness: 3, bitterness: 1, body: 1 }, brands: syrupBrands, color: '#8b6b5c', cost: 80 },
  { label: 'White Chocolate', value: 'white-chocolate-syrup', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: syrupBrands, color: '#fcf6f0', cost: 85 },
  { label: 'Dark Chocolate', value: 'dark-chocolate-syrup', unit: 'ml', scores: { sweetness: 2, bitterness: 3, body: 1 }, brands: syrupBrands, color: '#583a2e', cost: 88 },
  { label: 'Milk Chocolate', value: 'milk-chocolate-syrup', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 1 }, brands: syrupBrands, color: '#a07a65', cost: 82 },
  { label: 'Peppermint', value: 'peppermint-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 5, aftertaste: 3 }, brands: syrupBrands, color: '#f0fcfc', cost: 70 },
  { label: 'Spearmint', value: 'spearmint-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#e6f7f2', cost: 70 },
  { label: 'Cinnamon', value: 'cinnamon-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#d9a37c', cost: 72 },
  { label: 'Gingerbread', value: 'gingerbread-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#b57a4a', cost: 78 },
  { label: 'Pumpkin Spice', value: 'pumpkin-spice-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 4, body: 1 }, brands: syrupBrands, color: '#d88e4e', cost: 80 },
  { label: 'Brown Sugar Cinnamon', value: 'brown-sugar-cinnamon-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands, color: '#c9935f', cost: 75 },
  { label: 'Maple', value: 'maple-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: syrupBrands, color: '#b87333', cost: 85 },
  { label: 'Honey', value: 'honey-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 1, aftertaste: 1 }, brands: syrupBrands, color: '#f6bb42', cost: 90 },
  { label: 'Coconut', value: 'coconut-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands, color: '#f5f5f5', cost: 78 },
  { label: 'Banana', value: 'banana-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 2 }, brands: syrupBrands, color: '#fcf4a3', cost: 75 },
  { label: 'Strawberry', value: 'strawberry-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#e54561', cost: 80 },
  { label: 'Raspberry', value: 'raspberry-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 2, aroma: 2 }, brands: syrupBrands, color: '#c02a54', cost: 82 },
  { label: 'Blueberry', value: 'blueberry-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#7b579f', cost: 85 },
  { label: 'Blackberry', value: 'blackberry-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 1, aroma: 3 }, brands: syrupBrands, color: '#5e3a5a', cost: 88 },
  { label: 'Cherry', value: 'cherry-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 1 }, brands: syrupBrands, color: '#a11a36', cost: 80 },
  { label: 'Peach', value: 'peach-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#fbc17d', cost: 78 },
  { label: 'Mango', value: 'mango-syrup', unit: 'ml', scores: { sweetness: 5, acidity: 1, aroma: 3 }, brands: syrupBrands, color: '#ffb833', cost: 85 },
  { label: 'Pineapple', value: 'pineapple-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 2, aroma: 2 }, brands: syrupBrands, color: '#f8d448', cost: 80 },
  { label: 'Passion Fruit', value: 'passion-fruit-syrup', unit: 'ml', scores: { sweetness: 4, acidity: 3, aroma: 3 }, brands: syrupBrands, color: '#f7aa01', cost: 90 },
  { label: 'Lychee', value: 'lychee-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3 }, brands: syrupBrands, color: '#f8e4e0', cost: 95 },
  { label: 'Watermelon', value: 'watermelon-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 1 }, brands: syrupBrands, color: '#fa7e8a', cost: 75 },
  { label: 'Kiwi', value: 'kiwi-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 2 }, brands: syrupBrands, color: '#a4c24a', cost: 80 },
  { label: 'Melon', value: 'melon-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 1 }, brands: syrupBrands, color: '#c8e698', cost: 78 },
  { label: 'Apple', value: 'apple-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 1 }, brands: syrupBrands, color: '#e8d282', cost: 75 },
  { label: 'Green Apple', value: 'green-apple-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 3 }, brands: syrupBrands, color: '#c5d964', cost: 78 },
  { label: 'Lemon', value: 'lemon-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 4 }, brands: syrupBrands, color: '#f7da4c', cost: 70 },
  { label: 'Lime', value: 'lime-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 4 }, brands: syrupBrands, color: '#c0d93f', cost: 70 },
  { label: 'Orange', value: 'orange-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 3 }, brands: syrupBrands, color: '#f6921e', cost: 72 },
  { label: 'Blood Orange', value: 'blood-orange-syrup', unit: 'ml', scores: { sweetness: 3, acidity: 3, bitterness: 1 }, brands: syrupBrands, color: '#e04928', cost: 80 },
  { label: 'Grapefruit', value: 'grapefruit-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 3, bitterness: 2 }, brands: syrupBrands, color: '#f3735a', cost: 78 },
  { label: 'Tiramisu', value: 'tiramisu-syrup', unit: 'ml', scores: { sweetness: 4, bitterness: 1, body: 2, aroma: 3 }, brands: syrupBrands, color: '#d4b79b', cost: 90 },
  { label: 'Cookies & Cream', value: 'cookies-cream-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands, color: '#e8e2db', cost: 85 },
  { label: 'Cotton Candy', value: 'cotton-candy-syrup', unit: 'ml', scores: { sweetness: 6, aroma: 1 }, brands: syrupBrands, color: '#fdeff2', cost: 95 },
  { label: 'Bubblegum', value: 'bubblegum-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 2 }, brands: syrupBrands, color: '#f7c3e0', cost: 90 },
  { label: 'Marshmallow', value: 'marshmallow-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 1 }, brands: syrupBrands, color: '#fafafa', cost: 80 },
  { label: 'Pistachio', value: 'pistachio-syrup', unit: 'ml', scores: { sweetness: 3, aroma: 3 }, brands: syrupBrands, color: '#d8e4c3', cost: 95 },
  { label: 'Lavender', value: 'lavender-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 4 }, brands: syrupBrands, color: '#d3c5e5', cost: 100 },
  { label: 'Rose', value: 'rose-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 5 }, brands: syrupBrands, color: '#f5d1d8', cost: 105 },
  { label: 'Jasmine', value: 'jasmine-syrup', unit: 'ml', scores: { sweetness: 1, aroma: 5 }, brands: syrupBrands, color: '#fcf8e3', cost: 110 },
  { label: 'Hibiscus', value: 'hibiscus-syrup', unit: 'ml', scores: { sweetness: 2, acidity: 2, aroma: 3 }, brands: syrupBrands, color: '#d94c79', cost: 95 },
  { label: 'Cardamom', value: 'cardamom-syrup', unit: 'ml', scores: { sweetness: 1, aroma: 4, aftertaste: 2 }, brands: syrupBrands, color: '#e8d8c3', cost: 115 },
  { label: 'Chai Spice', value: 'chai-spice-syrup', unit: 'ml', scores: { sweetness: 2, aroma: 5, aftertaste: 2 }, brands: syrupBrands, color: '#c9a17e', cost: 110 },
  { label: 'Cinnamon Roll', value: 'cinnamon-roll-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 4, body: 1 }, brands: syrupBrands, color: '#e6c3a5', cost: 85 },
  { label: 'Butter Pecan', value: 'butter-pecan-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 3, body: 1 }, brands: syrupBrands, color: '#c9a987', cost: 90 },
  { label: 'Almond Praline', value: 'almond-praline-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands, color: '#c49c7a', cost: 92 },
  { label: 'Nougat', value: 'nougat-syrup', unit: 'ml', scores: { sweetness: 4, body: 1 }, brands: syrupBrands, color: '#e5d9d0', cost: 88 },
  { label: 'Crème Brûlée', value: 'creme-brulee-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands, color: '#f8d99c', cost: 95 },
  { label: 'Custard', value: 'custard-syrup', unit: 'ml', scores: { sweetness: 4, body: 2 }, brands: syrupBrands, color: '#fbe29f', cost: 85 },
  { label: 'Biscuit', value: 'biscuit-syrup', unit: 'ml', scores: { sweetness: 2, body: 1 }, brands: syrupBrands, color: '#dcc4aa', cost: 75 },
  { label: 'Cookie Dough', value: 'cookie-dough-syrup', unit: 'ml', scores: { sweetness: 5, body: 1 }, brands: syrupBrands, color: '#d5b99a', cost: 88 },
  { label: 'Maple Pecan', value: 'maple-pecan-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands, color: '#c38743', cost: 92 },
  { label: 'Peanut Butter', value: 'peanut-butter-syrup', unit: 'ml', scores: { sweetness: 3, body: 2, aroma: 2 }, brands: syrupBrands, color: '#c68e5d', cost: 85 },
  { label: 'S’mores', value: 'smores-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, aroma: 2 }, brands: syrupBrands, color: '#976f4f', cost: 90 },
  { label: 'Candy Cane', value: 'candy-cane-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: syrupBrands, color: '#f6e4e6', cost: 85 },
  { label: 'Toasted Marshmallow', value: 'toasted-marshmallow-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3 }, brands: syrupBrands, color: '#f4e8d8', cost: 88 },
  { label: 'Chocolate Mint', value: 'chocolate-mint-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4, bitterness: 1 }, brands: syrupBrands, color: '#90a59f', cost: 85 },
  { label: 'Mocha Caramel', value: 'mocha-caramel-syrup', unit: 'ml', scores: { sweetness: 5, body: 1, bitterness: 1 }, brands: syrupBrands, color: '#a57c5a', cost: 88 },
  { label: 'White Chocolate Raspberry', value: 'white-chocolate-raspberry-syrup', unit: 'ml', scores: { sweetness: 5, acidity: 1, aroma: 2 }, brands: syrupBrands, color: '#f8dfe5', cost: 95 },
  { label: 'Almond Toffee', value: 'almond-toffee-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 2, body: 1 }, brands: syrupBrands, color: '#c49b74', cost: 92 },
  { label: 'Brownie Batter', value: 'brownie-batter-syrup', unit: 'ml', scores: { sweetness: 5, body: 2, bitterness: 1 }, brands: syrupBrands, color: '#7a5442', cost: 95 },
  { label: 'Honeycomb', value: 'honeycomb-syrup', unit: 'ml', scores: { sweetness: 6 }, brands: syrupBrands, color: '#f5ab00', cost: 100 },
  { label: 'Coffee Liqueur', value: 'coffee-liqueur-syrup', unit: 'ml', scores: { sweetness: 3, bitterness: 2, body: 1, aroma: 3 }, brands: syrupBrands, color: '#6a4531', cost: 120 },
  { label: 'Amaretto', value: 'amaretto-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4 }, brands: syrupBrands, color: '#d8b998', cost: 110 },
  { label: 'Rum Caramel', value: 'rum-caramel-syrup', unit: 'ml', scores: { sweetness: 5, aroma: 3, body: 1 }, brands: syrupBrands, color: '#b97b3a', cost: 115 },
  { label: 'Bourbon Vanilla', value: 'bourbon-vanilla-syrup', unit: 'ml', scores: { sweetness: 4, aroma: 4, body: 1 }, brands: syrupBrands, color: '#c89542', cost: 125 },
  { label: 'Espresso Roast', value: 'espresso-roast-syrup', unit: 'ml', scores: { sweetness: 1, bitterness: 4, body: 2, aroma: 4 }, brands: syrupBrands, color: '#2a1a12', cost: 130 },
];

export const sweeteners: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'g', scores: {}, color: 'transparent', cost: 0 },
  { label: 'Gula Pasir', value: 'gula-pasir', unit: 'g', scores: { sweetness: 2 }, color: '#fafafa', cost: 1 },
  { label: 'Gula Aren Cair', value: 'gula-aren-cair', unit: 'ml', scores: { sweetness: 3, aftertaste: 1, aroma: 1 }, color: '#83543b', cost: 15 },
  { label: 'Gula Merah Cair', value: 'gula-merah-cair', unit: 'ml', scores: { sweetness: 2, aftertaste: 1 }, color: '#a05c43', cost: 12 },
  { label: 'Palm Sugar', value: 'palm-sugar', unit: 'g', scores: { sweetness: 2.5, aroma: 0.5 }, color: '#b0804c', cost: 4 },
  { label: 'Brown Sugar', value: 'brown-sugar', unit: 'g', scores: { sweetness: 3 }, color: '#b5651d', cost: 3 },
  { label: 'Madu (Honey)', value: 'honey', unit: 'ml', scores: { sweetness: 3, aroma: 1, aftertaste: 1 }, color: '#f6bb42', cost: 25 },
  { label: 'Simple Syrup', value: 'simple-syrup', unit: 'ml', scores: { sweetness: 2 }, color: '#f0f8ff', cost: 5 },
  { label: 'Stevia', value: 'stevia', unit: 'g', scores: { sweetness: 4, aftertaste: -1 }, color: '#f5fcf5', cost: 50 },
];

export const toppings: IngredientOption[] = [
  { label: 'None', value: 'none', unit: 'g', scores: {}, color: 'transparent', cost: 0 },
  { label: 'Whipped Cream', value: 'whipped-cream', unit: 'g', scores: { sweetness: 2, body: 1 }, color: '#f7f7f7', cost: 100 },
  {
    label: 'Chocolate Shavings',
    value: 'chocolate-shavings',
    unit: 'g',
    scores: { sweetness: 1, bitterness: 1, aroma: 1 },
    color: '#4d301f',
    cost: 150,
    brands: [
        { label: 'Van Houten', value: 'van-houten', scores: { bitterness: 1, body: 1 }, cost: 180 },
        { label: 'Cadbury', value: 'cadbury', scores: { sweetness: 1 }, cost: 160 },
    ]
  },
  { label: 'Cinnamon Powder', value: 'cinnamon-powder', unit: 'g', scores: { aroma: 2, aftertaste: 1 }, color: '#a05c2d', cost: 50 },
  {
    label: 'Caramel Drizzle',
    value: 'caramel-drizzle',
    unit: 'ml',
    scores: { sweetness: 3 },
    color: '#d48a45',
    cost: 120,
    brands: [
        { label: 'Monin', value: 'monin-drizzle', scores: { sweetness: 1 }, cost: 130 },
        { label: 'Ghirardelli', value: 'ghirardelli-drizzle', scores: { aftertaste: 1 }, cost: 140 },
    ]
  },
  { label: 'Ice Cube', value: 'ice-cube', unit: 'g', scores: {}, color: '#e0f2fe', cost: 1 },
  { label: 'Chocolate Powder', value: 'chocolate-powder', unit: 'g', scores: { sweetness: 1, bitterness: 1 }, color: '#5b3a29', cost: 60 },
  { label: 'Cocoa Nibs', value: 'cocoa-nibs', unit: 'g', scores: { bitterness: 2, aroma: 1 }, color: '#3e2712', cost: 200 },
  { label: 'Vanilla Bean', value: 'vanilla-bean-topping', unit: 'g', scores: { aroma: 3 }, color: '#2b2118', cost: 1000 },
  { label: 'Sea Salt Flakes', value: 'sea-salt-flakes', unit: 'g', scores: { aftertaste: 1 }, color: '#f8fafc', cost: 80 },
  { label: 'Rempah Nusantara', value: 'rempah-nusantara', unit: 'g', scores: { aroma: 3, aftertaste: 1 }, color: '#c4a484', cost: 70 },
  { label: 'Chopped Nuts', value: 'chopped-nuts', unit: 'g', scores: { aroma: 2, body: 0.5 }, color: '#c4a484', cost: 90 },
];

export const ingredientCategories = {
  coffeeBeans,
  roastLevel: roastLevels,
  brewingMethod: brewingMethods,
  milk: milks,
  creamer: creamers,
  syrup: syrups,
  sweetener: sweeteners,
  toppings: toppings,
};
