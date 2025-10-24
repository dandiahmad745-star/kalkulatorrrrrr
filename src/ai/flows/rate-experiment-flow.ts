'use server';

/**
 * @fileOverview Rates an experimental coffee recipe.
 *
 * - rateExperiment - A function that rates an experimental coffee recipe.
 * - RateExperimentInput - The input type for the rateExperiment function.
 * - RateExperimentOutput - The return type for the rateExperiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateExperimentInputSchema = z.object({
  coffeeBeans: z.string().describe('The type and amount of coffee beans used in the recipe (e.g., "18g arabica").'),
  roastLevel: z.string().describe('The roast level of the coffee beans (e.g., light, medium, dark).'),
  brewingMethod: z.string().describe('The brewing method and amount used (e.g., "40ml espresso").'),
  milk: z.string().describe('The type, amount, and brand of milk added (e.g., "15ml whole-milk (greenfields)").'),
  creamer: z.string().describe('The type, amount, and brand of creamer added (e.g., "15ml french-vanilla-creamer (coffeemate)").'),
  syrup: z.string().describe('The type, amount, and brand of syrup added (e.g., "15ml vanilla-syrup (monin)").'),
  sweetener: z.string().describe('The type, amount, and brand of sweetener added (e.g., "5g gula-pasir").'),
  toppings: z.string().describe('The type, amount, and brand of toppings added (e.g., "10g chocolate-shavings (van-houten)").'),
});
export type RateExperimentInput = z.infer<typeof RateExperimentInputSchema>;

const RateExperimentOutputSchema = z.object({
    realisticTasteDescription: z.string().describe("Deskripsi rasa yang realistis dari resep ini jika dibuat di dunia nyata."),
    suitableForServing: z.boolean().describe("Apakah kombinasi ini cocok dan layak untuk disajikan di sebuah kafe."),
    experimentalScore: z.number().min(0).max(100).describe("Skor eksperimental dari 0 hingga 100, menilai kreativitas, keseimbangan, dan potensi resep."),
    justification: z.string().describe("Penjelasan singkat mengenai skor yang diberikan dan kelayakan resep untuk disajikan."),
});
export type RateExperimentOutput = z.infer<typeof RateExperimentOutputSchema>;

export async function rateExperiment(
  input: RateExperimentInput
): Promise<RateExperimentOutput> {
  return rateExperimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rateExperimentPrompt',
  input: {schema: RateExperimentInputSchema},
  output: {schema: RateExperimentOutputSchema},
  prompt: `Anda adalah seorang juri barista dan ahli peracik kopi profesional untuk operasional kafe besar. Tugas Anda adalah menilai sebuah resep kopi eksperimental berdasarkan bahan-bahan yang diberikan dengan standar industri.

Resep Eksperimental:
- Biji Kopi: {{{coffeeBeans}}}
- Tingkat Sangrai: {{{roastLevel}}}
- Metode Seduh: {{{brewingMethod}}}
- Susu: {{{milk}}}
- Krimer: {{{creamer}}}
- Sirup: {{{syrup}}}
- Pemanis: {{{sweetener}}}
- Topping: {{{toppings}}}

Berdasarkan resep di atas, berikan penilaian objektif Anda dalam format JSON yang diminta:
1.  **realisticTasteDescription**: Jelaskan seperti apa kira-kira rasa minuman ini di dunia nyata dari sudut pandang seorang profesional.
2.  **suitableForServing**: Berikan penilaian (true/false) apakah resep ini memiliki keseimbangan rasa dan kualitas yang layak untuk disajikan kepada pelanggan di kafe premium.
3.  **experimentalScore**: Berikan skor numerik antara 0-100 yang menilai kreativitas, keseimbangan, potensi komersial, dan keunikan resep.
4.  **justification**: Berikan justifikasi singkat dan profesional untuk skor dan kelayakan penyajian yang Anda berikan. Jelaskan mengapa resep ini berhasil atau gagal dari segi bisnis dan rasa. Berikan saran perbaikan yang konkret.`,
});

const rateExperimentFlow = ai.defineFlow(
  {
    name: 'rateExperimentFlow',
    inputSchema: RateExperimentInputSchema,
    outputSchema: RateExperimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
