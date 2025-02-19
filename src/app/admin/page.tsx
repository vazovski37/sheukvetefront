"use client";

import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import SButton from "@/designComp/SButton/SButton";

// Define button data
const buttonData = [
  { text: "კატეგორიის დამატება", path: "/admin/category" },
  { text: "კერძის დამატება", path: "/admin/product" },
  { text: "ყველა კატეგორია", path: "/admin/categories" },
  { text: "მიმტანის დამატება", path: "/admin/add-waiter" },
  { text: "სასმლის დამატება", path: "/admin/warehouse" },
  { text: "ყველა მიმტანი", path: "/admin/reviews" },
  { text: "მაგიდის დამატება", path: "/admin/table" },
  { text: "ფინანსები", path: "/admin/finance" },
  { text: "ყველა მაგიდა", path: "/admin/orders" },
  { text: "ყველა საჭმელი/სასმელი", path: "/admin/users" }
];

const SheKveteAdminPage = () => {
  const router = useRouter(); // Initialize router

  return (
    <div className="flex flex-col items-center mt-20 px-4">
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl">
        {buttonData.map((button, index) => (
          <SButton
            key={index}
            text={button.text}
            onClick={() => router.push(button.path)}
            color="yellow"
            className="w-full sm:w-48 h-20 text-lg flex justify-center items-center"
          />
        ))}
      </div>
    </div>
  );
};

export default SheKveteAdminPage;
