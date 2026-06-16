import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/old/auth';
import { User as CircleUser, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

export function NavUser() {
  const { user: user2, logout } = useAuth();
  const navigate = useNavigate();
  const [pictureError, setPictureError] = useState(false);

  const handleLogout = async () => {
    await logout();
    void navigate('/login', { replace: true });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex size-10 cursor-pointer items-center justify-center rounded-lg">
          {user2?.picture && !pictureError ? (
            <img src={user2.picture} width={32} height={32} alt="User" className="rounded-lg" onError={() => setPictureError(true)} />
          ) : (
            <Button variant="outline" size="icon" className="cursor-pointer">
              <CircleUser className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56 rounded-lg" side="right" align="end" sideOffset={8}>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to="/account">
              <CircleUser />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
