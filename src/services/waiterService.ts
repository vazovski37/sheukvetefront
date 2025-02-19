// services/waiterService.ts
import { apiPost } from "@/utils/axiosInstance";

const ADD_WAITER_ENDPOINT = "/api/admin/addWaiter";

export const addWaiterService = async (formData: {
  username: string;
  password: string;
  confirmPassword: string;
}): Promise<void> => {
  try {
    await apiPost(ADD_WAITER_ENDPOINT, formData);
    console.log("Waiter successfully added:", formData);
  } catch (error) {
    console.error("Failed to add waiter:", error);
    throw error;
  }
};
