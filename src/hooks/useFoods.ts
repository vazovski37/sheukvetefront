import { useState, useEffect } from "react";
import {
  fetchFoodsService,
  addFoodService,
  editFoodService,
  deleteFoodService,
  FoodsData,
  Category,
  Food,
} from "@/services/foodService";

export const useFoods = (categoryType?: "MEAL" | "DRINK") => {
  const [foods, setFoods] = useState<{ MEAL: { category: Category }[]; DRINK: { category: Category }[] }>({
    MEAL: [],
    DRINK: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFoods = async () => {
    setLoading(true);
    setError(null);
    try {
      const data: FoodsData = await fetchFoodsService();
      setFoods({ MEAL: data.meals, DRINK: data.drinks });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const refetchFoods = () => {
    fetchFoods();
  };

  const addFood = async (formData: Omit<Food, "id" | "category"> & { categoryId: number }) => {
    try {
      const newFood = await addFoodService(formData);
      const categoryType = newFood.category.type as "MEAL" | "DRINK";

      setFoods((prevFoods) => ({
        ...prevFoods,
        [categoryType]: prevFoods[categoryType].map((category) =>
          category.category.id === formData.categoryId
            ? { ...category, category: { ...category.category, food: [...category.category.food, newFood] } }
            : category
        ),
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add food.");
    }
  };

  const editFood = async (id: number, formData: Partial<Food>) => {
    try {
      const category = [...foods.MEAL, ...foods.DRINK].find((cat) =>
        cat.category.food.some((food) => food.id === id)
      );

      if (!category) {
        setError("Category not found.");
        return;
      }

      const categoryId = category.category.id;
      const categoryType: "MEAL" | "DRINK" = foods.MEAL.includes(category) ? "MEAL" : "DRINK";

      await editFoodService(id, {
        name: formData.name ?? "",
        price: formData.price ?? 0,
        comment1: formData.comment1 ?? "",
        comment2: formData.comment2 ?? "",
        comment3: formData.comment3 ?? "",
        comment4: formData.comment4 ?? "",
        categoryId,
      });

      setFoods((prevFoods) => ({
        ...prevFoods,
        [categoryType]: prevFoods[categoryType].map((cat) => ({
          ...cat,
          category: {
            ...cat.category,
            food: cat.category.food.map((food) => (food.id === id ? { ...food, ...formData } : food)),
          },
        })),
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to edit food.");
    }
  };

  const deleteFood = async (id: number) => {
    try {
      await deleteFoodService(id);
      setFoods((prevFoods) => ({
        MEAL: prevFoods.MEAL.map((category) => ({
          ...category,
          category: { ...category.category, food: category.category.food.filter((food) => food.id !== id) },
        })).filter((category) => category.category.food.length > 0),
        DRINK: prevFoods.DRINK.map((category) => ({
          ...category,
          category: { ...category.category, food: category.category.food.filter((food) => food.id !== id) },
        })).filter((category) => category.category.food.length > 0),
      }));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to delete food.");
    }
  };

  return { foods: categoryType ? foods[categoryType] : foods, loading, error, addFood, refetchFoods, editFood, deleteFood };
};
