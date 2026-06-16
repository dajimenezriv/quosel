import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

const SYSTEM = `You write copy for a single field of a small-business marketing website.

You receive a short instruction describing one field (its role, the site name, and possibly its current text). Write the copy for that one field only.

Rules:
- Return only the text for the field. No quotes, no labels, no explanation, and no markdown other than the marks above.
- Keep it concise and appropriate for the field's role (a title is short; a description is one or two sentences).
- Match the language of the instruction.`;

export class Ai {
  static async generateFieldText(prompt: string): Promise<string> {
    const { text } = await generateText({
      model: deepseek('deepseek-chat'),
      system: SYSTEM,
      prompt,
      maxOutputTokens: 500,
    });

    return text.trim();
  }
}
