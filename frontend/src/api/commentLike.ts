import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/CommentLike",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCommentLike = async (commentLike: any) => {
  try {
    const response = await api.post("/Create", commentLike);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteCommentLike = async (id: number) => {
  try {
    const response = await api.delete(`/comments/like/${id}`); // Endpoint'i kontrol edin ve güncelleyin
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
