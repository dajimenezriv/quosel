/** @jsxRuntime automatic @jsxImportSource react */
import { type ReactNode } from 'react';

const MARKS: Record<string, (children: ReactNode, key: number) => ReactNode> = {
  '*': (children, key) => (
    <strong key={key} className="font-bold">
      {children}
    </strong>
  ),
  _: (children, key) => (
    <em key={key} className="italic">
      {children}
    </em>
  ),
  '~': (children, key) => (
    <span key={key} className="text-primary">
      {children}
    </span>
  ),
};

function parseInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let buffer = '';
  let key = 0;
  let i = 0;

  const flush = () => {
    if (buffer) {
      nodes.push(buffer);
      buffer = '';
    }
  };

  while (i < text.length) {
    const char = text.charAt(i);

    if (char === '\n') {
      flush();
      nodes.push(<br key={key++} />);
      i++;
      continue;
    }

    // Links: [label](url). Used for internal linking, which matters for SEO.
    if (char === '[') {
      const closeBracket = text.indexOf(']', i + 1);
      if (closeBracket !== -1 && text.charAt(closeBracket + 1) === '(') {
        const closeParen = text.indexOf(')', closeBracket + 2);
        if (closeParen !== -1) {
          flush();
          const label = text.slice(i + 1, closeBracket);
          const url = text.slice(closeBracket + 2, closeParen);
          nodes.push(
            <a key={key++} href={url} className="text-primary underline">
              {parseInline(label)}
            </a>,
          );
          i = closeParen + 1;
          continue;
        }
      }
    }

    const mark = MARKS[char];
    const close = mark ? text.indexOf(char, i + 1) : -1;

    if (mark && close !== -1) {
      flush();
      const inner = text.slice(i + 1, close);
      nodes.push(mark(parseInline(inner), key++));
      i = close + 1;
    } else {
      buffer += char;
      i++;
    }
  }

  flush();
  return nodes;
}

export function RichText({ text }: { text: string }) {
  return <>{parseInline(text)}</>;
}

export function RichTextBody({ text }: { text: string }) {
  const blocks = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.startsWith('### ')) {
          return (
            <h3 key={i} className="mt-8 text-xl">
              {parseInline(block.slice(4))}
            </h3>
          );
        }
        if (block.startsWith('## ')) {
          return (
            <h2 key={i} className="mt-10 text-3xl">
              {parseInline(block.slice(3))}
            </h2>
          );
        }

        const lines = block.split('\n');
        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={i} className="mt-4 list-disc space-y-2 pl-6 leading-relaxed">
              {lines.map((line, j) => (
                <li key={j}>{parseInline(line.slice(2))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={i} className="mt-4 leading-relaxed">
            {parseInline(block)}
          </p>
        );
      })}
    </>
  );
}
