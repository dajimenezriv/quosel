import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/old/auth';

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
