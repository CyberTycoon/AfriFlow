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

  useEffect(() => {
    if (!token) return;
  
    const fetchLatestBalance = async () => {
      try {
        const response = await fetch("/api/userAccount", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 401) {
          console.warn("⚠️ [Auth] Access token expired. Trying to refresh...");
          await refreshAccessToken();
          return await fetchLatestBalance(); // 👈 after refresh, retry fetching immediately
        }
  
        if (!response.ok) {
          throw new Error("Failed to fetch latest balance");
        }
  
        const updatedAccountDetails = await response.json();
  
        setUserData((prevUserData) => {
          if (!prevUserData) return null;
          const updatedUserData = { ...prevUserData, balance: updatedAccountDetails.balance };
          localStorage.setItem("userData", JSON.stringify(updatedUserData));
          localStorage.setItem("balance", JSON.stringify(updatedAccountDetails.balance));
          return updatedUserData;
        });
  
        console.log("🔄 [Auth] Updated balance from API:", updatedAccountDetails.balance);
      } catch (error) {
        console.error("❌ [Auth] Error updating balance:", error);
      }
    };
  
    const refreshAccessToken = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }
  
        const res = await fetch("/api/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });
  
        const data = await res.json();
  
        if (!res.ok) {
          throw new Error("Failed to refresh token");
        }
  
        // Save new access token
        setToken(data.access);
        localStorage.setItem("token", data.access);
        console.log("🔄 [Auth] Token refreshed successfully:", data.access);
      } catch (error) {
        console.error("❌ [Auth] Token refresh failed:", error);
        logout(); // Force logout if refresh fails
      }
    };
  
    const interval = setInterval(fetchLatestBalance, 10000); // every 10 seconds
    return () => clearInterval(interval);
  }, [token]);
  
  

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
  
    const refreshToken = data.refreshToken as string | undefined;
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };
  

  const logout = () => {
    setUserData(null);
    setToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    localStorage.removeItem("balance");   // 👈 Add
    localStorage.removeItem("accNumber"); // 👈 Add
    localStorage.removeItem("refreshToken"); // 👈 Add if you store it at login (best practice)
  };
  

  return (
    <AuthContext.Provider value={{ userData, token, login, logout, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
