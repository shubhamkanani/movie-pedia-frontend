import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const axiosPost = async (url, payload) => {
  try {
    const res = await axios.post(`${baseUrl}${url}`, {
      ...payload,
    });
    return res;
  } catch (error) {
    return error?.response;
  }
};
