import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "@/api/user.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await getUserById(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUserAction = createAsyncThunk(
  "user/createUser",
  async ({ user, imageFile }: any, { rejectWithValue }) => {
    try {
      console.log("userAction-req: ", user, imageFile);
      const response = await createUser(user, imageFile);
      console.log("userAction-res: ", response);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUser",
  async ({ id, updatedUser, imageFile }: any, { rejectWithValue }) => {
    try {
      console.log("Action Data - ID:", id);
      console.log("Action Data - FormData:", updatedUser);

      const response = await updateUser(id, updatedUser, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUserAction = createAsyncThunk(
  "user/deleteUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteUser(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
