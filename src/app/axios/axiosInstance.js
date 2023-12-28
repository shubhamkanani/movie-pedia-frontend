import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if ((response && response?.status === 401) || response?.status === 403) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
