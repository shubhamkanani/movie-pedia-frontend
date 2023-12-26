import axios from "axios";
const baseUrl =
  process.env.BASE_URL ||
  "https://movie-pedia-backend-dybvbp95z-shubham-kananis-projects.vercel.app/api";

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
