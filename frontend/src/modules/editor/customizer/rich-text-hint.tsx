import { Lightbulb } from 'lucide-react';

export function RichTextHint() {
  return (
    <div className="bg-muted text-muted-foreground flex gap-2 rounded-md px-3 py-2 text-xs">
      <Lightbulb className="mt-0.5 h-3 w-3 shrink-0" />
      <span>
        Format with <code className="bg-background rounded px-1 font-mono">*bold*</code>,{' '}
        <code className="bg-background rounded px-1 font-mono">_italic_</code>, or{' '}
        <code className="bg-background rounded px-1 font-mono">~primary~</code> for the primary color.
      </span>
    </div>
  );
}
