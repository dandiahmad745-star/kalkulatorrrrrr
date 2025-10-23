'use client';

import * as React from 'react';
import * as Tone from 'tone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Play, Pause, RotateCcw, Sparkles, Lightbulb, TimerIcon } from 'lucide-react';
import type { Recipe } from '@/lib/definitions';
import { ingredientCategories } from '@/lib/ingredients';
import { getAIOptimalBrewTime } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { SteamingCoffeeIcon } from './icons';

interface BrewTimerProps {
  recipe: Recipe;
}

const formatTime = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  const parts: string[] = [];
  if (h > 0) parts.push(String(h).padStart(2, '0'));
  parts.push(String(m).padStart(2, '0'));
  parts.push(String(s).padStart(2, '0'));

  return parts.join(':');
};

const BrewTimer: React.FC<BrewTimerProps> = ({ recipe }) => {
  const defaultTime =
    ingredientCategories.brewingMethod.find((m) => m.value === recipe.brewingMethod)?.brewTime || 0;

  const [totalSeconds, setTotalSeconds] = React.useState(defaultTime);
  const [remainingSeconds, setRemainingSeconds] = React.useState(defaultTime);
  const [isActive, setIsActive] = React.useState(false);
  const [aiTime, setAiTime] = React.useState<{ time: number; justification: string } | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const synth = React.useRef<Tone.Synth | null>(null);

  React.useEffect(() => {
    // Sync timer with default time when recipe changes, if not active
    const newDefaultTime =
      ingredientCategories.brewingMethod.find((m) => m.value === recipe.brewingMethod)
        ?.brewTime || 0;
    
    // Use AI time if available, otherwise default
    const newTotal = aiTime ? aiTime.time : newDefaultTime;
    
    if (!isActive) {
      setTotalSeconds(newTotal);
      setRemainingSeconds(newTotal);
    }
  }, [recipe.brewingMethod, isActive, aiTime]);

  const stopTimer = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsActive(false);
  }, []);

  React.useEffect(() => {
    if (isActive && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainingSeconds === 0 && isActive) {
      stopTimer();
      // Play a sound
      if (!synth.current) {
        synth.current = new Tone.Synth().toDestination();
      }
      Tone.start().then(() => {
        synth.current?.triggerAttackRelease('C5', '0.5');
      });
      toast({ title: 'Brewing Complete!', description: 'Your coffee is ready.' });
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, remainingSeconds, stopTimer, toast]);

  const handleStartPause = () => {
    if (remainingSeconds > 0) {
        setIsActive(!isActive);
    }
  };

  const handleReset = () => {
    stopTimer();
    setRemainingSeconds(totalSeconds);
  };
  
  const handleUseAiTime = () => {
    if (aiTime) {
      stopTimer();
      setTotalSeconds(aiTime.time);
      setRemainingSeconds(aiTime.time);
      toast({ title: 'AI Time Applied!', description: `Timer set to ${formatTime(aiTime.time)}.` });
    }
  };

  const handleGetAITime = () => {
    startTransition(async () => {
      const result = await getAIOptimalBrewTime({
        brewingMethod: recipe.brewingMethod,
        coffeeAmount: recipe.coffeeBeansAmount,
      });

      if (result.success) {
        setAiTime({ time: result.data.optimalTime, justification: result.data.justification });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error || 'Could not fetch AI recommendation.',
        });
      }
    });
  };

  const progress = totalSeconds > 0 ? (remainingSeconds / totalSeconds) * 100 : 0;
  const isComplete = remainingSeconds <= 0;

  return (
    <Card className="bg-secondary/50 p-6 flex flex-col items-center gap-6">
      <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-8 border-muted">
        <div 
          className="absolute inset-0 rounded-full bg-primary transition-transform duration-500"
          style={{ transform: `scaleY(${(isComplete && isActive) ? 1 : progress / 100})`, transformOrigin: 'bottom' }}
        />
        <div className="relative z-10 text-center">
            <Label className="text-sm text-primary-foreground/80">Remaining</Label>
            <div className={`text-5xl font-bold tabular-nums ${isComplete ? 'text-primary-foreground' : 'text-primary-foreground'}`}>
                {formatTime(remainingSeconds)}
            </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center gap-4">
        <Button onClick={handleStartPause} size="lg" disabled={isComplete && !isActive}>
          {isActive ? <Pause /> : <Play />}
          {isActive ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleReset} size="lg" variant="outline">
          <RotateCcw />
          Reset
        </Button>
      </div>
      
      <Separator className="w-full" />

      <div className="w-full space-y-4">
         <Button onClick={handleGetAITime} disabled={isPending} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" /> Get AI Recommendation
        </Button>
        {isPending ? (
            <div className="m-auto flex flex-col items-center gap-2 text-muted-foreground">
                <SteamingCoffeeIcon className="h-10 w-10" />
                <span>Finding optimal time...</span>
            </div>
        ) : aiTime && (
            <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle className="flex justify-between items-center">
                    <span>AI Suggestion: {formatTime(aiTime.time)}</span>
                    <Button variant="link" className="p-0 h-auto" onClick={handleUseAiTime}>Use this time</Button>
                </AlertTitle>
                <AlertDescription>{aiTime.justification}</AlertDescription>
            </Alert>
        )}
      </div>
    </Card>
  );
};

export default BrewTimer;