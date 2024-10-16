import { createSlice } from "@reduxjs/toolkit";
import {
  createCommentLikeAction,
  deleteCommentLikeAction,
} from "./commentLikeAction";

interface ContentsState {
  commentLikeLoading: boolean;
  commentLikeError: string | null;
  commentLikeSuccess: boolean;
  commentLikeData: any;
}

const initialState: ContentsState = {
  commentLikeLoading: false,
  commentLikeError: null,
  commentLikeSuccess: false,
  commentLikeData: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentLikeAction.pending, (state) => {
        state.commentLikeLoading = true;
        state.commentLikeError = null;
        state.commentLikeSuccess = false;
      })
      .addCase(createCommentLikeAction.fulfilled, (state, action) => {
        state.commentLikeLoading = false;
        state.commentLikeSuccess = true;
        state.commentLikeData = action.payload;
      })
      .addCase(createCommentLikeAction.rejected, (state, action) => {
        state.commentLikeLoading = false;
        state.commentLikeError = action.payload as string;
        state.commentLikeSuccess = false;
      });

    builder
      .addCase(deleteCommentLikeAction.pending, (state) => {
        state.commentLikeLoading = true;
        state.commentLikeError = null;
        state.commentLikeSuccess = false;
      })
      .addCase(deleteCommentLikeAction.fulfilled, (state, action) => {
        state.commentLikeLoading = false;
        state.commentLikeSuccess = true;
        state.commentLikeData = action.payload;
      })
      .addCase(deleteCommentLikeAction.rejected, (state, action) => {
        state.commentLikeLoading = false;
        state.commentLikeError = action.payload as string;
        state.commentLikeSuccess = false;
      });
  },
});

export default contentsSlice.reducer;
