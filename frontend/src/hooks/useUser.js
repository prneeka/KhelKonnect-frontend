import { useAuth } from '../context/AuthContext';

export const useUser = () => {
  const { user } = useAuth();
  console.log(user);
  return user;
};