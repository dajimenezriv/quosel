import { Navigate } from "react-router-dom";

// Lazy load components for better performance
import GoogleMaps from "@/app/google-maps/page";
import Editor from "@/app/editor/page";

// Auth pages
import SignIn from "@/app/auth/sign-in/page";

// Settings pages
import AccountSettings from "@/app/settings/account/page";
import BillingSettings from "@/app/settings/billing/page";

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

  {
    path: "/google-maps",
    element: <GoogleMaps />,
  },
  {
    path: "/editor",
    element: <Editor />,
  },

  // Authentication Routes
  {
    path: "/sign-in",
    element: <SignIn />,
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
];
