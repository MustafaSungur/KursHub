import { createSlice } from "@reduxjs/toolkit";
import { createCommentAction, updateCommentAction } from "./commentAction";

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
      .addCase(createCommentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });

    builder
      .addCase(updateCommentAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCommentAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(updateCommentAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default contentsSlice.reducer;
