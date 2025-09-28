import { useAuth } from '../context/AuthContext';

export const useAuthStatus = () => {
  const { user, loading, errors, authChecked } = useAuth();
  return { isAuthenticated: !!user, user, loading, errors, authChecked };
};