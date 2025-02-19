import axios from "axios";
import { parseCookies } from "nookies";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Attach Authorization token from cookies if available
axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies["api_token"];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const apiPost = async (url: string, data?: any): Promise<any> => {
  return axiosInstance.post(url, data).then((res) => res.data);
};

export const apiGet = async (url: string, params?: any): Promise<any> => {
  return axiosInstance.get(url, { params }).then((res) => res.data);
};

export const apiPut = async (url: string, data?: any): Promise<any> => {
  return axiosInstance.put(url, data).then((res) => res.data);
};

export const apiDelete = async (url: string): Promise<any> => {
  return axiosInstance.delete(url).then((res) => res.data);
};

export default axiosInstance;
