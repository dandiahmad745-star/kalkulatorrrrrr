'use server';

/**
 * @fileOverview Generates a cool, creative name for a coffee recipe.
 *
 * - generateCoffeeName - A function that generates a name for a coffee recipe.
 * - GenerateCoffeeNameInput - The input type for the generateCoffeeName function.
 * - GenerateCoffeeNameOutput - The return type for the generateCoffeeName function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoffeeNameInputSchema = z.object({
  coffeeBeans: z.string().describe('The type of coffee beans (e.g., "arabica").'),
  roastLevel: z.string().describe('The roast level (e.g., "dark").'),
  brewingMethod: z.string().describe('The brewing method (e.g., "espresso-machine").'),
  mainFlavor: z.string().describe('The most prominent flavor from milk, creamer, or syrup (e.g., "hazelnut", "caramel", "none").'),
  topping: z.string().describe('The topping used (e.g., "whipped-cream", "none").'),
});
export type GenerateCoffeeNameInput = z.infer<typeof GenerateCoffeeNameInputSchema>;

const GenerateCoffeeNameOutputSchema = z.object({
  name: z.string().describe('A creative, cool, and marketable name for the coffee recipe. Examples: "Hazel Dream Latte", "Midnight Mocha Blend", "Sunrise Pour-over".'),
});
export type GenerateCoffeeNameOutput = z.infer<typeof GenerateCoffeeNameOutputSchema>;

export async function generateCoffeeName(
  input: GenerateCoffeeNameInput
): Promise<GenerateCoffeeNameOutput> {
  return generateCoffeeNameFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoffeeNamePrompt',
  input: {schema: GenerateCoffeeNameInputSchema},
  output: {schema: GenerateCoffeeNameOutputSchema},
  prompt: `You are a creative branding expert for a specialty coffee shop.
Based on the following coffee ingredients, create a single, cool, and marketable name for the drink.
The name should be catchy and hint at the flavor profile. Don't use the word "coffee" in the name.

Ingredients:
- Beans: {{{coffeeBeans}}}
- Roast: {{{roastLevel}}}
- Method: {{{brewingMethod}}}
- Main Flavor: {{{mainFlavor}}}
- Topping: {{{topping}}}

Generate one name.`,
});

const generateCoffeeNameFlow = ai.defineFlow(
  {
    name: 'generateCoffeeNameFlow',
    inputSchema: GenerateCoffeeNameInputSchema,
    outputSchema: GenerateCoffeeNameOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
