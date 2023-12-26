import axios from "axios";
import { getCookie } from "@/utils/cookies.utils";
const baseUrl = process.env.BASE_URL || "https://movie-pedia-backend-dybvbp95z-shubham-kananis-projects.vercel.app/api";

export const axiosGet = async (url) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const response = await axios.get(mainUrl, {
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
    const response = await axios.post(mainUrl, payload, {
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
    const response = await axios.put(mainUrl, payload, {
      headers: {
        authorization: getCookie("token"),
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
