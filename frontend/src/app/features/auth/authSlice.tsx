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
      console.log("checktoken çalıştı");
      const availableToken = cookie.get("token");

      if (availableToken) {
        const decoded: any = jwtDecode(availableToken);
        console.log("Decoded Token on Cookie Check:", decoded);

        state.userToken = availableToken;
        state.userInfo = decoded;
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
        console.log("Decoded Token Payload:", decoded); // Token payload'u kontrol edin

        state.loading = false;
        state.userInfo = decoded;

        state.userToken = payload.token;
        state.success = true;

        if (decoded.exp) {
          cookie.set("token", payload.token, {
            expires: new Date(decoded.exp * 1000),
            secure: true,
            path: "/",
          });
        } else {
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
