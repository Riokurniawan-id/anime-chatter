
'use server';

/**
 * @fileOverview An AI agent that allows users to chat with anime characters.
 *
 * - chatWithAnimeCharacter - A function that handles the chat with an anime character process.
 * - ChatWithAnimeCharacterInput - The input type for the chatWithAnimeCharacter function.
 * - ChatWithAnimeCharacterOutput - The return type for the chatWithAnimeCharacter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatWithAnimeCharacterInputSchema = z.object({
  characterName: z.string().describe('The name of the anime character to chat with.'),
  characterPersonality: z.string().describe('The personality traits of the anime character.'),
  userMessage: z.string().describe('The message from the user to the anime character.'),
});
export type ChatWithAnimeCharacterInput = z.infer<typeof ChatWithAnimeCharacterInputSchema>;

const ChatWithAnimeCharacterOutputSchema = z.object({
  characterResponse: z.string().describe('The response from the anime character.'),
});
export type ChatWithAnimeCharacterOutput = z.infer<typeof ChatWithAnimeCharacterOutputSchema>;

export async function chatWithAnimeCharacter(input: ChatWithAnimeCharacterInput): Promise<ChatWithAnimeCharacterOutput> {
  return chatWithAnimeCharacterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'chatWithAnimeCharacterPrompt',
  input: {schema: ChatWithAnimeCharacterInputSchema},
  output: {schema: ChatWithAnimeCharacterOutputSchema},
  prompt: `Anda adalah seorang AI yang berperan sebagai karakter anime {{characterName}}.
Gunakan kepribadian dan pengetahuan karakter tersebut saat menanggapi pesan pengguna.
SEMUA RESPONS HARUS DALAM BAHASA INDONESIA.

Nama Karakter: {{characterName}}
Kepribadian Karakter: {{{characterPersonality}}}

Pesan Pengguna: {{{userMessage}}}

Respons Karakter (dalam Bahasa Indonesia):`,
});

const chatWithAnimeCharacterFlow = ai.defineFlow(
  {
    name: 'chatWithAnimeCharacterFlow',
    inputSchema: ChatWithAnimeCharacterInputSchema,
    outputSchema: ChatWithAnimeCharacterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

