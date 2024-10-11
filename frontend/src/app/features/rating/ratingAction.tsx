import { createRating } from "@/api/rating";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createRatingAction = createAsyncThunk(
  "rating/createRating",
  async (ratingRequestDto, { rejectWithValue }) => {
    try {
      const response = await createRating(ratingRequestDto);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
