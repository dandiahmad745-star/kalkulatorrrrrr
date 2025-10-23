
"use client";

import { PolarGrid, PolarAngleAxis, Radar, RadarChart, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { FlavorProfile } from '@/lib/definitions';
import { FLAVOR_PROFILE_KEYS, FLAVOR_PROFILE_CONFIG } from '@/lib/definitions';
import { capitalize } from '@/lib/utils';

interface FlavorProfileChartProps {
  profile: FlavorProfile;
}

const chartConfig = {
  ...FLAVOR_PROFILE_CONFIG,
  profile: {
    label: 'Profile',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

const FlavorProfileChart = ({ profile }: FlavorProfileChartProps) => {
  const chartData = FLAVOR_PROFILE_KEYS.map((key) => ({
    metric: capitalize(key),
    value: Math.max(0, Math.min(10, profile[key] || 0)), // Clamp values between 0 and 10
  }));

  const maxVal = Math.max(...chartData.map(d => d.value), 5);

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[350px]">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <PolarAngleAxis dataKey="metric" tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} />
        <PolarRadiusAxis angle={30} domain={[0, maxVal]} tick={false} axisLine={false} />
        <PolarGrid gridType="polygon" />
        <Radar dataKey="value" fill="hsl(var(--primary))" fillOpacity={0.6} stroke="hsl(var(--primary))" />
      </RadarChart>
    </ChartContainer>
  );
};

export default FlavorProfileChart;

    