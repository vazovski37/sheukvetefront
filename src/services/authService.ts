// services/authService.ts
import { apiPost } from "@/utils/axiosInstance";

const LOGIN_ENDPOINT = "/api/auth/login";

export const loginService = async (formData: { username: string; password: string }) => {
  try {
    const response = await apiPost(LOGIN_ENDPOINT, formData);
    console.log("User logged in:", response);
    return response;
  } catch (error: any) {
    console.error("Login failed:", error);
    throw error;
  }
};
