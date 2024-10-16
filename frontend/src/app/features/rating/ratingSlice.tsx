import { createSlice } from "@reduxjs/toolkit";
import { createRatingAction } from "./ratingAction";

interface ContentsState {
  ratingLoading: boolean;
  ratingError: string | null;
  ratingSuccess: boolean;
  ratingData: any;
}

const initialState: ContentsState = {
  ratingLoading: false,
  ratingError: null,
  ratingSuccess: false,
  ratingData: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRatingAction.pending, (state) => {
        state.ratingLoading = true;
        state.ratingError = null;
        state.ratingSuccess = false;
      })
      .addCase(createRatingAction.fulfilled, (state, action) => {
        state.ratingLoading = false;
        state.ratingSuccess = true;
        state.ratingData = action.payload;
      })
      .addCase(createRatingAction.rejected, (state, action) => {
        state.ratingLoading = false;
        state.ratingError = action.payload as string;
        state.ratingSuccess = false;
      });
  },
});

export default contentsSlice.reducer;
