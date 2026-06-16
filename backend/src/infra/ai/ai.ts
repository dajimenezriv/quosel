import { deepseek } from '@ai-sdk/deepseek';
import { generateText } from 'ai';

const SYSTEM = `You write copy for a single field of a small-business marketing website.

You receive a short instruction describing one field (its role, the site name, and possibly its current text). Write the copy for that one field only.

You may emphasize parts of the text with these inline marks (they can be nested), and use new lines to break the text:
- *bold* for bold
- _italic_ for italic
- ~primary~ to highlight in the site's primary color

Rules:
- Return only the text for the field. No quotes, no labels, no explanation, and no markdown other than the marks above.
- Use the marks sparingly, only to emphasize a key word or phrase.
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
