
'use client';

import type { Recipe } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';

interface CupVisualizerProps {
  recipe: Recipe;
}

interface Layer {
  color: string;
  amount: number;
}

const MAX_VOLUME = 250; // Max volume of the cup in ml

const CupVisualizer = ({ recipe }: CupVisualizerProps) => {
  const getIngredientColor = (category: keyof typeof ingredientCategories, value: string): string => {
    const ingredient = ingredientCategories[category]?.find(i => i.value === value);
    return ingredient?.color || 'transparent';
  };

  const layers: Layer[] = [
    // Base coffee
    { color: getIngredientColor('brewingMethod', recipe.brewingMethod), amount: recipe.brewingMethodAmount },
    // Syrup at the bottom
    { color: getIngredientColor('syrup', recipe.syrup), amount: recipe.syrupAmount },
    // Milk
    { color: getIngredientColor('milk', recipe.milk), amount: recipe.milkAmount },
    // Creamer
    { color: getIngredientColor('creamer', recipe.creamer), amount: recipe.creamerAmount },
  ].filter(l => l.amount > 0 && l.color !== 'transparent');

  const topping = {
    color: getIngredientColor('toppings', recipe.toppings),
    amount: recipe.toppingsAmount,
  };

  const totalLiquidAmount = layers.reduce((sum, l) => sum + l.amount, 0);

  const liquidLayers = layers.filter(l => l.amount > 0);

  // Blend colors for a more realistic look
  const blendColors = (colors: { color: string; amount: number }[]): string => {
    if (colors.length === 0) return '#f0f0f0'; // Empty cup
    if (colors.length === 1) return colors[0].color;

    let totalAmount = 0;
    let r = 0, g = 0, b = 0;

    colors.forEach(({ color, amount }) => {
      const hex = color.replace('#', '');
      const layerR = parseInt(hex.substring(0, 2), 16);
      const layerG = parseInt(hex.substring(2, 4), 16);
      const layerB = parseInt(hex.substring(4, 6), 16);
      
      totalAmount += amount;
      r += layerR * amount;
      g += layerG * amount;
      b += layerB * amount;
    });

    if (totalAmount === 0) return '#f0f0f0';

    r = Math.round(r / totalAmount);
    g = Math.round(g / totalAmount);
    b = Math.round(b / totalAmount);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const finalColor = blendColors(liquidLayers);

  const fillPercentage = Math.min(100, (totalLiquidAmount / MAX_VOLUME) * 100);

  const hasWhippedCream = recipe.toppings === 'whipped-cream';
  const hasDrizzle = recipe.toppings === 'caramel-drizzle';
  const hasShavings = recipe.toppings === 'chocolate-shavings' || recipe.toppings === 'cinnamon';

  return (
    <div className="relative w-full max-w-[250px] mx-auto aspect-[3/4]">
      <svg viewBox="0 0 150 200" className="w-full h-full">
        {/* Cup body */}
        <path
          d="M20,0 H130 L115,180 Q110,195 75,195 T35,180 L20,0 Z"
          fill="#fff"
          stroke="#e0e0e0"
          strokeWidth="2"
        />

        {/* Liquid */}
        <defs>
          <clipPath id="liquidClip">
            <path d="M22,5 H128 L114,178 Q110,193 75,193 T36,178 L22,5 Z" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#liquidClip)">
          {/* Base Liquid Fill */}
          <rect
            x="20"
            y={180 - (175 * fillPercentage / 100)}
            width="110"
            height={175 * fillPercentage / 100}
            fill={finalColor}
            className="transition-all duration-500"
          />

           {/* Toppings */}
           {hasWhippedCream && (
             <path
               d="M 40 100 C 40 80, 110 80, 110 100 C 110 80, 75 40, 75 40 C 75 40, 40 80, 40 100 Z"
               fill="#f7f7f7"
               transform={`translate(0, ${75 - (175 * fillPercentage / 100)})`}
               style={{filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))'}}
            />
           )}
          
           {hasDrizzle && (
              <g transform={`translate(0, ${100 - (175 * fillPercentage / 100)})`}>
                <path d="M40 80 Q 60 90, 80 80 T 120 80" stroke={topping.color} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M45 85 Q 65 95, 85 85 T 125 85" stroke={topping.color} strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
           )}

           {hasShavings && (
              <g transform={`translate(0, ${100 - (175 * fillPercentage / 100)})`}>
                {[...Array(20)].map((_, i) => (
                  <circle 
                    key={i}
                    cx={45 + Math.random() * 60}
                    cy={80 + Math.random() * 20}
                    r={Math.random() * 1.5 + 0.5}
                    fill={topping.color}
                    opacity={0.7}
                  />
                ))}
              </g>
            )}

        </g>

        {/* Cup top ellipse */}
        <ellipse cx="75" cy="5" rx="55" ry="5" fill="#fff" stroke="#e0e0e0" strokeWidth="1.5" />
        
        {/* Handle */}
        <path
          d="M130,50 Q160,60 160,95 Q160,130 130,140"
          stroke="#e0e0e0"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M130,50 Q160,60 160,95 Q160,130 130,140"
          stroke="#fff"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />

      </svg>
    </div>
  );
};

export default CupVisualizer;

    