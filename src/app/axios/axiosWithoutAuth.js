const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { axiosInstance } from "./axiosInstance";

export const axiosPost = async (url, payload) => {
  try {
    const res = await axiosInstance.post(`${baseUrl}${url}`, {
      ...payload,
    });
    return res;
  } catch (error) {
    return error?.response;
  }
};
