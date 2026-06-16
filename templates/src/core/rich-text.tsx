/** @jsxRuntime automatic @jsxImportSource react */
import { Fragment, type ReactNode } from 'react';

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

  while (i < text.length) {
    const char = text[i]!;
    const close = char in MARKS ? text.indexOf(char, i + 1) : -1;

    if (close !== -1) {
      if (buffer) {
        nodes.push(buffer);
        buffer = '';
      }
      const inner = text.slice(i + 1, close);
      nodes.push(MARKS[char]!(parseInline(inner), key++));
      i = close + 1;
    } else {
      buffer += char;
      i++;
    }
  }

  if (buffer) nodes.push(buffer);
  return nodes;
}

export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {parseInline(line)}
        </Fragment>
      ))}
    </>
  );
}
