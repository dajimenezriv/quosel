import { createBrowserRouter, Navigate } from 'react-router-dom';
import Account from '@/app/account/page';
import Editor from '@/app/editor/page';
import GoogleMaps from '@/app/google-maps/page';
import Login from '@/app/login/page';
import ProtectedLayout from '@/app/protected-layout';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/', element: <GoogleMaps /> },
      { path: '/editor', element: <Editor /> },
      { path: '/account', element: <Account /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
