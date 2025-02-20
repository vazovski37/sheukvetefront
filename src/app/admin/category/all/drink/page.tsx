"use client";

import React, { useState } from "react";
import { useCategories } from "@/hooks/useCategories";
import SButton from "@/designComp/SButton/SButton";
import SForm from "@/designComp/SForm/SForm";

interface EditCategoryFormData {
  categoryName: string;
  categoryType: "DRINK";
}

const ViewDrinksPage = () => {
  const { categories, loading, error, editCategory, deleteCategory } = useCategories("DRINK");
  const [editingCategory, setEditingCategory] = useState<{ id: number; name: string; type: "MEAL" | "DRINK" } | null>(null);

  const handleEdit = async (formData: EditCategoryFormData) => {
    if (editingCategory) {
      await editCategory(editingCategory.id, formData);
      setEditingCategory(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <h2 className="text-xl font-semibold mb-6">სასმლის კატეგორიები</h2>

      {loading && <p>იტვირთება...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex justify-center gap-16 w-full max-w-4xl">
        {/* Left Side: Category Labels (NOT Buttons) */}
        <div className="flex flex-col gap-6 w-1/2">
          {categories.map((category) => (
            <div key={category.id} className="bg-white p-4 rounded-md shadow-md text-center font-semibold border border-yellow-600">
              {category.name}
            </div>
          ))}
        </div>

        {/* Right Side: Buttons for Actions */}
        <div className="flex flex-col gap-4 w-1/2">
          {categories.map((category) => (
            <div key={category.id} className="flex justify-between items-center bg-white p-4 rounded-md shadow-md">
              <SButton
                text="რედაქტირება"
                onClick={() => setEditingCategory(category)}
                color="yellow"
                className="px-4 py-2 text-sm border border-yellow-600"
              />
              <SButton
                text="წაშლა"
                onClick={() => deleteCategory(category.id)}
                color="red"
                className="px-4 py-2 text-sm border border-red-600"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">რედაქტირება: {editingCategory.name}</h3>

            <SForm<EditCategoryFormData>
              title="კატეგორიის რედაქტირება"
              fields={[{ name: "categoryName", placeholder: "სახელი" }]}
              onSubmit={handleEdit}
              submitText="შენახვა"
            />

            <SButton text="დახურვა" onClick={() => setEditingCategory(null)} color="red" className="mt-4 w-full" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDrinksPage;
