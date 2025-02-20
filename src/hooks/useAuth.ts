import { useState, useEffect } from "react";
import { loginService, logoutService } from "@/services/authService";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";

export interface AuthState {
  token: string | null;
  role: "ADMIN" | "WAITER" | null;
}

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({ token: null, role: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // ✅ Load auth state from cookies on mount
  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.api_token && cookies.role) {
      setAuth({ token: cookies.api_token, role: cookies.role as "ADMIN" | "WAITER" });
    }
  }, []);

  // ✅ Login function
  const login = async (formData: { username: string; password: string }) => {
    if (loading) return; // Prevent multiple requests
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

      // ✅ Update auth state
      setAuth({ token: response.token, role: response.role });

      // ✅ Redirect based on role
      if (response.role === "ADMIN") {
        router.push("/admin");
      } else if (response.role === "WAITER") {
        router.push("/waiter");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout function
  const logout = async () => {
    try {
      await logoutService();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      // ✅ Clear cookies
      destroyCookie(null, "api_token", { path: "/" });
      destroyCookie(null, "role", { path: "/" });

      // ✅ Clear auth state
      setAuth({ token: null, role: null });

      // ✅ Redirect to login page
      router.push("/login");
    }
  };

  return { auth, login, logout, loading, error };
};
