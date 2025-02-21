import { useState, useEffect } from "react";
import { loginService, logoutService } from "@/services/authService";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export interface AuthState {
  token: string | null;
  role: "ADMIN" | "WAITER" | null;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const cookies = parseCookies();
    return {
      token: cookies.api_token || null,
      role: (cookies.role as "ADMIN" | "WAITER") || null,
    };
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Compute isAuthenticated dynamically
  const isAuthenticated = !!auth.token;

  // ✅ Login function (Triggers a re-render)
  const login = async (formData: { username: string; password: string }) => {
    if (loading) return;
    setLoading(true);
    setError(null);

    try {
      const response = await loginService(formData);

      if (!response.token || !response.role) {
        throw new Error("Invalid response from server");
      }

      // ✅ Store token & role in cookies
      setCookie(null, "api_token", response.token, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        secure: process.env.NODE_ENV === "production",
      });

      setCookie(null, "role", response.role, {
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        secure: process.env.NODE_ENV === "production",
      });

      // ✅ Update auth state and trigger re-render
      setAuth({ token: response.token, role: response.role });

      // ✅ Redirect based on role
      router.push(response.role === "ADMIN" ? "/admin" : "/waiter");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function (Triggers a re-render)
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // ✅ Clear cookies and trigger re-render
      destroyCookie(null, "api_token", { path: "/" });
      destroyCookie(null, "role", { path: "/" });

      setAuth({ token: null, role: null });

      router.push("/login");
    }
  };

  return { auth, login, logout, loading, error, isAuthenticated };
};
