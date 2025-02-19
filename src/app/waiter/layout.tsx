"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import Image from "next/image";
import logo from "@/assets/images/logo.png"; // Adjust the path as needed

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter(); 

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-[#fdf4e3] p-6 relative">
      {/* Back Button and Logo in the same container */}
      <div className="flex items-center justify-center w-full absolute top-4">
        <span className="text-black cursor-pointer absolute left-4 text-lg" onClick={() => router.push("/")}>
          &lt; გასვლა
        </span>
        <Image src={logo} alt="SheKvete Logo" width={200} height={80} />
      </div>

      {/* Page Content */}
      <div className="w-full max-w-5xl mt-20">{children}</div>
    </div>
  );
};

export default Layout;
