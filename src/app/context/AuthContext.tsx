"use client"; // Required for Next.js App Router (client-side state)

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define the shape of the user object
type User = {
  id: string;
  name: string;
  email: string;
  token: string;
};

// Define the authentication context structure
type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Added setUser for updating the user
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

// Create the context with a default value of `undefined`
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component to wrap around the application
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check if the user is already logged in (runs on mount)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login function (fetches user data and stores user details)
  const login = async (email: string, password: string) => {
    try {
      // Simulate an API call to authenticate the user
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const { token, id, name } = data; // Assume response contains token, id, and name

      const userData = { id, name, email, token };

      // Set user state and persist to localStorage
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error(error instanceof Error ? error.message : "Login failed");
    }
  };

  // Logout function (removes user details)
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
