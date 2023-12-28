import { axiosPost } from "../app/axios/axiosWithoutAuth";

export const login = async (payload) => {
  try {
    const res = await axiosPost("/login", {
      ...payload,
    });
    return res;
  } catch (error) {
    return error;
  }
};
