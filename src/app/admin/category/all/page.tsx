"use client";

import React from "react";
import SButton from "@/designComp/SButton/SButton";
import { useRouter } from "next/navigation";

const CategoriesPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf4e3] px-4">
      <h2 className="text-xl font-semibold mb-6">ყველა კატეგორია</h2>

      <div className="flex flex-wrap justify-center gap-10">
        <SButton
          text="სასმლის კატეგორია"
          onClick={() => router.push("/admin/category/all/drink")}
          color="yellow"
          className="w-64 h-20 text-lg font-medium"
        />
        <SButton
          text="კერძების კატეგორია"
          onClick={() => router.push("/admin/category/all/meal")}
          color="yellow"
          className="w-64 h-20 text-lg font-medium"
        />
      </div>
    </div>
  );
};

export default CategoriesPage;
