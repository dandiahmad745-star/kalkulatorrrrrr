
'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb } from 'lucide-react';

const BaristaMathAssistant: React.FC = () => {
  const [dose, setDose] = React.useState<number>(18);
  const [yieldWeight, setYieldWeight] = React.useState<number>(36);
  const [tds, setTds] = React.useState<number>(10);

  const brewRatio = React.useMemo(() => {
    if (dose > 0 && yieldWeight > 0) {
      const ratio = yieldWeight / dose;
      return `1 : ${ratio.toFixed(2)}`;
    }
    return 'N/A';
  }, [dose, yieldWeight]);

  const extractionYield = React.useMemo(() => {
    if (dose > 0 && yieldWeight > 0 && tds > 0) {
      const ey = (yieldWeight * tds) / dose;
      return ey.toFixed(2);
    }
    return 'N/A';
  }, [dose, yieldWeight, tds]);

  const getExtractionFeedback = () => {
    const ey = parseFloat(extractionYield);
    if (isNaN(ey)) return null;

    let title = '';
    let description = '';
    let variant: 'default' | 'destructive' = 'default';

    if (ey < 18) {
      title = 'Under-extracted';
      description =
        'This often tastes sour, acidic, and lacks sweetness. The coffee flavors are not fully developed. Try grinding finer, increasing brew time, or increasing water temperature.';
      variant = 'default';
    } else if (ey > 22) {
      title = 'Over-extracted';
      description =
        'This often tastes bitter, astringent, and hollow. Too many soluble compounds have been dissolved. Try grinding coarser, reducing brew time, or decreasing water temperature.';
      variant = 'destructive';
    } else {
      title = 'Ideal Extraction';
      description =
        'You are in the ideal range (18-22%) for a balanced and sweet extraction. This is the sweet spot for most coffees!';
      variant = 'default';
    }

    return (
      <Alert variant={variant} className="mt-4">
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    );
  };

  return (
    <Card className="bg-secondary/50 p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="dose">Coffee Dose (g)</Label>
          <Input
            id="dose"
            type="number"
            value={dose}
            onChange={(e) => setDose(parseFloat(e.target.value) || 0)}
            placeholder="e.g., 18"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="yield">Beverage Weight (g)</Label>
          <Input
            id="yield"
            type="number"
            value={yieldWeight}
            onChange={(e) => setYieldWeight(parseFloat(e.target.value) || 0)}
            placeholder="e.g., 36"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tds">TDS (%)</Label>
          <Input
            id="tds"
            type="number"
            step="0.1"
            value={tds}
            onChange={(e) => setTds(parseFloat(e.target.value) || 0)}
            placeholder="e.g., 10.0"
          />
        </div>
      </div>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-2">
        <div className="rounded-lg bg-background p-4">
          <p className="text-sm text-muted-foreground">Brew Ratio</p>
          <p className="text-2xl font-bold">{brewRatio}</p>
        </div>
        <div className="rounded-lg bg-background p-4">
          <p className="text-sm text-muted-foreground">Extraction Yield (%)</p>
          <p className="text-2xl font-bold">{extractionYield}%</p>
        </div>
      </div>
      {getExtractionFeedback()}
    </Card>
  );
};

export default BaristaMathAssistant;

    