// services/categoryService.ts
import { apiPost, apiGet, apiPut, apiDelete } from "@/utils/axiosInstance";

const VIEW_CATEGORIES_ENDPOINT = "/api/admin/viewCategories";
const EDIT_CATEGORY_ENDPOINT = (id: number) => `/api/admin/editCategory/${id}`;
const DELETE_CATEGORY_ENDPOINT = (id: number) => `/api/admin/deleteCategory/${id}`;
const ADD_CATEGORY_ENDPOINT = "/api/admin/addCategory";


export const addCategoryService = async (formData: { categoryName: string; categoryType: "MEAL" | "DRINK" }) => {
  try {
    console.log("Sending category request:", ADD_CATEGORY_ENDPOINT, formData);
    const response = await apiPost(ADD_CATEGORY_ENDPOINT, formData);
    console.log("Category added successfully:", response);
    return response;
  } catch (error: any) {
    console.error("❌ Failed to add category:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchCategoriesService = async () => {
  try {
    console.log("Fetching categories...");
    const response = await apiGet(VIEW_CATEGORIES_ENDPOINT);
    console.log("Fetched categories:", response);
    return response;
  } catch (error: any) {
    console.error("❌ Failed to fetch categories:", error.response?.data || error.message);
    throw error;
  }
};

export const editCategoryService = async (id: number, formData: { categoryName: string; categoryType: string }) => {
  try {
    console.log(`Editing category ${id}...`, formData);
    const response = await apiPut(EDIT_CATEGORY_ENDPOINT(id), formData);
    console.log("Category edited successfully:", response);
    return response;
  } catch (error: any) {
    console.error("❌ Failed to edit category:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteCategoryService = async (id: number) => {
    try {
      console.log(`Deleting category ${id}...`);
      const response = await apiDelete(DELETE_CATEGORY_ENDPOINT(id));
      console.log("Category deleted successfully:", response);
      return response;
    } catch (error: any) {
      console.error("❌ Failed to delete category:", error.response?.data || error.message);
      throw error;
    }
  };
  

