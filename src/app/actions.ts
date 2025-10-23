"use server";

import { generateRealisticFlavorDescription } from '@/ai/flows/generate-realistic-flavor-description';
import type { GenerateRealisticFlavorDescriptionInput, GenerateRealisticFlavorDescriptionOutput } from '@/ai/flows/generate-realistic-flavor-description';
import { rateExperiment } from '@/ai/flows/rate-experiment-flow';
import type { RateExperimentInput, RateExperimentOutput } from '@/ai/flows/rate-experiment-flow';

export async function getAIFlavorDescription(input: GenerateRealisticFlavorDescriptionInput): Promise<{ success: true, data: GenerateRealisticFlavorDescriptionOutput } | { success: false, error: string }> {
  try {
    const result = await generateRealisticFlavorDescription(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate flavor description.' };
  }
}

export async function getAIExperimentRating(input: RateExperimentInput): Promise<{ success: true, data: RateExperimentOutput } | { success: false, error: string }> {
  try {
    const result = await rateExperiment(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate experiment rating.' };
  }
}
