import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/ApplicationUser",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/GetUserById/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const createUser = async (user: any, imageFile: File) => {
  const formData = new FormData();
  formData.append("user.Email", user.Email);
  formData.append("user.FirstName", user.FirstName);
  formData.append("user.LastName", user.LastName);
  formData.append("user.birthdate", user.birthdate);
  formData.append("user.password", user.password);
  formData.append("user.confirmPassword", user.confirmPassword);
  formData.append("user.Image", user.Image || "");
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }
  try {
    const response = await api.post("/Create", formData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const updateUser = async (
  id: string,
  updatedUser: any,
  imageFile: File
) => {
  const formData = new FormData();
  formData.append("updatedUser.FirstName", updatedUser.FirstName);
  formData.append("updatedUser.LastName", updatedUser.LastName);
  formData.append("updatedUser.Image", updatedUser.Image || "");

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    const response = await api.put(`/Update/${id}`, formData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/Delete/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};
