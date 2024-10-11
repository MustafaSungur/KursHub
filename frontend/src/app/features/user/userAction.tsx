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
      const response = await createUser(user, imageFile);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserAction = createAsyncThunk(
  "user/updateUser",
  async ({ id, updatedUserDto, imageFile }: any, { rejectWithValue }) => {
    try {
      const response = await updateUser(id, updatedUserDto, imageFile);
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
