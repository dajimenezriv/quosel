import { Logo } from '@/components/logo';
import { NavMain, type NavItem } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavGroup {
  label: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    label: 'Pages',
    items: [
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
    ],
  },
];

export function AppSidebar() {
  return (
    <div className="flex h-svh w-70 flex-col p-2">
      <div className="p-2">
        <SidebarMenuButton size="lg" asChild>
          <Link to="/">
            <div className="size-8 items-center">
              <Logo size={32} />
            </div>
            <span className="font-medium">Quosel</span>
          </Link>
        </SidebarMenuButton>
      </div>
      <div className="flex flex-1 flex-col">
        {navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </div>
      <div className="p-2">
        <NavUser />
      </div>
    </div>
  );
}
