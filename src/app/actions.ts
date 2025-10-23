"use server";

import { generateRealisticFlavorDescription } from '@/ai/flows/generate-realistic-flavor-description';
import type { GenerateRealisticFlavorDescriptionInput, GenerateRealisticFlavorDescriptionOutput } from '@/ai/flows/generate-realistic-flavor-description';

export async function getAIFlavorDescription(input: GenerateRealisticFlavorDescriptionInput): Promise<{ success: true, data: GenerateRealisticFlavorDescriptionOutput } | { success: false, error: string }> {
  try {
    const result = await generateRealisticFlavorDescription(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate flavor description.' };
  }
}
