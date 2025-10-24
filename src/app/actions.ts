"use server";

import { generateRealisticFlavorDescription } from '@/ai/flows/generate-realistic-flavor-description';
import type { GenerateRealisticFlavorDescriptionInput, GenerateRealisticFlavorDescriptionOutput } from '@/ai/flows/generate-realistic-flavor-description';
import { rateExperiment } from '@/ai/flows/rate-experiment-flow';
import type { RateExperimentInput, RateExperimentOutput } from '@/ai/flows/rate-experiment-flow';
import { getOptimalBrewTime } from '@/ai/flows/get-optimal-brew-time';
import type { GetOptimalBrewTimeInput, GetOptimalBrewTimeOutput } from '@/lib/definitions';
import { generateCoffeeName } from '@/ai/flows/generate-coffee-name';
import type { GenerateCoffeeNameInput, GenerateCoffeeNameOutput } from '@/ai/flows/generate-coffee-name';


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

export async function getAIOptimalBrewTime(input: GetOptimalBrewTimeInput): Promise<{ success: true, data: GetOptimalBrewTimeOutput } | { success: false, error: string }> {
    try {
      const result = await getOptimalBrewTime(input);
      return { success: true, data: result };
    } catch (e) {
      console.error(e);
      return { success: false, error: 'Failed to get optimal brew time.' };
    }
}

export async function getAICoffeeName(input: GenerateCoffeeNameInput): Promise<{ success: true, data: GenerateCoffeeNameOutput } | { success: false, error: string }> {
    try {
      const result = await generateCoffeeName(input);
      return { success: true, data: result };
    } catch (e) {
      console.error(e);
      return { success: false, error: 'Failed to generate coffee name.' };
    }
}

    