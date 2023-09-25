import { createSlice } from "@reduxjs/toolkit";
import {
  ChangePasswordReset,
  CheckPaswordCode,
  createUser,
  forgotPassword,
  getLoginUser,
  logOutUser,
  loginUser,
  profilePasswordChange,
  profilePhotoUpdate,
  profileUpdate,
} from "./authApiSlice";

// create auth slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    message: null,
    error: null,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
    setLogout: (state) => {
      state.message = null;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.message = action.payload.message;
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = null;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(CheckPaswordCode.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(CheckPaswordCode.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(ChangePasswordReset.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(ChangePasswordReset.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(profilePasswordChange.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(profilePasswordChange.fulfilled, (state, action) => {
        state.message = action.payload.message;
      })
      .addCase(profileUpdate.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(profileUpdate.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
      })
      .addCase(profilePhotoUpdate.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.message = action.payload.message;
      });
  },
});

// selectors
export const getAuthData = (state) => state.auth;
// actions
export const { setMessageEmpty, setLogout } = authSlice.actions;
// export default

export default authSlice.reducer;
