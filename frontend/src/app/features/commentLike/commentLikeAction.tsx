import { createCommentLike, deleteCommentLike } from "@/api/commentLike";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCommentLikeAction = createAsyncThunk(
  "comment/createCommentLike",
  async ({ commentId, userId }: any, { rejectWithValue }) => {
    try {
      const response = await createCommentLike({ commentId, userId });
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCommentLikeAction = createAsyncThunk(
  "comment/deleteCommentLike",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteCommentLike(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
