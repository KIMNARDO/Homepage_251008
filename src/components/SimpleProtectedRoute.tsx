import { Navigate } from 'react-router-dom';
import { useSimpleAuthStore } from '@/stores/simpleAuthStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const SimpleProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSimpleAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};