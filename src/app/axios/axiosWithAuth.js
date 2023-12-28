import { getCookie } from "../../utils/cookies.utils";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { axiosInstance } from "./axiosInstance";

export const axiosGet = async (url) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const response = await axiosInstance.get(mainUrl, {
      headers: {
        authorization: getCookie("token"),
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
export const axiosPost = async (url, payload) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const response = await axiosInstance.post(mainUrl, payload, {
      headers: {
        authorization: getCookie("token"),
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
export const axiosPut = async (url, payload) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const response = await axiosInstance.put(mainUrl, payload, {
      headers: {
        authorization: getCookie("token"),
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
export const axiosDelete = async (url) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const response = await axiosInstance.delete(mainUrl, {
      headers: {
        authorization: getCookie("token"),
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
