"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import SForm from "@/designComp/SForm/SForm";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import logo from "../../../assets/images/logo.png";

interface LoginFormData {
  username: string;
  password: string;
}

const loginFields: { name: keyof LoginFormData; placeholder: string; type?: string }[] = [
  { name: "username", placeholder: "სახელი" },
  { name: "password", placeholder: "პაროლი", type: "password" },
];

const LoginPage = () => {
  const { login,auth, isAuthenticated, loading, error } = useAuth();
  const router = useRouter();

  // ✅ Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (auth.role == "ADMIN"){
        router.push("/admin");
      }else if (auth.role == "WAITER"){
        router.push("/waiter");
      }
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (formData: LoginFormData) => {
    await login(formData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-[#fdf4e3]">

      {/* Login Form */}
      <SForm<LoginFormData>
        title="სისტემაში შესვლა"
        fields={loginFields}
        onSubmit={handleLogin}
        submitText={loading ? "იტვირთება..." : "შესვლა"}
        loading={loading}
      />

      {/* Error message */}
      {error && (
        <p className="text-red-500 text-sm mt-2 bg-red-100 p-2 rounded-md border border-red-400">
          {error}
        </p>
      )}
    </div>
  );
};

export default LoginPage;
