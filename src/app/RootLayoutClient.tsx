"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/logo.png";
import SButton from "@/designComp/SButton/SButton";
import { useAuth } from "@/context/AuthContext";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { logout, isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center w-full bg-[#fdf4e3] px-6 relative">
      {/* Header */}
      <div className="flex justify-between items-center w-full py-2">
        {/* Back Button */}
        <span className="text-black cursor-pointer text-lg" onClick={() => router.back()}>
          &lt; უკან
        </span>

        {/* Logo */}
        <Image
          src={logo}
          alt="SheKvete Logo"
          width={200}
          height={80}
          priority
          unoptimized
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />

        {/* Show Logout Button Only If User is Signed In */}
        {isAuthenticated && (
          <SButton
            text="გამოსვლა"
            onClick={logout}
            color="red"
            className="px-4 py-2 text-sm border border-red-600"
          />
        )}
      </div>

      {/* Page Content */}
      <div className="w-full">{children}</div>
    </div>
  );
}
