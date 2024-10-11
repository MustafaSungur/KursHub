import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Tag",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllTags = async () => {
  try {
    const response = await api.get("/GetAll");
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
