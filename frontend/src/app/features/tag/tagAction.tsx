import { getAllTags } from "@/api/tag.api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllTags = createAsyncThunk(
  "tags/fetchAllTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTags();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
