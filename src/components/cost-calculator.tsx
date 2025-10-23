
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import type { Recipe } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';
import { capitalize } from '@/lib/utils';
import { DollarSign } from 'lucide-react';

interface CostCalculatorProps {
  recipe: Recipe;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CostCalculator: React.FC<CostCalculatorProps> = ({ recipe }) => {
  const [profitMargin, setProfitMargin] = React.useState(50); // Default 50% profit margin

  const costDetails = React.useMemo(() => {
    const details: { label: string; cost: number }[] = [];

    (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach(cat => {
      const selectedValue = recipe[cat as keyof Recipe] as string;
      const amount = recipe[`${cat}Amount` as keyof Recipe] as number || 0;

      if (selectedValue === 'none' || amount === 0) {
        return;
      }
      
      const option = ingredientCategories[cat].find(o => o.value === selectedValue);
      if (!option) return;

      let itemCost = option.cost;
      let itemName = option.label;

      const brandKey = `${cat}Brand` as keyof Recipe;
      const selectedBrandValue = recipe[brandKey] as string | undefined;

      if (option.brands && selectedBrandValue) {
        const brand = option.brands.find(b => b.value === selectedBrandValue);
        if (brand) {
          itemCost = brand.cost;
          itemName = `${option.label} (${brand.label})`;
        }
      }
      
      // For roast level, cost is additive to coffee beans, not a separate ingredient
      if (cat === 'roastLevel') {
          const coffeeBeansAmount = recipe.coffeeBeansAmount || 0;
          if(coffeeBeansAmount > 0) {
             details.push({
                label: `Roasting (${itemName})`,
                cost: itemCost * coffeeBeansAmount,
            });
          }
      } else {
        details.push({
            label: itemName,
            cost: itemCost * amount,
        });
      }
    });

    return details;
  }, [recipe]);

  const totalCost = React.useMemo(() => {
    return costDetails.reduce((sum, item) => sum + item.cost, 0);
  }, [costDetails]);

  const sellingPrice = React.useMemo(() => {
    if (totalCost === 0) return 0;
    return totalCost / (1 - profitMargin / 100);
  }, [totalCost, profitMargin]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign />
          Cost Calculator
        </CardTitle>
        <CardDescription>Calculate the selling price based on ingredient costs and profit margin.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Cost Breakdown</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            {costDetails.length > 0 ? (
              costDetails.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{capitalize(item.label)}</span>
                  <span>{formatCurrency(item.cost)}</span>
                </div>
              ))
            ) : (
              <p>No ingredients selected.</p>
            )}
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total Cost</span>
            <span>{formatCurrency(totalCost)}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
             <Label htmlFor="profit-margin">Profit Margin</Label>
             <span className="font-semibold text-primary">{profitMargin}%</span>
          </div>
          <Slider
            id="profit-margin"
            min={0}
            max={200}
            step={5}
            value={[profitMargin]}
            onValueChange={(value) => setProfitMargin(value[0])}
          />
        </div>

        <Separator />

        <div className="space-y-2">
            <div className="flex justify-between items-center text-lg font-bold">
                <span>Recommended Selling Price</span>
                <span className="text-green-600">{formatCurrency(sellingPrice)}</span>
            </div>
            <p className="text-xs text-muted-foreground">
                This price ensures a {profitMargin}% profit margin over the total cost of ingredients.
            </p>
        </div>

      </CardContent>
    </Card>
  );
};

export default CostCalculator;
