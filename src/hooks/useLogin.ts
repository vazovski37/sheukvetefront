// hooks/useLogin.ts
import { useState } from "react";
import { loginService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (formData: { username: string; password: string }) => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    setError(null);

    try {
      const response = await loginService(formData); // Fetch login response

      // 🛑 Ensure response contains token and role
      if (!response.token || !response.role) {
        throw new Error("Invalid response from server");
      }

      // ✅ Store token and role in cookies
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

      // ✅ Redirect based on user role
      if (response.role === "ADMIN") {
        router.push("/admin");
      } else if (response.role === "WAITER") {
        router.push("/waiter");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
