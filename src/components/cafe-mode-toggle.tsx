"use client";

import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { Volume2, VolumeX } from 'lucide-react';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const CafeModeToggle = () => {
  const [isCafeMode, setIsCafeMode] = useState(false);
  const noise = useRef<Tone.Noise | null>(null);
  const filter = useRef<Tone.Filter | null>(null);

  useEffect(() => {
    if (isCafeMode) {
      if (!noise.current) {
        // Simulating cafe hum with brown noise and a low-pass filter
        noise.current = new Tone.Noise("brown").start();
        filter.current = new Tone.Filter(300, "lowpass").toDestination();
        noise.current.connect(filter.current);
      }
      Tone.Transport.start();
    } else {
      if (noise.current) {
        noise.current.stop();
        // Tone.js objects should be disposed to free up resources
        noise.current.dispose();
        filter.current?.dispose();
        noise.current = null;
        filter.current = null;
      }
      Tone.Transport.stop();
    }

    return () => {
      // Cleanup on component unmount
      if (noise.current) {
        noise.current.stop();
        noise.current.dispose();
        filter.current?.dispose();
      }
    };
  }, [isCafeMode]);

  const handleToggle = async (checked: boolean) => {
    // Audio context must be started by a user gesture
    await Tone.start();
    setIsCafeMode(checked);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center space-x-2">
            <Switch
              id="cafe-mode"
              checked={isCafeMode}
              onCheckedChange={handleToggle}
              aria-label="Cafe Mode"
            />
            <Label htmlFor="cafe-mode" className="cursor-pointer">
              {isCafeMode ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </Label>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle Cafe Ambience</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CafeModeToggle;
