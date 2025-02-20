"use client";

import SButton from "@/designComp/SButton/SButton";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/images/logo.png";
import login from "../assets/images/login.png";

export default function Home() {
  const router = useRouter();


  return (
    <div className="flex flex-col items-center justify-center gap-y-20 h-screen p-4 bg-[#fdf4e3]">
      {/* Logo */}
      <div>
        <Image src={logo} alt="Logo" width={150} height={50} />
      </div>

      {/* Login Illustration */}
      <div>
        <Image src={login} alt="Login Illustration" width={300} height={300} />
      </div>

      {/* Login Button */}
      <SButton text="შესვლა" onClick={() => router.push("/login")} fullWidth />
    </div>
  );
}
