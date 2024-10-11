import { createComment, updateComment } from "@/api/comment";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCommentAction = createAsyncThunk(
  "comment/createComment",
  async (comment, { rejectWithValue }) => {
    try {
      const response = await createComment(comment);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCommentAction = createAsyncThunk(
  "comment/updateComment",
  async ({ id, comment }: any, { rejectWithValue }) => {
    try {
      const response = await updateComment(id, comment);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
