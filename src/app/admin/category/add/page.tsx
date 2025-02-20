"use client";

import React from "react";
import SButton from "@/designComp/SButton/SButton";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf4e3] px-4">
      <div className="flex flex-wrap justify-center gap-10">
        <SButton
          text="სასმლის კატეგორია"
          onClick={() => router.push("/admin/category/add/drink")}
          color="yellow"
          className="w-48 h-24 text-lg font-medium"
        />
        <SButton
          text="კერძების კატეგორია"
          onClick={() => router.push("/admin/category/add/meal")}
          color="yellow"
          className="w-48 h-24 text-lg font-medium"
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
