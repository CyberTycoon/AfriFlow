'use client'

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

interface AuthContextType {
  userData: Record<string, unknown> | null;
  login: (data: Record<string, unknown>) => void;
  logout: () => void;
  setUserData: React.Dispatch<React.SetStateAction<Record<string, unknown> | null>>;
  syncUserData: () => Promise<void>;
  transactionHistory: TransactionItem[] | null; // NEW
  setTransactionHistory: React.Dispatch<React.SetStateAction<TransactionItem[] | null>>; // NEW
}

interface TransactionItem {
  transaction_id: string;
  timestamp: string;
  description: string;
  amount: string;
  receiver_name: string;
  receiver_account_number: string;
  receiver_name_display: string;
  sender_name: string;
  transaction_direction: "incoming" | "outgoing";
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<Record<string, unknown> | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<TransactionItem[] | null>(null);


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
    if (!storedUser && !accessTokenFromCookie && localStorage.getItem('accessToken')) {
      console.log('🔒 [Auth] No user data found in localStorage or cookies. User is logged out.');
      logout()
    }

    const storedTransactionHistory = localStorage.getItem('transactionHistory');
    if (storedTransactionHistory) {
      setTransactionHistory(JSON.parse(storedTransactionHistory));
    } else {
      console.log('🔒 [Auth] No transaction history found in localStorage.');
    }
  }, []);

  const syncTokenToCookies = () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      Cookies.set('accessToken', token, { expires: 7  });
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

    if (data.transactionHistory) {
      setTransactionHistory(data.transactionHistory as TransactionItem[]);
      localStorage.setItem('transactionHistory', JSON.stringify(data.transactionHistory));
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

  const syncUserData = useCallback(async () => {
    try {
      console.log('🔄 [Auth] Syncing user info, balance, and transaction history...');
      const [userInfoRes, accountRes, historyRes] = await Promise.all([
        fetch("/api/userInfo", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: 'include' }),
        fetch("/api/userAccount", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: 'include' }),
        fetch("/api/transfer/history", { method: "GET", headers: { "Content-Type": "application/json" }, credentials: 'include' }),
      ]);
  
      if (!userInfoRes.ok || !accountRes.ok || !historyRes.ok) {
        throw new Error('Failed to sync user data.');
      }
  
      const userInfo = await userInfoRes.json();
      const accountDetails = await accountRes.json();
      const transactionData = await historyRes.json();
  
      const updatedData = {
        tokenData: userInfo,
        balance: accountDetails.balance,
        walletNumber: accountDetails.wallet_number,
        transactionHistory: transactionData,
      };
  
      setUserData(updatedData);
      setTransactionHistory(transactionData); // 🔁 update state
      localStorage.setItem('userData', JSON.stringify(updatedData));
      console.log('✅ [Auth] User data synced successfully.');
  
    } catch (error) {
      console.error('❌ [Auth] Error syncing user data:', error);
      logout();
    }
  }, []);
  
  return (
    <AuthContext.Provider
    value={{
      userData,
      login,
      logout,
      setUserData,
      syncUserData,
      transactionHistory,
      setTransactionHistory,
    }}
  >
    {children}
  </AuthContext.Provider>
  
  );
};

export { AuthContext, AuthProvider };
