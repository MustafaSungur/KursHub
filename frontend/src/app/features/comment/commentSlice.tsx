import { createSlice } from "@reduxjs/toolkit";
import { createCommentAction, updateCommentAction } from "./commentAction";

interface ContentsState {
  commentLoading: boolean;
  commentError: string | null;
  commentSuccess: boolean;
  commentData: any;
}

const initialState: ContentsState = {
  commentLoading: false,
  commentError: null,
  commentSuccess: false,
  commentData: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCommentAction.pending, (state) => {
        state.commentLoading = true;
        state.commentError = null;
        state.commentSuccess = false;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentSuccess = true;
        state.commentData = action.payload;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = action.payload as string;
        state.commentSuccess = false;
      });

    builder
      .addCase(updateCommentAction.pending, (state) => {
        state.commentLoading = true;
        state.commentError = null;
        state.commentSuccess = false;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentSuccess = true;
        state.commentData = action.payload;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentError = action.payload as string;
        state.commentSuccess = false;
      });
  },
});

export default contentsSlice.reducer;
