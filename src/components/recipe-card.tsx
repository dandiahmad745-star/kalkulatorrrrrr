"use client";

import { Copy, Trash2 } from 'lucide-react';
import type { Recipe } from '@/lib/definitions';
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
  const recipeDetails = [
    { label: 'Beans', value: recipe.coffeeBeans },
    { label: 'Roast', value: recipe.roastLevel },
    { label: 'Method', value: recipe.brewingMethod },
    { label: 'Milk', value: recipe.milk },
    { label: 'Creamer', value: recipe.creamer },
    { label: 'Syrup', value: `${recipe.syrup}${recipe.syrupBrand ? ` (${recipe.syrupBrand})` : ''}`},
    { label: 'Topping', value: recipe.toppings },
  ];
  
  return (
    <Card className="flex flex-col bg-secondary/50">
      <CardHeader>
        <CardTitle className="text-xl">Custom Blend</CardTitle>
        <CardDescription>Saved on {new Date().toLocaleDateString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Separator className="mb-4" />
        <ul className="space-y-2 text-sm">
          {recipeDetails.filter(d => d.value !== 'none').map(detail => (
            <li key={detail.label} className="flex justify-between">
              <span className="text-muted-foreground">{detail.label}:</span>
              <span className="font-medium text-right">{capitalize(detail.value)}</span>
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
