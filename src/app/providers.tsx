"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
}

////////////////////////////////////////////////////////////////////////////////

// Note: This is just a workaround since the cookie-based auth is not working properly
// Cookies are gone after the page is reloaded.

type AuthContextValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const value = useMemo(() => {
    return {
      isAuthenticated,
      setIsAuthenticated,
    };
  }, [isAuthenticated, setIsAuthenticated]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
