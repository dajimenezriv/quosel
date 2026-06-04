import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { CSSProperties, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  extra?: ReactNode;
}

export function BaseLayout({ children, title, extra }: Props) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '16rem',
          '--sidebar-width-icon': '3rem',
          '--header-height': 'calc(var(--spacing) * 14)',
        } as CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader title={title} extra={extra} />
        <div className="flex flex-1 flex-col p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
