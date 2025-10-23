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
  coffeeBeans: z.string().describe('The type and amount of coffee beans used in the recipe (e.g., "18g arabica").'),
  roastLevel: z.string().describe('The roast level of the coffee beans (e.g., light, medium, dark).'),
  brewingMethod: z.string().describe('The brewing method and amount used (e.g., "40ml espresso").'),
  milk: z.string().describe('The type, amount, and brand of milk added (e.g., "15ml whole-milk (greenfields)").'),
  creamer: z.string().describe('The type, amount, and brand of creamer added (e.g., "15ml french-vanilla-creamer (coffeemate)").'),
  syrup: z.string().describe('The type, amount, and brand of syrup added (e.g., "15ml vanilla-syrup (monin)").'),
  toppings: z.string().describe('The type, amount, and brand of toppings added (e.g., "10g chocolate-shavings (van-houten)").'),
});
export type GenerateRealisticFlavorDescriptionInput = z.infer<typeof GenerateRealisticFlavorDescriptionInputSchema>;

const GenerateRealisticFlavorDescriptionOutputSchema = z.object({
  flavorDescription: z.string().describe('A realistic flavor description of the coffee recipe in Indonesian.'),
  suggestion: z.string().describe('A suggestion to improve the coffee recipe in Indonesian. For example: "kurangi 10 ml sirup agar rasa kopi tidak terlalu manis".'),
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
  prompt: `Anda adalah seorang ahli perisa kopi. Berdasarkan resep kopi berikut, buatlah deskripsi rasa yang realistis dan menarik dalam Bahasa Indonesia.

Biji Kopi: {{{coffeeBeans}}}
Tingkat Sangrai: {{{roastLevel}}}
Metode Seduh: {{{brewingMethod}}}
Susu: {{{milk}}}
Krimer: {{{creamer}}}
Sirup: {{{syrup}}}
Topping: {{{toppings}}}

Selain deskripsi rasa, berikan juga satu saran penyesuaian untuk meningkatkan keseimbangan rasa resep ini (contoh: "kurangi 10 ml sirup agar rasa kopi tidak terlalu manis").`,
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
