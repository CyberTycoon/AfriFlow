'use client'

import React, { createContext, useEffect } from 'react';

interface AuthContextType {
  userData: Record<string, unknown> | null;
  token: string | null;
  login: (data: Record<string, unknown>, token: string, balance: number, accNumber: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = React.useState<Record<string, unknown> | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUserData(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (data: Record<string, unknown>, token: string, balance: number, accNumber: string) => {
    const updatedUserData = { ...data, balance, accNumber };

    setUserData(updatedUserData);
    setToken(token);

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ userData, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
