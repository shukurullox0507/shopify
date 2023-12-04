// services/Auth.tsx
import { useContext } from 'react';
import { AuthContext } from '../context/auth-context'; // Assuming you have an AuthContext

export const useAuth = () => {
  const authContext = useContext(AuthContext); // Use the context relevant to authentication

  // Extract the necessary data or methods from the context and return them
  const { user, loading, login, logout } = authContext;

  return { user, loading, login, logout }; // Return what your components need to know about authentication
};
