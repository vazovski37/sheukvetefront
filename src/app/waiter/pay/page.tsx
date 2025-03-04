"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SButton from "@/designComp/SButton/SButton";
import logo from "../../../assets/images/logo.png";

const tables = [
  { id: 1, color: "green", label: "1" },
  { id: 2, color: "red", label: "2" },
]; // Array of table objects

const TablesPage = () => {
  const router = useRouter();

  const handleTableClick = (id: number) => {
    router.push(`/waiter/pay/${id}`); // Navigate to /table/:id
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[#fdf4e3] p-6">
      {/* Buttons */}
      <div className="flex w-full space-x-4 mb-8 ">
        {tables.map((table) => (
          <SButton
            key={table.id}
            text={table.label}
            onClick={() => handleTableClick(table.id)}
            color={table.color as "green" | "red"}
            className="w-16 h-16 text-lg flex items-center justify-center"
          />
        ))}
      </div>
    </div>
  );
};

export default TablesPage;
