import { axiosGet, axiosPost, axiosPut } from "@/app/axios/axiosWithAuth";

export const addMovie = async (payload) => {
  try {
    const res = await axiosPost("/movie/add", payload);
    return res;
  } catch (error) {
    return error;
  }
};
export const getMovieList = async () => {
  try {
    const res = await axiosGet("/movie/getList");
    return res;
  } catch (error) {
    return error;
  }
};
export const getMovieById = async (movieId) => {
  try {
    const res = await axiosGet(`/movie/getMovie/${movieId}`);
    return res;
  } catch (error) {
    return error;
  }
};
export const updateMovie = async (movieId, payload) => {
  try {
    const res = await axiosPut(`/movie/update/${movieId}`, payload);
    return res;
  } catch (error) {
    return error;
  }
};
