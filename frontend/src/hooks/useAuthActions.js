import { useAuth } from '../context/AuthContext';

export const useAuthActions = () => {
  const { login, logout, sendotp, sendsignotp, signup } = useAuth();
  return { login, logout, sendotp, sendsignotp, signup };
};