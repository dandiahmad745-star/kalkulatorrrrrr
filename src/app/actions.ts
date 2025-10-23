"use server";

import { generateRealisticFlavorDescription } from '@/ai/flows/generate-realistic-flavor-description';
import type { GenerateRealisticFlavorDescriptionInput } from '@/ai/flows/generate-realistic-flavor-description';

export async function getAIFlavorDescription(input: GenerateRealisticFlavorDescriptionInput) {
  try {
    const result = await generateRealisticFlavorDescription(input);
    return { success: true, description: result.flavorDescription };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate flavor description.' };
  }
}
