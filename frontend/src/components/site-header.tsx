import { ThemeToggle } from '@/components/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  extra?: ReactNode;
}

export function SiteHeader({ title, extra }: Props) {
  return (
    <header className="flex h-14 justify-between border-b px-4">
      <div className="flex items-center">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="px-6 text-2xl font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        {extra}
      </div>
    </header>
  );
}
