import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Category",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllCategories = async () => {
  try {
    const response = await api.get("/GetAll");
    console.log("api-category: ", response.data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
