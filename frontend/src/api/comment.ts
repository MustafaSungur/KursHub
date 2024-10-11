import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Comment",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createComment = async (comment: any) => {
  try {
    const response = await api.post("/create", comment); // Endpoint'i kontrol edin ve güncelleyin
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateComment = async (id: number, comment: any) => {
  try {
    const response = await api.put(`/update/${id}`, comment); // Endpoint'i kontrol edin ve güncelleyin
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteComment = async (id: number) => {
  try {
    const response = await api.delete(`/delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
