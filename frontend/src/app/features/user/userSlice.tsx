import { createSlice } from "@reduxjs/toolkit";
import {
  createUserAction,
  deleteUserAction,
  fetchUserById,
  updateUserAction,
} from "./userAction";

interface ContentsState {
  userLoading: boolean;
  userError: string | null;
  userSuccess: boolean;
  userData: any;
}

const initialState: ContentsState = {
  userLoading: false,
  userError: null,
  userSuccess: false,
  userData: [],
};
const contentsSlice = createSlice({
  name: "contents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
        state.userSuccess = false;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userData = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
        state.userSuccess = false;
      });

    builder
      .addCase(createUserAction.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
        state.userSuccess = false;
      })
      .addCase(createUserAction.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userData = action.payload;
      })
      .addCase(createUserAction.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
        state.userSuccess = false;
      });

    builder
      .addCase(updateUserAction.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
        state.userSuccess = false;
      })
      .addCase(updateUserAction.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userData = action.payload;
      })
      .addCase(updateUserAction.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
        state.userSuccess = false;
      });

    builder
      .addCase(deleteUserAction.pending, (state) => {
        state.userLoading = true;
        state.userError = null;
        state.userSuccess = false;
      })
      .addCase(deleteUserAction.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userSuccess = true;
        state.userData = action.payload;
      })
      .addCase(deleteUserAction.rejected, (state, action) => {
        state.userLoading = false;
        state.userError = action.payload as string;
        state.userSuccess = false;
      });
  },
});

export default contentsSlice.reducer;
