import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories } from "./categoryAction";

interface ContentsState {
  categoryLoading: boolean;
  categoryError: string | null;
  categorySuccess: boolean;
  categoryData: any;
}

const initialState: ContentsState = {
  categoryLoading: false,
  categoryError: null,
  categorySuccess: false,
  categoryData: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.categoryLoading = true;
        state.categoryError = null;
        state.categorySuccess = false;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categoryLoading = false;
        state.categorySuccess = true;
        state.categoryData = action.payload;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.categoryLoading = false;
        state.categoryError = action.payload as string;
        state.categorySuccess = false;
      });
  },
});

export default contentsSlice.reducer;
