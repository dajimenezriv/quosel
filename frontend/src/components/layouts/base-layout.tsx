import { AppSidebar } from '@/components/app-sidebar';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import * as React from 'react';

interface Props {
  children: React.ReactNode;
  title: string;
}

export function BaseLayout({ children, title }: Props) {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '16rem',
          '--sidebar-width-icon': '3rem',
          '--header-height': 'calc(var(--spacing) * 14)',
        } as React.CSSProperties
      }>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader title={title} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 p-6">{children}</div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
