import { createRating } from "@/api/rating";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createRatingAction = createAsyncThunk(
  "rating/createRating",
  async ({ contentId, userId, rating }: any, { rejectWithValue }) => {
    try {
      const response = await createRating({ contentId, userId, rating });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
