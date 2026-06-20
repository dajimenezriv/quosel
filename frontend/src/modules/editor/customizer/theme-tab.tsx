import type { Website } from '@/api/websites/use-get-website';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { stylesSchema } from '@quosel/core/templates';
import { produce } from 'immer';
import { Lightbulb } from 'lucide-react';
import { useRef, useState } from 'react';

const HEX_RE = /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g;

function contrastColor(hex: string): string {
  const full = hex.length === 4 ? `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}` : hex;
  const r = parseInt(full.slice(1, 3), 16);
  const g = parseInt(full.slice(3, 5), 16);
  const b = parseInt(full.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5 ? '#000000' : '#ffffff';
}

function renderHighlighted(text: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  HEX_RE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = HEX_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    const color = match[0];
    parts.push(
      <span key={match.index} style={{ backgroundColor: color, color: contrastColor(color), borderRadius: '2px' }}>
        {color}
      </span>,
    );
    last = match.index + color.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

interface Props {
  data: Website;
}

export function ThemeTab({ data }: Props) {
  const updateDraft = useEditorStore((s) => s.updateDraft);
  const [text, setText] = useState(() => JSON.stringify(data.styles, null, 2));
  const [error, setError] = useState<string | null>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);
    try {
      const parsed = stylesSchema.parse(JSON.parse(value));
      updateDraft(
        produce(data, (draft) => {
          draft.styles = parsed;
        }),
      );
      setError(null);
    } catch {
      setError('Invalid JSON or missing required fields');
    }
  }

  function handleScroll(e: React.UIEvent<HTMLTextAreaElement>) {
    if (backdropRef.current) {
      backdropRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="bg-muted text-muted-foreground flex gap-2 rounded-md px-3 py-2 text-xs">
        <Lightbulb className="mt-0.5 h-3 w-3 shrink-0" />
        <span>
          Copy this JSON and ask an AI: <em>"Generate a color palette based on [your color] using this structure."</em> Then paste the
          result back here.
        </span>
      </div>
      <div className="border-input focus-within:border-ring focus-within:ring-ring/50 relative overflow-hidden rounded-md border transition-[color,box-shadow] focus-within:ring-[3px]">
        <div
          ref={backdropRef}
          aria-hidden
          className="text-foreground pointer-events-none absolute inset-0 overflow-hidden px-3 py-2 font-mono wrap-break-word whitespace-pre-wrap">
          {renderHighlighted(text)}
        </div>
        <textarea
          className="text relative field-sizing-content w-full resize-none bg-transparent px-3 py-2 font-mono outline-none"
          style={{ color: 'transparent', caretColor: 'var(--foreground)' }}
          value={text}
          onChange={handleChange}
          onScroll={handleScroll}
          spellCheck={false}
        />
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}
