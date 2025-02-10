"use client";

import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SButton from "@/designComp/SButton/SButton";
import logo from "../../../../assets/images/logo.png";

const TableDetailsPage = () => {
  const { id } = useParams(); 

  const isTableTaken = id === "1";


  const handleOrderStart = () => {
    alert(`Order started for Table ${id}`);
  };

  const handleOrderFinish = () => {
    alert(`Order finished for Table ${id}`);
  };






  return (
    <div className="flex flex-col items-center h-screen bg-[#fdf4e3] p-6">
      {/* Logo */}
      <div className="mt-8">
        <Image src={logo} alt="Logo" width={150} height={50} />
      </div>

      {/* Horizontal Line */}
      <div className="w-full border-t border-black my-6"></div>

      {/* Table Details */}
      <div className="flex flex-col items-start w-full max-w-md bg-white p-4 rounded-md border-2 border-yellow-400">
        <div className="flex items-center mb-4">
          <div
            className={`w-10 h-10 flex items-center justify-center ${
              isTableTaken ? "bg-red-500" : "bg-green-500"
            } text-white rounded-md mr-4`}
          >
            {id}
          </div>
          <div>
            <p className="font-bold text-lg">მაგიდა N: {id}</p>
            <p className="text-gray-600">
              სტატუსი: {isTableTaken ? "დაკავებული" : "თავისუფალი"}
            </p>
          </div>
        </div>

        {isTableTaken ? (
          <>
            {/* Display if Table is Taken */}
            <p className="text-lg font-medium mb-4">შეკვეთილი:</p>
            <div className="flex space-x-4">
              <SButton
                text="შეკვეთის დაწყება"
                onClick={handleOrderStart}
                color="yellow"
                className="text-lg"
              />
              <SButton
                text="შეკვეთის დამთავრება"
                onClick={handleOrderFinish}
                color="yellow"
                className="text-lg"
              />
            </div>
          </>
        ) : (
          <>
            {/* Display if Table is Free */}
            <SButton
              text="შეკვეთის აღება"
              onClick={handleOrderStart}
              color="yellow"
              fullWidth
              className="text-lg mt-4"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default TableDetailsPage;
