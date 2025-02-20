// services/foodService.ts
import { apiPost, apiGet, apiPut, apiDelete } from "@/utils/axiosInstance";

const ADD_FOOD_ENDPOINT = "/api/admin/addFood";
const VIEW_FOODS_ENDPOINT = "/api/admin/viewFoods";
const EDIT_FOOD_ENDPOINT = (id: number) => `/api/admin/editFood/${id}`;
const DELETE_FOOD_ENDPOINT = (id: number) => `/api/admin/deleteFood/${id}`;

export interface FoodItem {
    id: number;
    name: string;
    price: number;
    comment1?: string;
    comment2?: string;
    comment3?: string;
    comment4?: string;
  }
  
  export interface Category {
    id: number;
    name: string;
    food: FoodItem[];
  }
  
  export interface FoodsData {
    drinks: { category: Category }[];
    meals: { category: Category }[];
  }
export interface Food {
  id: number;
  name: string;
  category: { id: number; name: string; type: "MEAL" | "DRINK" };
  price: number;
  comment1: string;
  comment2: string;
  comment3: string;
  comment4: string;
}

export const addFoodService = async (formData: Omit<Food, "id" | "category"> & { categoryId: number }) => {
  try {
    console.log("Adding new food:", formData);
    const response = await apiPost(ADD_FOOD_ENDPOINT, formData);
    console.log("Food added successfully:", response);
    return response;
  } catch (error: any) {
    console.error("❌ Failed to add food:", error.response?.data || error.message);
    throw error;
  }
};

  
  export const fetchFoodsService = async (): Promise<FoodsData> => {
    try {
      console.log("Fetching foods...");
      const response = await apiGet(VIEW_FOODS_ENDPOINT);
  
      // Explicitly define formattedData's type
      const formattedData: FoodsData = {
        drinks: [],
        meals: []
      };
  
      response.forEach((item: { type: "MEAL" | "DRINK"; category: Category }) => {
        const categoryData = {
          category: {
            id: item.category.id,
            name: item.category.name,
            food: item.category.food
          }
        };
  
        if (item.type === "DRINK") {
          formattedData.drinks.push(categoryData);
        } else if (item.type === "MEAL") {
          formattedData.meals.push(categoryData);
        }
      });
  
      console.log("Transformed foods:", formattedData);
      return formattedData;
    } catch (error: any) {
      console.error("❌ Failed to fetch foods:", error.response?.data || error.message);
      throw error;
    }
  };
  

export const editFoodService = async (id: number, formData: Omit<Food, "id" | "category"> & { categoryId: number }) => {
  try {
    console.log(`Editing food ${id}...`, formData);
    const response = await apiPut(EDIT_FOOD_ENDPOINT(id), formData);
    console.log("Food edited successfully:", response);
    return response;
  } catch (error: any) {
    console.error("❌ Failed to edit food:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteFoodService = async (id: number) => {
  try {
    console.log(`Deleting food ${id}...`);
    const response = await apiDelete(DELETE_FOOD_ENDPOINT(id));
    console.log("Food deleted successfully:", response);
    return response;
  } catch (error: any) {
    console.error("❌ Failed to delete food:", error.response?.data || error.message);
    throw error;
  }
};
