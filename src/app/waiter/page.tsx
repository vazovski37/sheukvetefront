"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import SButton from "@/designComp/SButton/SButton";
import Image from "next/image";
import logo from "@/assets/images/logo.png"; // Adjust the path as needed

const SheKvetePage = () => {
  const router = useRouter(); // Initialize router

  return (

      <div className="flex flex-col items-center gap-6 mt-20">
        <div className="flex gap-6">
          <SButton text="გადახდა" onClick={() => router.push("/waiter/pay")} color="yellow" className="w-48 h-20 text-lg" />
          <SButton text="შეკვეთა" onClick={() => router.push("/waiter/order")} color="yellow" className="w-48 h-20 text-lg" />
        </div>
        <SButton text="გადატანა" onClick={() => router.push("/waiter/transfer")} color="yellow" className="w-48 h-20 text-lg" />
      </div>
  );
};

export default SheKvetePage;
