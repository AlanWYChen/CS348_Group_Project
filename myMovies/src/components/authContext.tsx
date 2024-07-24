import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  uid: number;
  isAuthenticated: boolean;
  login: (uid: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [uid, setUid] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (uid: number) => {
    setUid(uid);
    setIsAuthenticated(true);
  }

  const logout = () => {
    setUid(0);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    console.log('UID:', uid);
    console.log('Authenticated:', isAuthenticated);
  }, [uid, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ uid, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
