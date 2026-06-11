import { Logo } from '@/components/logo';
import { NavUser } from '@/components/nav-user';
import { SiteHeader } from '@/components/site-header';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  showSidebar?: boolean;
  children: ReactNode;
  title: string;
  extra?: ReactNode;
}

export function BaseLayout({ showSidebar = true, children, title, extra }: Props) {
  return (
    <>
      {showSidebar && (
        <div className="my-4 mr-1 ml-3 flex flex-col items-center justify-between">
          <Link to="/">
            <Logo size={32} />
          </Link>

          <NavUser />
        </div>
      )}

      <main className="bg-background m-2 flex min-w-0 flex-1 flex-col rounded-xl shadow-sm">
        <SiteHeader title={title} extra={extra} />
        <div className="flex min-h-0 flex-1">{children}</div>
      </main>
    </>
  );
}
