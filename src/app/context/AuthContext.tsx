'use client'

import React, { createContext, useEffect } from 'react';

interface AuthContextType {
  userData: Record<string, unknown> | null;
  token: string | null;
  login: (data: Record<string, unknown>, token: string, balance: number, accNumber: string) => void;
  logout: () => void;
  setUserData: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = React.useState<Record<string, unknown> | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const storedToken = localStorage.getItem("token");
    const storedBalance = localStorage.getItem("balance");
    const storedAccNumber = localStorage.getItem("accNumber");

    if (storedUser && storedToken && storedBalance && storedAccNumber) {
      setUserData(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // 👉 NEW useEffect to sync balance in real-time
  useEffect(() => {
    if (userData && userData.balance !== undefined) {
      localStorage.setItem("balance", JSON.stringify(userData.balance));
    }
  }, [userData]);

  const login = (data: Record<string, unknown>, token: string, balance: number, accNumber: string) => {
    const updatedUserData = { ...data, balance, accNumber };

    setUserData(updatedUserData);
    setToken(token);

    localStorage.setItem("userData", JSON.stringify(updatedUserData));
    localStorage.setItem("token", token);
    localStorage.setItem("balance", JSON.stringify(balance));
    localStorage.setItem("accNumber", accNumber);
  };

  const logout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ userData, token, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
