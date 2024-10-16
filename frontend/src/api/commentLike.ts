import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/CommentLike",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCommentLike = async ({ commentId, userId }: any) => {
  try {
    const response = await api.post("/Create", { commentId, userId });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteCommentLike = async (id: number) => {
  try {
    const response = await api.delete(`/Delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
