'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { Recipe } from '@/lib/definitions';
import { ingredientCategories, type IngredientCost } from '@/lib/ingredients';
import { capitalize } from '@/lib/utils';
import { DollarSign, Edit } from 'lucide-react';

interface CostCalculatorProps {
  recipe: Recipe;
  costs: IngredientCost;
  onCostChange: React.Dispatch<React.SetStateAction<IngredientCost>>;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const CostCalculator: React.FC<CostCalculatorProps> = ({ recipe, costs, onCostChange }) => {
  const [profitMargin, setProfitMargin] = React.useState(50);

  const costDetails = React.useMemo(() => {
    const details: { key: string, label: string; cost: number; unit: 'g' | 'ml'; amount: number }[] = [];

    (Object.keys(ingredientCategories) as (keyof typeof ingredientCategories)[]).forEach(cat => {
      const selectedValue = recipe[cat as keyof Recipe] as string;
      const amount = recipe[`${cat}Amount` as keyof Recipe] as number || 0;

      if (selectedValue === 'none' || amount === 0) {
        return;
      }
      
      const option = ingredientCategories[cat].find(o => o.value === selectedValue);
      if (!option) return;

      let itemCostKey: string;
      let itemName = option.label;

      const brandKey = `${cat}Brand` as keyof Recipe;
      const selectedBrandValue = recipe[brandKey] as string | undefined;

      if (option.brands && selectedBrandValue) {
        const brand = option.brands.find(b => b.value === selectedBrandValue);
        if (brand) {
          itemCostKey = `${cat}__${selectedValue}__${selectedBrandValue}`;
          itemName = `${option.label} (${brand.label})`;
        } else {
          itemCostKey = `${cat}__${selectedValue}`;
        }
      } else {
        itemCostKey = `${cat}__${selectedValue}`;
      }

      const itemCostPerUnit = costs[itemCostKey] ?? 0;
      
      if (cat === 'roastLevel') {
          const coffeeBeansAmount = recipe.coffeeBeansAmount || 0;
          if(coffeeBeansAmount > 0) {
             details.push({
                key: itemCostKey,
                label: `Roasting (${itemName})`,
                cost: itemCostPerUnit * coffeeBeansAmount,
                unit: option.unit,
                amount: coffeeBeansAmount,
            });
          }
      } else {
        details.push({
            key: itemCostKey,
            label: itemName,
            cost: itemCostPerUnit * amount,
            unit: option.unit,
            amount: amount,
        });
      }
    });

    return details;
  }, [recipe, costs]);

  const totalCost = React.useMemo(() => {
    return costDetails.reduce((sum, item) => sum + item.cost, 0);
  }, [costDetails]);

  const sellingPrice = React.useMemo(() => {
    if (totalCost === 0) return 0;
    return totalCost / (1 - profitMargin / 100);
  }, [totalCost, profitMargin]);

  const handleCostValueChange = (key: string, value: string) => {
    const newCost = parseFloat(value) || 0;
    onCostChange(prevCosts => ({
      ...prevCosts,
      [key]: newCost,
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign />
          Cost Calculator
        </CardTitle>
        <CardDescription>Calculate selling price and customize ingredient costs.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="single" collapsible>
          <AccordionItem value="cost-breakdown">
            <AccordionTrigger>
              <h3 className="text-sm font-medium">Cost Breakdown</h3>
            </AccordionTrigger>
            <AccordionContent className="space-y-2 pt-2">
              <div className="space-y-1 text-sm text-muted-foreground">
                {costDetails.length > 0 ? (
                  costDetails.map((item) => (
                    <div key={item.key} className="flex justify-between items-center">
                      <span className="truncate pr-2">{capitalize(item.label)}</span>
                      <span className="font-mono">{formatCurrency(item.cost)}</span>
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="customize-costs">
            <AccordionTrigger>
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Edit className="h-4 w-4" /> Customize Costs
              </h3>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2">
              {costDetails.length > 0 ? (
                costDetails.map((item) => (
                  <div key={item.key} className="grid grid-cols-3 items-center gap-2">
                    <Label htmlFor={item.key} className="col-span-2 text-xs truncate">{capitalize(item.label)}</Label>
                    <div className="relative">
                      <Input
                        id={item.key}
                        type="number"
                        value={costs[item.key] ?? 0}
                        onChange={(e) => handleCostValueChange(item.key, e.target.value)}
                        className="h-8 pl-5 pr-1 text-xs"
                      />
                       <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                        Rp
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                 <p className="text-sm text-muted-foreground">No ingredients in recipe to customize.</p>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
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
