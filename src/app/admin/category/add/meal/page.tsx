"use client";

import React from "react";
import { usePathname } from "next/navigation"; // Used to determine category type
import SForm from "@/designComp/SForm/SForm";
import { useAddCategory } from "@/hooks/useAddCategory";

interface CategoryFormData {
  categoryName: string;
}

const categoryFields: { name: keyof CategoryFormData; placeholder: string }[] = [
  { name: "categoryName", placeholder: "სახელი" },
];

const AddCategoryPage = () => {
  const pathname = usePathname();
  const categoryType: "MEAL" | "DRINK" = pathname.includes("meal") ? "MEAL" : "DRINK";
  const { addCategory, loading, error } = useAddCategory(categoryType);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <h2 className="text-xl font-semibold mb-6">
        {categoryType === "MEAL" ? "კერძის კატეგორიის დამატება" : "სასმლის კატეგორიის დამატება"}
      </h2>

      <SForm<CategoryFormData>
        title="კატეგორიის დამატება"
        fields={categoryFields}
        onSubmit={addCategory}
        submitText={loading ? "იტვირთება..." : "შექმნა"}
        loading={loading}
      />

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
};

export default AddCategoryPage;
