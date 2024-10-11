import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Rating",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createRating = async (rating: any) => {
  try {
    const response = await api.post("/Create", rating);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
