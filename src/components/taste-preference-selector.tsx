'use client';

import * as React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { TastePreference } from '@/lib/definitions';
import { Separator } from './ui/separator';

const preferences: TastePreference[] = [
  {
    key: 'sweetness',
    label: 'Suka Manis',
    icon: '🟤',
    description: 'Sweet & Syrupy',
  },
  {
    key: 'bitterness',
    label: 'Suka Pahit',
    icon: '⚫',
    description: 'Strong & Bold',
  },
  {
    key: 'body',
    label: 'Suka Creamy / Milky',
    icon: '🟡',
    description: 'Milky & Smooth',
  },
  {
    key: 'acidity',
    label: 'Suka Fruity / Segar',
    icon: '🟢',
    description: 'Fresh & Acidic',
  },
  {
    key: 'aroma',
    label: 'Suka Nutty / Classic',
    icon: '🔵',
    description: 'Classic & Aromatic',
  },
  {
    key: 'random',
    label: 'Eksperimen / Mix Random',
    icon: '🟣',
    description: 'Mix & Random',
  },
];

interface TastePreferenceSelectorProps {
  onSelectPreference: (preference: TastePreference) => void;
}

const TastePreferenceSelector: React.FC<TastePreferenceSelectorProps> = ({ onSelectPreference }) => {
  const [selected, setSelected] = React.useState<TastePreference['key'] | null>(null);

  const handleSelect = (preference: TastePreference) => {
    setSelected(preference.key);
    onSelectPreference(preference);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>What's Your Flavor?</CardTitle>
        <CardDescription>
          Pilih preferensi rasa Anda untuk mendapatkan rekomendasi resep acak.
        </CardDescription>
      </CardHeader>
      <Separator />
      <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-3 lg:grid-cols-6">
        {preferences.map((pref) => (
          <Button
            key={pref.key}
            variant={selected === pref.key ? 'default' : 'outline'}
            className="h-auto w-full flex-col items-center justify-center gap-2 p-4"
            onClick={() => handleSelect(pref)}
          >
            <span className="text-3xl">{pref.icon}</span>
            <div className="text-center">
              <p className="font-semibold">{pref.label}</p>
              <p className="text-xs text-muted-foreground">{pref.description}</p>
            </div>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default TastePreferenceSelector;
