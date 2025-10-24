'use server';

/**
 * @fileOverview Calculates the optimal brew time for a given coffee brewing method and amount.
 *
 * - getOptimalBrewTime - A function that returns the optimal brew time.
 * - GetOptimalBrewTimeInput - The input type for the getOptimalBrewTime function.
 * - GetOptimalBrewTimeOutput - The return type for the getOptimalBrewTime function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { GetOptimalBrewTimeInput, GetOptimalBrewTimeOutput } from '@/lib/definitions';

const GetOptimalBrewTimeInputSchema = z.object({
  brewingMethod: z.string().describe('The brewing method used (e.g., "Pour Over", "Espresso").'),
  coffeeAmount: z.number().describe('The amount of coffee beans used in grams.'),
});

const GetOptimalBrewTimeOutputSchema = z.object({
  optimalTime: z.number().describe('The recommended optimal brew time in seconds.'),
  justification: z.string().describe('A brief explanation for why this time is recommended.'),
});

export async function getOptimalBrewTime(
  input: GetOptimalBrewTimeInput
): Promise<GetOptimalBrewTimeOutput> {
  return getOptimalBrewTimeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'getOptimalBrewTimePrompt',
  input: { schema: GetOptimalBrewTimeInputSchema },
  output: { schema: GetOptimalBrewTimeOutputSchema },
  prompt: `You are an expert barista. Based on the brewing method and coffee amount, determine the optimal brew time in seconds.

Brewing Method: {{{brewingMethod}}}
Coffee Amount (g): {{{coffeeAmount}}}

Provide the optimal time and a short justification. For methods like Espresso, the time should be short (e.g., 25-35 seconds). For methods like Pour Over, it should be longer (e.g., 2-4 minutes). For Cold Brew, it should be very long (e.g., 12-24 hours).`,
});

const getOptimalBrewTimeFlow = ai.defineFlow(
  {
    name: 'getOptimalBrewTimeFlow',
    inputSchema: GetOptimalBrewTimeInputSchema,
    outputSchema: GetOptimalBrewTimeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

    