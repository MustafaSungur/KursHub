import { createSlice } from "@reduxjs/toolkit";
import {
  createContentAction,
  deleteContentAction,
  fetchContentById,
  fetchContentUsersByUserId,
  fetchTopContents,
  filterContentsAction,
  updateContentAction,
} from "./contentActions";

interface ContentsState {
  contentLoading: boolean;
  contentError: string | null;
  contentSuccess: boolean;
  contentData: any;
}

const initialState: ContentsState = {
  contentLoading: false,
  contentError: null,
  contentSuccess: false,
  contentData: [],
};

const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {
    resetState: (state) => {
      state.contentLoading = false;
      state.contentError = null;
      state.contentSuccess = false;
      state.contentData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopContents.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(fetchTopContents.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(fetchTopContents.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      })
      .addCase(fetchContentById.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(fetchContentById.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      })
      .addCase(filterContentsAction.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(filterContentsAction.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(filterContentsAction.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      })
      .addCase(fetchContentUsersByUserId.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(fetchContentUsersByUserId.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(fetchContentUsersByUserId.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      })
      .addCase(createContentAction.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(createContentAction.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(createContentAction.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      })
      .addCase(updateContentAction.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(updateContentAction.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(updateContentAction.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      })

      .addCase(deleteContentAction.pending, (state) => {
        state.contentLoading = true;
        state.contentError = null;
        state.contentSuccess = false;
      })
      .addCase(deleteContentAction.fulfilled, (state, action) => {
        state.contentLoading = false;
        state.contentSuccess = true;
        state.contentData = action.payload;
      })
      .addCase(deleteContentAction.rejected, (state, action) => {
        state.contentLoading = false;
        state.contentError = action.payload as string;
        state.contentSuccess = false;
      });
  },
});

// Actions
export const { resetState } = contentsSlice.actions;

// Selectors
export const contentLelectLoading = (state) => state.contents.contentLoading;
export const selectError = (state) => state.contents.contentError;
export const contentSelectSuccess = (state) => state.contents.contentSuccess;
export const selectcontentData = (state) => state.contents.contentData;

// Reducer
export default contentsSlice.reducer;
