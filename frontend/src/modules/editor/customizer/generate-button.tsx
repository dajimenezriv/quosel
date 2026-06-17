import { useGenerateTextField } from '@/api/websites/use-generate-text-field';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Loader2, Sparkles } from 'lucide-react';

interface Props {
  label: string;
  value: string;
  example: string;
  onGenerate: (text: string) => void;
}

export function GenerateButton({ label, value, example, onGenerate }: Props) {
  const context = useEditorStore((s) => s.draft?.context);
  const { mutate, isPending } = useGenerateTextField();

  function handleClick() {
    const prompt = [
      `Write the "${label}" text for a small-business website.`,
      context ? `Business context: ${context}` : '',
      `Here is the same field for a different business, as a style and formatting reference: "${example}".`,
      value ? `The current text is: "${value}". Replace it.` : '',
      'Return only the text for this single field.',
    ]
      .filter(Boolean)
      .join(' ');

    mutate({ prompt }, { onSuccess: onGenerate });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      title="Generate with AI"
      className="cursor-pointer text-yellow-500 hover:text-yellow-600 disabled:opacity-50">
      {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
    </button>
  );
}
