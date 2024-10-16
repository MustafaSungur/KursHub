import {
  createComment,
  deleteComment,
  getCommentByContentId,
  updateComment,
} from "@/api/comment";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const createCommentAction = createAsyncThunk(
  "comment/createComment",
  async ({ contentId, userId, description }: any, { rejectWithValue }) => {
    try {
      const response = await createComment({ contentId, userId, description });
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

export const deleteCommentAction = createAsyncThunk(
  "comment/updateComment",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await deleteComment(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCommentByContentId = createAsyncThunk(
  "comment/updateComment",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await getCommentByContentId(id);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
