import { Logo } from '@/components/logo';
import { NavMain, type NavItem } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const navItems: NavItem[] = [
  {
    title: 'Google Maps',
    url: '/',
    icon: MapPin,
  },
  {
    title: 'Websites',
    url: '/websites',
    icon: MapPin,
  },
];

export function AppSidebar() {
  return (
    <>
      <SidebarMenuButton size="lg" asChild>
        <Link to="/">
          <div className="size-8 items-center">
            <Logo size={32} />
          </div>
          <span className="font-medium">Quosel</span>
        </Link>
      </SidebarMenuButton>
      <div className="mt-6 flex flex-1 flex-col">
        <NavMain label="Pages" items={navItems} />
      </div>
      <NavUser />
    </>
  );
}
