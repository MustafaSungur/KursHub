import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authActions";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const cookie = new Cookies(null, { path: "/" });

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

// Redux Toolkit'in createSlice fonksiyonu ile bir Auth oluşturuluyor
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkCookie: (state) => {
      const availableToken = cookie.get("token");
      const decoded: any = jwtDecode(availableToken);
      if (availableToken) {
        state.userToken = availableToken;
        state.userInfo = jwtDecode<any>(decoded).data;
      } else {
        state.userToken = null;
        state.userInfo = null;
      }
    },
    resetToken: (state) => {
      state.userToken = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      cookie.remove("token");
    },
  },

  extraReducers: (builder) => {
    // loginUser asenkron eyleminin durumlarına tepki gösteren ek reducer'lar
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }: any) => {
        const decoded: any = jwtDecode(payload.token);
        state.loading = false;
        state.userInfo = decoded.data;
        state.userToken = payload.token;
        state.success = true;

        if (decoded.exp) {
          cookie.set("token", payload.token, {
            expires: new Date(decoded.exp * 1000), // Token expiration time (Unix timestamp)
            secure: true,
            path: "/",
          });
        } else {
          // Eğer exp yoksa, burada farklı bir işlem yapabilirsiniz
          console.warn("Expiration date not found in the token.");
        }
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// authSlice reducer'ını ihraç et
export default authSlice.reducer;
export const { resetToken, checkCookie } = authSlice.actions;
