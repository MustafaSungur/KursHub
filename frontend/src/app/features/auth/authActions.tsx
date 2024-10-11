import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authApi from "../../../api/auth.api";
import { AxiosError } from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      return await authApi.loginUser({ email, password });
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(
        axiosError.response?.data?.message || axiosError.message
      );
    }
  }
);
