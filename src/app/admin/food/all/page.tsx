"use client";

import React, { useState, useEffect } from "react";
import { useFoods } from "@/hooks/useFoods";
import SButton from "@/designComp/SButton/SButton";
import SForm from "@/designComp/SForm/SForm";
import STab from "@/designComp/STab/STab";
import { FoodItem, Category } from "@/services/foodService";

const ViewFoodsPage = () => {
  const [activeTab, setActiveTab] = useState<"MEAL" | "DRINK">("MEAL");
  const [hasMounted, setHasMounted] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ Fetch foods
  const { foods, loading, error, editFood, deleteFood, refetchFoods } = useFoods();

  // ✅ Fix: Ensure `foods` is treated as having `MEAL` & `DRINK` properties
  const displayedFoods = Array.isArray(foods)
    ? foods.filter(category => category.category) // If foods is an array
    : foods[activeTab] ?? []; // If foods has MEAL and DRINK keys

  const handleEdit = async (formData: Partial<FoodItem>) => {
    if (editingFood) {
      await editFood(editingFood.id, formData);
      setEditingFood(null);
    }
  };

  if (!hasMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#fdf4e3]">
      <h2 className="text-xl font-semibold mb-6">ყველა კერძი/სასმელი</h2>

      <STab
        tabs={["MEALS", "DRINKS"]}
        activeTab={activeTab === "MEAL" ? 0 : 1}
        onTabChange={(index) => setActiveTab(index === 0 ? "MEAL" : "DRINK")}
      />

      <SButton text="განახლება" onClick={refetchFoods} color="yellow" className="mt-4 w-48 text-center" />

      {loading && <p>იტვირთება...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full max-w-4xl mt-6">
        {displayedFoods.map((category: { category: Category }) => (
          <div key={category.category.id} className="mb-8">
            <h3 className="text-lg font-bold border-b border-yellow-500 pb-2 mb-4">{category.category.name}</h3>

            <div className="flex flex-col gap-4">
              {category.category.food.map((food: FoodItem) => (
                <div key={food.id} className="bg-white p-4 rounded-md shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{food.name} - {food.price}₾</span>
                    <div className="flex gap-4">
                      <SButton text="რედაქტირება" onClick={() => setEditingFood(food)} color="yellow" />
                      <SButton text="წაშლა" onClick={() => deleteFood(food.id)} color="red" />
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-600">
                    {[food.comment1, food.comment2, food.comment3, food.comment4]
                      .filter((comment) => comment && comment.trim() !== "")
                      .map((comment, index) => (
                        <p key={index} className="border-l-4 border-yellow-500 pl-2">{comment}</p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Food Modal */}
      {editingFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">რედაქტირება: {editingFood.name}</h3>

            <SForm
              title="კერძის რედაქტირება"
              fields={[
                { name: "name", placeholder: "სახელი", defaultValue: editingFood.name },
                { name: "price", placeholder: "ფასი", defaultValue: editingFood.price, type: "text" },
                { name: "comment1", placeholder: "კომენტარი 1", defaultValue: editingFood.comment1 },
                { name: "comment2", placeholder: "კომენტარი 2", defaultValue: editingFood.comment2 },
                { name: "comment3", placeholder: "კომენტარი 3", defaultValue: editingFood.comment3 },
                { name: "comment4", placeholder: "კომენტარი 4", defaultValue: editingFood.comment4 },
              ]}
              onSubmit={handleEdit}
              onCancel={() => setEditingFood(null)} // ✅ Cancel Editing
              submitText="შენახვა"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFoodsPage;
