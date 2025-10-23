'use server';

/**
 * @fileOverview Generates a realistic flavor description of a coffee recipe based on its ingredients.
 *
 * - generateRealisticFlavorDescription - A function that generates a realistic flavor description for a coffee recipe.
 * - GenerateRealisticFlavorDescriptionInput - The input type for the generateRealisticFlavorDescription function.
 * - GenerateRealisticFlavorDescriptionOutput - The return type for the generateRealisticFlavorDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRealisticFlavorDescriptionInputSchema = z.object({
  coffeeBeans: z.string().describe('The type of coffee beans used in the recipe.'),
  roastLevel: z.string().describe('The roast level of the coffee beans (e.g., light, medium, dark).'),
  brewingMethod: z.string().describe('The brewing method used (e.g., espresso, pour over, French press).'),
  milk: z.string().describe('The type of milk added to the coffee (e.g., whole milk, almond milk, oat milk).'),
  creamer: z.string().describe('The type of creamer added to the coffee (e.g., vanilla, hazelnut).'),
  syrup: z.string().describe('The type of syrup added to the coffee (e.g., caramel, chocolate).'),
  toppings: z.string().describe('The toppings added to the coffee (e.g., whipped cream, chocolate shavings).'),
});
export type GenerateRealisticFlavorDescriptionInput = z.infer<typeof GenerateRealisticFlavorDescriptionInputSchema>;

const GenerateRealisticFlavorDescriptionOutputSchema = z.object({
  flavorDescription: z.string().describe('A realistic flavor description of the coffee recipe.'),
});
export type GenerateRealisticFlavorDescriptionOutput = z.infer<typeof GenerateRealisticFlavorDescriptionOutputSchema>;

export async function generateRealisticFlavorDescription(
  input: GenerateRealisticFlavorDescriptionInput
): Promise<GenerateRealisticFlavorDescriptionOutput> {
  return generateRealisticFlavorDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRealisticFlavorDescriptionPrompt',
  input: {schema: GenerateRealisticFlavorDescriptionInputSchema},
  output: {schema: GenerateRealisticFlavorDescriptionOutputSchema},
  prompt: `You are an expert coffee flavorist. Given the following coffee recipe, generate a realistic and appealing flavor description.

Coffee Beans: {{{coffeeBeans}}}
Roast Level: {{{roastLevel}}}
Brewing Method: {{{brewingMethod}}}
Milk: {{{milk}}}
Creamer: {{{creamer}}}
Syrup: {{{syrup}}}
Toppings: {{{toppings}}}

Flavor Description:`, // No need to HTML escape, this is a .ts file.
});

const generateRealisticFlavorDescriptionFlow = ai.defineFlow(
  {
    name: 'generateRealisticFlavorDescriptionFlow',
    inputSchema: GenerateRealisticFlavorDescriptionInputSchema,
    outputSchema: GenerateRealisticFlavorDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
