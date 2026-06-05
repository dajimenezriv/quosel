import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  extra?: ReactNode;
}

export function BaseLayout({ children, title, extra }: Props) {
  return (
    <>
      <div className="flex w-70 flex-col p-4 pr-2">
        <AppSidebar />
      </div>
      <main className="bg-background m-2 flex min-w-0 flex-1 flex-col rounded-xl shadow-sm">
        <SiteHeader title={title} extra={extra} />
        <div className="flex flex-1 overflow-auto">{children}</div>
      </main>
    </>
  );
}
