import { lazy } from "react";
import { Navigate } from "react-router-dom";

// Lazy load components for better performance
const Landing = lazy(() => import("@/app/landing/page"));
const Dashboard = lazy(() => import("@/app/dashboard/page"));
const Dashboard2 = lazy(() => import("@/app/dashboard-2/page"));
const Pricing = lazy(() => import("@/app/pricing/page"));

// Auth pages
const SignIn3 = lazy(() => import("@/app/auth/sign-in-3/page"));

// Settings pages
const AccountSettings = lazy(() => import("@/app/settings/account/page"));
const BillingSettings = lazy(() => import("@/app/settings/billing/page"));
const AppearanceSettings = lazy(() => import("@/app/settings/appearance/page"));
const NotificationSettings = lazy(
  () => import("@/app/settings/notifications/page"),
);

export interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  // Default route - redirect to dashboard
  // Use relative path "dashboard" instead of "/dashboard" for basename compatibility
  {
    path: "/",
    element: <Navigate to="dashboard" replace />,
  },

  // Landing Page
  {
    path: "/landing",
    element: <Landing />,
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/dashboard-2",
    element: <Dashboard2 />,
  },

  // Content Pages
  {
    path: "/pricing",
    element: <Pricing />,
  },

  // Authentication Routes
  {
    path: "/auth/sign-in-3",
    element: <SignIn3 />,
  },

  // Settings Routes
  {
    path: "/settings/account",
    element: <AccountSettings />,
  },
  {
    path: "/settings/billing",
    element: <BillingSettings />,
  },
  {
    path: "/settings/appearance",
    element: <AppearanceSettings />,
  },
  {
    path: "/settings/notifications",
    element: <NotificationSettings />,
  },
];
