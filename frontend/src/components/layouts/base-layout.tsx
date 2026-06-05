import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { useSidebarStore } from '@/core/sidebar/use-sidebar-store';
import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  extra?: ReactNode;
}

export function BaseLayout({ children, title, extra }: Props) {
  const open = useSidebarStore((s) => s.open);

  return (
    <>
      <div className={cn('shrink-0 overflow-hidden transition-[width] duration-300 ease-in-out', open ? 'w-70' : 'w-0')}>
        <div className="flex h-full w-70 flex-col p-4 pr-2">
          <AppSidebar />
        </div>
      </div>

      <main className="bg-background m-2 flex min-w-0 flex-1 flex-col rounded-xl shadow-sm">
        <SiteHeader title={title} extra={extra} />
        <div className="flex min-h-0 flex-1">{children}</div>
      </main>
    </>
  );
}
