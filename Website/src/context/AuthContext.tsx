import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkAuth } from "../api/auth";
import type { ReactNode } from 'react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface User {
  id: string;
  email: string;
  name: string;
  role?: string;
  avatar?: string;
   isAdmin?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const data = await checkAuth();
      setUser(data?.user || null);
    } catch {
      setUser(null);
    }
  };

 const logout = async () => {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    setUser(null);
  }
};
  useEffect(() => {
    refreshAuth().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
};
