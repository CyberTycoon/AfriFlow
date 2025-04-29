'use client'

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  userData: Record<string, unknown> | null;
  login: (data: Record<string, unknown>) => void;
  logout: () => void;
  setUserData: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
  syncUserData: () => Promise<void>;  // <-- NEW
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<Record<string, unknown> | null>(null);

  // Initialize from cookies and localStorage
  useEffect(() => {
    const accessTokenFromCookie = Cookies.get('accessToken');
    if (accessTokenFromCookie) {
      localStorage.setItem('accessToken', accessTokenFromCookie);
    }
    else { 
      const accessTokenFromLocalStorage = localStorage.getItem('accessToken');
      if (accessTokenFromLocalStorage) {
        Cookies.set('accessToken', accessTokenFromLocalStorage, { expires: 7 });
      }
    }

    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const syncTokenToCookies = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      Cookies.set('accessToken', token, { expires: 7 });
    }
  };

  const login = (data: Record<string, unknown>) => {
    setUserData(data);
    localStorage.setItem('userData', JSON.stringify(data));

    if (data.accessToken) {
      localStorage.setItem('accessToken', data.accessToken as string);
      syncTokenToCookies();
    }

    if (Cookies.get('accessToken')) {
      localStorage.setItem('accessToken', Cookies.get('accessToken') as string);
    }
  };

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    localStorage.removeItem('accessToken');
    Cookies.remove('accessToken');
    router.push('/');
    console.log('🔒 [Auth] User logged out.');
  };

  // 🚀 New function to always pull fresh userInfo + balance from backend
  const syncUserData = useCallback(async () => {
    try {
      console.log('🔄 [Auth] Syncing user info and balance...');
      const [userInfoRes, accountRes] = await Promise.all([
        fetch("/api/userInfo", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: 'include' }),
        fetch("/api/userAccount", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: 'include' }),
      ]);

      if (!userInfoRes.ok || !accountRes.ok) {
        throw new Error('Failed to sync user data.');
      }

      const userInfo = await userInfoRes.json();
      const accountDetails = await accountRes.json();

      const updatedData = {
        tokenData: userInfo,
        balance: accountDetails.balance,
        walletNumber: accountDetails.wallet_number,
      };

      setUserData(updatedData);
      localStorage.setItem('userData', JSON.stringify(updatedData));
      console.log('✅ [Auth] User data synced successfully.');

    } catch (error) {
      console.error('❌ [Auth] Error syncing user data:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, login, logout, setUserData, syncUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
