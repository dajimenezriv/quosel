import { Logo } from '@/components/logo';
import { NavMain, type NavItem } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems: NavItem[] = [
  {
    title: 'Websites',
    url: '/',
    icon: MapPin,
  },
];

export function AppSidebar() {
  return (
    <>
      <SidebarMenuButton size="lg" asChild>
        <Link to="/">
          <Logo size={32} />
        </Link>
      </SidebarMenuButton>
      <div className="mt-10 flex flex-1 flex-col">
        <NavMain label="Pages" items={navItems} />
      </div>
      <NavUser />
    </>
  );
}
