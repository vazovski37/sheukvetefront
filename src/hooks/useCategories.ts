// hooks/useCategories.ts
import { useState, useEffect } from "react";
import { fetchCategoriesService, editCategoryService, deleteCategoryService } from "@/services/categoryService";

export const useCategories = (categoryType: "MEAL" | "DRINK") => {
  const [categories, setCategories] = useState<{ id: number; name: string; type: "MEAL" | "DRINK" }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCategoriesService();
        setCategories(data.filter((cat: any) => cat.type === categoryType));
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categoryType]);

  const editCategory = async (id: number, formData: { categoryName: string; categoryType: string }) => {
    try {
      await editCategoryService(id, formData);
  
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === id
            ? {
                ...cat,
                name: formData.categoryName,
                type: formData.categoryType as "MEAL" | "DRINK", // ✅ Explicitly cast to correct type
              }
            : cat
        )
      );
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to edit category.");
    }
  };
  

  const deleteCategory = async (id: number) => {
    try {
      await deleteCategoryService(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id)); // ✅ Remove from state
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete category.");
    }
  };

  return { categories, loading, error, editCategory, deleteCategory };
};
