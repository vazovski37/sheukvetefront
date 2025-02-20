// hooks/useAddCategory.ts
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Import Next.js router
import { addCategoryService } from "@/services/categoryService";

export const useAddCategory = (categoryType: "MEAL" | "DRINK") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // ✅ Initialize router

  const addCategory = async (formData: { categoryName: string }) => {
    if (loading) return; // Prevent multiple requests
    setLoading(true);
    setError(null);

    try {
      await addCategoryService({
        categoryName: formData.categoryName,
        categoryType,
      });

      // ✅ Redirect to admin dashboard after success
      router.push("/admin");
    } catch (err: any) {
      setError(err.response?.data?.message || "Category creation failed.");
    } finally {
      setLoading(false);
    }
  };

  return { addCategory, loading, error };
};
