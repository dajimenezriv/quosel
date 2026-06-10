import Account from '@/pages/account/page';
import Editor from '@/pages/editor/page';
import Login from '@/pages/login/page';
import ProtectedLayout from '@/pages/protected-layout';
import Websites from '@/pages/websites/page';
import { createBrowserRouter, Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    element: <ProtectedLayout />,
    children: [
      { path: '/', element: <Websites /> },
      { path: '/editor/:websiteId', element: <Editor /> },
      { path: '/account', element: <Account /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
