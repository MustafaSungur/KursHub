import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTags } from "./tagAction";

interface ContentsState {
  tagLoading: boolean;
  tagError: string | null;
  tagSuccess: boolean;
  tagData: any;
}

const initialState: ContentsState = {
  tagLoading: false,
  tagError: null,
  tagSuccess: false,
  tagData: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.tagLoading = true;
        state.tagError = null;
        state.tagSuccess = false;
      })
      .addCase(fetchAllTags.fulfilled, (state, action) => {
        state.tagLoading = false;
        state.tagSuccess = true;
        state.tagData = action.payload;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.tagLoading = false;
        state.tagError = action.payload as string;
        state.tagSuccess = false;
      });
  },
});

export default contentsSlice.reducer;
