import { getAllCategories } from "@/api/category.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCategories = createAsyncThunk(
  "categories/fetchAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllCategories();
      console.log("category-action: ", response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
