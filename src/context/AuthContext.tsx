"use client";

import React, { createContext, useContext } from "react";
import { useAuthState } from "@/hooks/useAuthState";
import { IAuthState } from "@/interfaces/auth";

interface AuthContextProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  isWaiter: boolean;
  setAuthState: (state: Partial<IAuthState>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { authState, setAuthState, logout } = useAuthState();

  const isAdmin = authState.role === "admin";
  const isWaiter = authState.role === "waiter";
  const isLoggedIn = isAdmin || isWaiter; // Only allow admins and waiters

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        isWaiter,
        setAuthState,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
