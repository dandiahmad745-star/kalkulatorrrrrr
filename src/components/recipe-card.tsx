"use client";

import { Copy, Trash2 } from 'lucide-react';
import type { Recipe } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { capitalize } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onCopy: (recipe: Recipe) => void;
  onDelete: (id: string) => void;
}

const RecipeCard = ({ recipe, onCopy, onDelete }: RecipeCardProps) => {
  const formatValue = (value: string, brand?: string) => {
    if (value === 'none' || !value) return null;
    return brand ? `${capitalize(value)} (${capitalize(brand)})` : capitalize(value);
  };
  
  const getUnit = (category: string, value: string) => {
      const cat = category.replace(/Amount$/, '') as keyof typeof ingredientCategories;
      if (ingredientCategories[cat]) {
        return ingredientCategories[cat].find(i => i.value === value)?.unit || '';
      }
      return '';
  }

  const recipeDetails = Object.entries(recipe)
    .filter(([key, value]) => {
      return !key.endsWith('Amount') && !key.endsWith('Brand') && key !== 'id' && value !== 'none' && value;
    })
    .map(([key, value]) => {
      const amountKey = `${key}Amount` as keyof Recipe;
      const brandKey = `${key}Brand` as keyof Recipe;
      const amount = recipe[amountKey];
      const brand = recipe[brandKey] as string | undefined;
      const unit = getUnit(key, value as string);
      
      let displayValue = capitalize(value as string);
      if (brand) {
        displayValue += ` (${capitalize(brand)})`;
      }
       if (amount && (unit === 'g' || unit === 'ml')) {
        displayValue += ` - ${amount}${unit}`;
      }

      return {
        label: capitalize(key.replace(/([A-Z])/g, ' $1')),
        value: displayValue,
      };
    });

  return (
    <Card className="flex flex-col bg-secondary/50">
      <CardHeader>
        <CardTitle className="text-xl">Custom Blend</CardTitle>
        <CardDescription>Saved on {new Date(recipe.id).toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Separator className="mb-4" />
        <ul className="space-y-2 text-sm">
          {recipeDetails.map(detail => (
            <li key={detail.label} className="flex justify-between">
              <span className="text-muted-foreground">{detail.label}:</span>
              <span className="font-medium text-right">{detail.value}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="icon" onClick={() => onCopy(recipe)}>
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy recipe</span>
        </Button>
        <Button variant="ghost" size="icon" onClick={() => onDelete(recipe.id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">Delete recipe</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
