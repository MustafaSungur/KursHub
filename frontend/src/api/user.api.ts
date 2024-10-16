import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/ApplicationUser",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || error.message;
  }
};

export const createUser = async (user: any, imageFile: File) => {
  const formData = new FormData();
  formData.append("Email", user.email); // Match the exact field names expected by the backend
  formData.append("FirstName", user.firstName);
  formData.append("LastName", user.lastName);
  formData.append("birthdate", user.birthdate);
  formData.append("password", user.password);
  formData.append("confirmPassword", user.confirmPassword);
  formData.append("Image", user.image || ""); // Optional field handling
  if (imageFile) {
    formData.append("imageFile", imageFile);
  }

  try {
    const response = await api.post("/Create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("user api-res:", response.data);
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
  console.log("Incoming Data:", id, updatedUser, imageFile);

  const formData = new FormData();

  formData.append("FirstName", updatedUser.firstName || "");
  formData.append("LastName", updatedUser.lastName || "");
  formData.append("Email", updatedUser.email || "");
  formData.append("Password", updatedUser.password || "");
  formData.append("ConfirmPassword", updatedUser.confirmPassword || "");
  formData.append("BirthDate", updatedUser.birthDate || "");
  formData.append("Gender", updatedUser.gender || "");
  formData.append("Image", updatedUser.image || "");

  if (imageFile) {
    formData.append("imageFile", imageFile);
  }
  console.log("formdata:", id, formData, imageFile);

  try {
    const response = await api.put(`/Update/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
