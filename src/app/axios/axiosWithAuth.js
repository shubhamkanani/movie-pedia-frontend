import axios from "axios";
import { getCookie } from "../../utils/cookies.utils";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

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
export const axiosDelete = async (url) => {
  try {
    const mainUrl = `${baseUrl}${url}`;
    const response = await axios.delete(mainUrl, {
      headers: {
        authorization: getCookie("token"),
      },
    });
    return response;
  } catch (error) {
    return error?.response;
  }
};
