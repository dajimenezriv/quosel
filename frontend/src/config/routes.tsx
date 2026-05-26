import { Navigate } from 'react-router-dom';
// Auth pages
import SignIn from '@/app/auth/sign-in/page';
import Editor from '@/app/editor/page';
// Lazy load components for better performance
import GoogleMaps from '@/app/google-maps/page';
// Settings pages
import AccountSettings from '@/app/settings/account/page';
import BillingSettings from '@/app/settings/billing/page';
import { RequireAuth, RequireGuest } from '@/components/router/guards';

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    element: <Navigate to="google-maps" replace />,
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

  // Authentication Routes
  {
    path: '/sign-in',
    element: (
      <RequireGuest>
        <SignIn />
      </RequireGuest>
    ),
  },

  // Settings Routes
  {
    path: '/settings/account',
    element: (
      <RequireAuth>
        <AccountSettings />
      </RequireAuth>
    ),
  },
  {
    path: '/settings/billing',
    element: (
      <RequireAuth>
        <BillingSettings />
      </RequireAuth>
    ),
  },
];
