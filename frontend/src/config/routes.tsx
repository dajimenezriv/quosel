import { Navigate } from 'react-router-dom';
import AccountSettings from '@/app/account/page';
import SignIn from '@/app/auth/sign-in/page';
import Editor from '@/app/editor/page';
import GoogleMaps from '@/app/google-maps/page';
import { RequireAuth, RequireGuest } from '@/components/router/guards';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to="google-maps" replace />,
  },
  {
    path: '/sign-in',
    element: (
      <RequireGuest>
        <SignIn />
      </RequireGuest>
    ),
  },
  {
    path: '/google-maps',
    element: (
      <RequireAuth>
        <GoogleMaps />
      </RequireAuth>
    ),
  },
  {
    path: '/editor',
    element: (
      <RequireAuth>
        <Editor />
      </RequireAuth>
    ),
  },
  {
    path: '/account',
    element: (
      <RequireAuth>
        <AccountSettings />
      </RequireAuth>
    ),
  },
];
