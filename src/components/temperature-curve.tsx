
'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import type { FlavorProfile } from '@/lib/definitions';
import { Card } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Thermometer } from 'lucide-react';

interface TemperatureCurveProps {
  flavorProfile: FlavorProfile;
}

const chartConfig = {
  sweetness: { label: 'Sweetness', color: 'hsl(var(--chart-1))' },
  bitterness: { label: 'Bitterness', color: 'hsl(var(--chart-2))' },
  acidity: { label: 'Acidity', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

// Simplified taste perception change model
const getTasteAtTemperature = (
  initialProfile: FlavorProfile,
  temp: number
): { temp: number; sweetness: number; bitterness: number; acidity: number } => {
  const { sweetness, bitterness, acidity } = initialProfile;

  // Normalization factor (0-1) based on temperature, where 90C is 0 and 20C is 1
  const coolFactor = Math.max(0, Math.min(1, (90 - temp) / 70));

  // Sweetness is perceived most around 35-50C (warm)
  const sweetTempFactor = 1 - Math.abs(temp - 42) / 50; 
  const newSweetness = sweetness * (1 + sweetTempFactor * 0.5);

  // Acidity is more pronounced when hot and when cool, less in the middle
  const acidTempFactor = (1 - coolFactor) * 1.2 + coolFactor * 1.1;
  const newAcidity = acidity * acidTempFactor;

  // Bitterness is suppressed when cold
  const bitterTempFactor = 1 - coolFactor * 0.6;
  const newBitterness = bitterness * bitterTempFactor;
  
  return {
    temp,
    sweetness: Math.max(0, Math.round(newSweetness * 10) / 10),
    bitterness: Math.max(0, Math.round(newBitterness * 10) / 10),
    acidity: Math.max(0, Math.round(newAcidity * 10) / 10),
  };
};

const TemperatureCurve: React.FC<TemperatureCurveProps> = ({ flavorProfile }) => {
  const chartData = React.useMemo(() => {
    const data = [];
    for (let temp = 90; temp >= 20; temp -= 5) {
      data.push(getTasteAtTemperature(flavorProfile, temp));
    }
    return data.reverse(); // Show from cool to hot
  }, [flavorProfile]);

  const peakSweetness = React.useMemo(() => {
    if (!chartData || chartData.length === 0) return { temp: 0, value: 0 };
    return chartData.reduce((max, point) => point.sweetness > max.value ? { temp: point.temp, value: point.sweetness } : max, { temp: 0, value: 0 });
  }, [chartData]);
  
  return (
    <Card className="p-4 md:p-6">
       <ChartContainer config={chartConfig} className="w-full aspect-video">
        <AreaChart
            data={chartData}
            margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
            }}
        >
            <CartesianGrid vertical={false} />
            <XAxis
                dataKey="temp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                unit="°C"
                />
            <YAxis 
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[0, 'dataMax + 2']}
            />
            <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
            />
            <defs>
                <linearGradient id="fillSweetness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-sweetness)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-sweetness)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillBitterness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-bitterness)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-bitterness)" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillAcidity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-acidity)" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="var(--color-acidity)" stopOpacity={0.1} />
                </linearGradient>
            </defs>
            <Area type="monotone" dataKey="acidity" stroke="var(--color-acidity)" fill="url(#fillAcidity)" stackId="1" />
            <Area type="monotone" dataKey="bitterness" stroke="var(--color-bitterness)" fill="url(#fillBitterness)" stackId="1" />
            <Area type="monotone" dataKey="sweetness" stroke="var(--color-sweetness)" fill="url(#fillSweetness)" stackId="1" />
        </AreaChart>
       </ChartContainer>
       <Alert className="mt-6">
        <Thermometer className="h-4 w-4" />
        <AlertTitle>Flavor Insight</AlertTitle>
        <AlertDescription>
          Grafik ini menyimulasikan bagaimana persepsi rasa berubah saat kopi mendingin. Rasa manis seringkali paling menonjol pada suhu hangat (sekitar {peakSweetness.temp}°C), sementara rasa asam dan pahit lebih mudah dideteksi pada suhu yang lebih ekstrem (panas atau dingin).
        </AlertDescription>
      </Alert>
    </Card>
  );
};

export default TemperatureCurve;

