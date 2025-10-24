
'use client';

import * as React from 'react';
import type { Recipe } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';

interface CupVisualizerProps {
  recipe: Recipe;
}

const MAX_VOLUME = 250; // Max volume of the cup in ml

const CupVisualizer = ({ recipe }: CupVisualizerProps) => {
  const [isClient, setIsClient] = React.useState(false);
  const [bubbleAnims, setBubbleAnims] = React.useState<any[]>([]);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    const newBubbleAnims = [...Array(5)].map(() => ({
      cx: 30 + Math.random() * 90,
      r: Math.random() * 2 + 1,
      dur: Math.random() * 1.5 + 1,
      opacityDur: Math.random() * 1.5 + 1,
    }));
    setBubbleAnims(newBubbleAnims);
  }, [recipe]);

  
  const getIngredientColor = (category: keyof typeof ingredientCategories, value: string): string => {
    const ingredient = ingredientCategories[category]?.find(i => i.value === value);
    return ingredient?.color || 'transparent';
  };

  const layers = [
    { color: getIngredientColor('brewingMethod', recipe.brewingMethod), amount: recipe.brewingMethodAmount },
    { color: getIngredientColor('syrup', recipe.syrup), amount: recipe.syrupAmount },
    { color: getIngredientColor('sweetener', recipe.sweetener), amount: recipe.sweetenerAmount },
    { color: getIngredientColor('milk', recipe.milk), amount: recipe.milkAmount },
    { color: getIngredientColor('creamer', recipe.creamer), amount: recipe.creamerAmount },
  ].filter(l => l.amount > 0 && l.color !== 'transparent');

  const topping = {
    color: getIngredientColor('toppings', recipe.toppings),
    amount: recipe.toppingsAmount,
  };
  
  const totalLiquidAmount = layers.reduce((sum, l) => sum + l.amount, 0);

  const blendColors = (colors: { color: string; amount: number }[]): string => {
    if (colors.length === 0) return '#e0e0e0';
    if (colors.length === 1) return colors[0].color;
    let totalAmount = 0;
    let r = 0, g = 0, b = 0;
    colors.forEach(({ color, amount }) => {
      const hex = color.replace('#', '');
      if (hex.length < 6) return;
      const layerR = parseInt(hex.substring(0, 2), 16);
      const layerG = parseInt(hex.substring(2, 4), 16);
      const layerB = parseInt(hex.substring(4, 6), 16);
      totalAmount += amount;
      r += layerR * amount;
      g += layerG * amount;
      b += layerB * amount;
    });
    if (totalAmount === 0) return '#e0e0e0';
    r = Math.round(r / totalAmount);
    g = Math.round(g / totalAmount);
    b = Math.round(b / totalAmount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const finalColor = blendColors(layers);
  const fillPercentage = Math.min(100, (totalLiquidAmount / MAX_VOLUME) * 100);
  const liquidHeight = 175 * (fillPercentage / 100);
  const liquidTopY = 180 - liquidHeight;

  const hasWhippedCream = recipe.toppings === 'whipped-cream';
  const hasDrizzle = recipe.toppings === 'caramel-drizzle';
  const hasShavings = recipe.toppings === 'chocolate-shavings' || recipe.toppings === 'cinnamon';
  const isHot = recipe.brewingMethod !== 'cold-brew';

  // Unique key to re-trigger animations
  const recipeKey = JSON.stringify(recipe);

  return (
    <div className="relative w-full max-w-[250px] mx-auto aspect-[3/4]">
      <svg viewBox="0 0 160 200" className="w-full h-full overflow-visible">
        <defs>
          <clipPath id="liquidClip">
            <path d="M22,5 H128 L114,178 Q110,193 75,193 T36,178 L22,5 Z" />
          </clipPath>
          <filter id="liquidWobble">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.1" numOctaves="1" result="warp">
               <animate attributeName="baseFrequency" values="0.02 0.1;0.02 0.12;0.02 0.1" dur="2s" repeatCount="indefinite"/>
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
           <linearGradient id="cupShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.6"/>
            <stop offset="40%" stopColor="white" stopOpacity="0.05"/>
            <stop offset="100%" stopColor="white" stopOpacity="0.1"/>
          </linearGradient>
           <radialGradient id="liquidShine" cx="0.5" cy="1" r="0.8">
            <stop offset="0%" stopColor={finalColor} />
            <stop offset="100%" stopColor={blendColors([{color: finalColor, amount: 1}, {color: '#000000', amount: 0.1}])} />
          </radialGradient>
        </defs>
        
        {/* Cup Shadow */}
        <ellipse cx="75" cy="195" rx="50" ry="8" fill="black" opacity="0.1" />

        {/* Cup Body */}
        <path
          d="M20,0 H130 L115,180 Q110,195 75,195 T35,180 L20,0 Z"
          fill="#f9f9f9"
          stroke="#e0e0e0"
          strokeWidth="1"
        />
        {/* Cup Shine */}
         <path
          d="M30 10 C 50 50, 60 120, 45 180"
          stroke="url(#cupShine)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />

        {/* Liquid group with clip-path */}
        <g clipPath="url(#liquidClip)" key={recipeKey}>
          {fillPercentage > 0 && isClient && (
            <>
              {/* Animated Bubbles */}
              {bubbleAnims.map((anim, i) => (
                <circle 
                  key={i}
                  cx={anim.cx} 
                  cy={185}
                  r={anim.r}
                  fill={finalColor}
                  opacity="0.3"
                >
                  <animate attributeName="cy" from="185" to={liquidTopY + 10} dur={`${anim.dur}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.3" to="0" dur={`${anim.opacityDur}s`} begin={`${i * 0.2}s`} repeatCount="indefinite" />
                </circle>
              ))}

              {/* Main Liquid Body */}
              <rect
                x="20"
                y={liquidTopY}
                width="110"
                height={liquidHeight}
                fill="url(#liquidShine)"
                className="transition-all duration-700 ease-out"
              />
              {/* Liquid Surface */}
              <ellipse
                cx="75"
                cy={liquidTopY}
                rx="53"
                ry="3"
                fill={finalColor}
                filter="url(#liquidWobble)"
                className="transition-all duration-700 ease-out"
              />
            </>
          )}

          {/* Toppings */}
          {hasWhippedCream && (
             <path
               d="M 40 100 C 40 80, 110 80, 110 100 C 110 80, 75 40, 75 40 C 75 40, 40 80, 40 100 Z"
               fill="#f7f7f7"
               transform={`translate(0, ${-5 + liquidTopY - 100})`}
               style={{filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))', transition: 'transform 0.7s ease-out'}}
            />
           )}
           {hasDrizzle && isClient && (
              <g transform={`translate(0, ${liquidTopY - 100})`} style={{transition: 'transform 0.7s ease-out'}}>
                <path d="M40 80 Q 60 90, 80 80 T 120 80" stroke={topping.color} strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M45 85 Q 65 95, 85 85 T 125 85" stroke={topping.color} strokeWidth="2" fill="none" strokeLinecap="round" />
              </g>
           )}
           {hasShavings && isClient && (
              <g transform={`translate(0, ${liquidTopY - 100})`} style={{transition: 'transform 0.7s ease-out'}}>
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
        
        {/* Steam Animation */}
        {isHot && fillPercentage > 10 && (
          <g transform={`translate(0, ${liquidTopY - 20})`} style={{transition: 'transform 0.7s ease-out'}}>
            <path d="M 65 15 Q 65 5, 70 5 T 75 15" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5">
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -15" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3s" repeatCount="indefinite" />
            </path>
             <path d="M 75 15 Q 75 5, 80 5 T 85 15" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5">
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -20" dur="4s" begin="1s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="4s" begin="1s" repeatCount="indefinite" />
            </path>
             <path d="M 85 15 Q 85 5, 90 5 T 95 15" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5">
              <animateTransform attributeName="transform" type="translate" values="0 0; 0 -18" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0" dur="3.5s" begin="0.5s" repeatCount="indefinite" />
            </path>
          </g>
        )}

        {/* Cup top ellipse and handle (on top) */}
        <ellipse cx="75" cy="5" rx="55" ry="5" fill="#f9f9f9" stroke="#dcdcdc" strokeWidth="1" />
        <path
          d="M130,50 Q160,60 160,95 Q160,130 130,140"
          stroke="#e0e0e0"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M130,50 Q160,60 160,95 Q160,130 130,140"
          stroke="#f9f9f9"
          strokeWidth="11"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CupVisualizer;

    