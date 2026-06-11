import type { ReactNode } from 'react';
import { ThemeToggle } from './theme-toggle';

interface Props {
  title: string;
  extra?: ReactNode;
}

export function SiteHeader({ title, extra }: Props) {
  return (
    <header className="flex h-14 justify-between border-b px-4">
      <div className="flex items-center">
        <h1 className="pl-6 text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {extra}
        <ThemeToggle />
      </div>
    </header>
  );
}
