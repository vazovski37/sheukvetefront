"use client";

import React, { useState } from "react";
import SForm from "@/designComp/SForm/SForm";
import { useFoods } from "@/hooks/useFoods";
import { useCategories } from "@/hooks/useCategories";
import { useRouter, usePathname } from "next/navigation";

const AddFoodPage = () => {
  const pathname = usePathname();
  const isMeal = pathname.includes("add-meal"); // Detect if adding Meal or Drink
  const { addFood, loading } = useFoods(isMeal ? "MEAL" : "DRINK");
  const { categories, loading: categoriesLoading } = useCategories(isMeal ? "MEAL" : "DRINK");
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleAddFood = async (formData: {
    name: string;
    price: number;
    comment1: string;
    comment2: string;
    comment3: string;
    comment4: string;
  }) => {
    if (!selectedCategory) {
      alert("გთხოვთ აირჩიოთ კატეგორია!");
      return;
    }
    
    await addFood({ ...formData, categoryId: selectedCategory });
    router.push("/admin/food/all");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <h2 className="text-xl font-semibold mb-6">{isMeal ? "კერძის დამატება" : "სასმლის დამატება"}</h2>

      {categoriesLoading ? <p>იტვირთება კატეგორიები...</p> : (
        <select
          className="w-full p-2 border border-yellow-500 rounded-md mb-4"
          value={selectedCategory ?? ""}
          onChange={(e) => setSelectedCategory(Number(e.target.value))}
        >
          <option value="" disabled>აირჩიეთ კატეგორია</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      )}

      <SForm
        title=""
        fields={[
          { name: "name", placeholder: "სახელი" },
          { name: "price", placeholder: "ფასი" },
          { name: "comment1", placeholder: "კომენტარი 1" },
          { name: "comment2", placeholder: "კომენტარი 2" },
          { name: "comment3", placeholder: "კომენტარი 3" },
          { name: "comment4", placeholder: "კომენტარი 4" },
        ]}
        onSubmit={handleAddFood}
        submitText="შექმნა"
        loading={loading}
      />
    </div>
  );
};

export default AddFoodPage;
