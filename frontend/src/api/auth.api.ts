import axios, { AxiosError } from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "/Auth",
  headers: {
    "Content-Type": "application/json",
  },
});

// Login User
export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<unknown> => {
  try {
    console.log("login-req", email, password);
    const response = await api.post("/Login", { email, password });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw axiosError.response?.data?.message || axiosError.message;
  }
};
