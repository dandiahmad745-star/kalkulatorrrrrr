'use server';

/**
 * @fileOverview Generates a realistic flavor description of a coffee recipe based on its ingredients.
 *
 * - generateRealisticFlavorDescription - A function that generates a realistic flavor description for a coffee recipe.
 * - GenerateRealisticFlavorDescriptionInput - The input type for the generateRealisticFlavorDescription function.
 * - GenerateRealisticFlavorDescriptionOutput - The return type for the generateRealisticflavorDescription function.
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
  sweetener: z.string().describe('The type, amount, and brand of sweetener added (e.g., "5g gula-pasir").'),
  toppings: z.string().describe('The type, amount, and brand of toppings added (e.g., "10g chocolate-shavings (van-houten)", "rempah-nusantara", "chopped-nuts").'),
});
export type GenerateRealisticFlavorDescriptionInput = z.infer<typeof GenerateRealisticFlavorDescriptionInputSchema>;

const GenerateRealisticFlavorDescriptionOutputSchema = z.object({
  flavorDescription: z.string().describe('A realistic flavor description of the coffee recipe in Indonesian, suitable for a professional cafe menu.'),
  suggestion: z.string().describe('A suggestion to improve the coffee recipe in Indonesian, focusing on balance and commercial viability. For example: "kurangi 10 ml sirup agar rasa kopi tidak terlalu manis dan lebih seimbang".'),
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
  prompt: `Anda adalah seorang ahli perisa kopi (flavorist) dan konsultan F&B untuk kafe besar. Berdasarkan resep kopi berikut, buatlah deskripsi rasa yang realistis, menarik, dan profesional dalam Bahasa Indonesia, seolah-olah untuk menu kafe.

Resep:
- Biji Kopi: {{{coffeeBeans}}}
- Tingkat Sangrai: {{{roastLevel}}}
- Metode Seduh: {{{brewingMethod}}}
- Susu: {{{milk}}}
- Krimer: {{{creamer}}}
- Sirup: {{{syrup}}}
- Pemanis: {{{sweetener}}}
- Topping: {{{toppings}}}

Tugas Anda:
1.  **flavorDescription**: Tulis deskripsi rasa yang mendetail. Fokus pada bagaimana setiap bahan berinteraksi untuk menciptakan profil rasa akhir (manis, pahit, asam, body, aroma).
2.  **suggestion**: Berikan satu saran konkret dan profesional untuk meningkatkan keseimbangan dan potensi komersial resep ini. Contoh: "Untuk menonjolkan profil fruity dari biji Arabica, pertimbangkan untuk mengurangi sirup vanila sebanyak 5ml."`,
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
