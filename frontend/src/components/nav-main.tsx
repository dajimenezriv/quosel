import { Collapsible } from '@/components/ui/collapsible';
import { SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type LucideIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItem {
  title: string;
  url: string;
  icon: LucideIcon;
}

interface Props {
  label: string;
  items: NavItem[];
}

export function NavMain({ label, items }: Props) {
  const location = useLocation();

  return (
    <div className="flex flex-col p-2">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="cursor-pointer" isActive={location.pathname === item.url}>
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </div>
  );
}
