import { createSlice } from "@reduxjs/toolkit";
import { createRatingAction } from "./ratingAction";

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
      .addCase(createRatingAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createRatingAction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(createRatingAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export default contentsSlice.reducer;
