"use client";

import SButton from "@/designComp/SButton/SButton";
import SInput from "@/designComp/SInput/SInput";
import React, { useState } from "react";
import logo from "../../../assets/images/logo.png"; // Path to logo image
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Initialize useRouter

  const handleLogin = () => {
    if (username && password) {
      router.push("/tables"); // Navigate to TablesPage
    } else {
      alert("Please fill in both fields!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-[#fdf4e3]">
      {/* Logo */}
      <div className="mb-10">
        <Image src={logo} alt="Logo" width={200} height={80} />
      </div>

      {/* Input fields and Button */}
      <div className="w-full max-w-xs bg-white p-6 rounded-md border-2 border-yellow-400">
        {/* Username Input */}
        <div className="mb-4">
          <SInput
            placeholder="სახელი"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <SInput
            placeholder="პაროლი"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <SButton text="სისტემაში შესვლა" onClick={handleLogin} fullWidth />
      </div>
    </div>
  );
};

export default LoginPage;
