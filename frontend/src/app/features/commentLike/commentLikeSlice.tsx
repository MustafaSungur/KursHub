import { createSlice } from "@reduxjs/toolkit";
import {
  createCommentLikeAction,
  deleteCommentLikeAction,
} from "./commentLikeAction";

interface ContentsState {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: any;
}

const initialState: ContentsState = {
  loading: false,
  error: null,
  success: false,
  data: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentLikeAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCommentLikeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createCommentLikeAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    builder
      .addCase(deleteCommentLikeAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteCommentLikeAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(deleteCommentLikeAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default contentsSlice.reducer;
