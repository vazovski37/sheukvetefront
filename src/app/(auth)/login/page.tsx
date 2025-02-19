"use client";

import React from "react";
import SForm from "@/designComp/SForm/SForm";
import { useLogin } from "@/hooks/useLogin";
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
  const { login, loading, error } = useLogin();

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-[#fdf4e3]">
      {/* Logo */}
      <div className="mb-10">
        <Image src={logo} alt="Logo" width={200} height={80} />
      </div>

      {/* Login Form */}
      <SForm<LoginFormData>
        title="სისტემაში შესვლა"
        fields={loginFields}
        onSubmit={login}
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
