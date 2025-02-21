"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { loginService, logoutService } from "@/services/authService";

export interface AuthState {
  token: string | null;
  role: "ADMIN" | "WAITER" | null;
}

interface AuthContextProps {
  auth: AuthState;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null; // ✅ Added error state
  login: (formData: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // ✅ Added error state
  const router = useRouter();

  // ✅ Load auth state from cookies on first render
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.api_token && cookies.role) {
      setAuth({ token: cookies.api_token, role: cookies.role as "ADMIN" | "WAITER" });
    }
  }, []);

  const isAuthenticated = !!auth.token;

  const login = async (formData: { username: string; password: string }) => {
    setLoading(true);
    setError(null); // ✅ Reset error before attempting login

    try {
      const response = await loginService(formData);

      if (!response.token || !response.role) {
        throw new Error("Invalid response from server");
      }

      // ✅ Store token & role in cookies
      setCookie(null, "api_token", response.token, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
      });

      setCookie(null, "role", response.role, {
        path: "/",
        maxAge: 60 * 60 * 24,
        secure: process.env.NODE_ENV === "production",
      });

      // ✅ Update global state (Immediate re-render)
      setAuth({ token: response.token, role: response.role });

      // ✅ Redirect to dashboard
      router.push(response.role === "ADMIN" ? "/admin" : "/waiter");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again."); // ✅ Store error
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      destroyCookie(null, "api_token", { path: "/" });
      destroyCookie(null, "role", { path: "/" });

      setAuth({ token: null, role: null });
      router.push("/login");

      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook to access auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
