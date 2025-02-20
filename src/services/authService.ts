import { apiPost } from "@/utils/axiosInstance";

const LOGIN_ENDPOINT = "/api/auth/login";
const LOGOUT_ENDPOINT = "/api/auth/logout";

export const loginService = async (formData: { username: string; password: string }) => {
  try {
    const response = await apiPost(LOGIN_ENDPOINT, formData);
    return response;
  } catch (error: any) {
    return error;
  }
};

// ✅ Logout API
export const logoutService = async () => {
  try {
    await apiPost(LOGOUT_ENDPOINT);
  } catch (error: any) {
    console.error("Logout API failed:", error);
    throw error;
  }
};
