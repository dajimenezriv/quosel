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
