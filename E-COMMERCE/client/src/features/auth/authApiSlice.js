import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// register user
export const createUser = createAsyncThunk("auth/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/register",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

/**
 * Login User
 */
export const loginUser = createAsyncThunk("auth/loginUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/login",
      data,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
/**
 * Logout User
 */
export const logOutUser = createAsyncThunk("auth/logOutUser", async () => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/auth/logout",
      " ",
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
/**
 * Get Login User
 */
export const getLoginUser = createAsyncThunk("auth/getLoginUser", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/auth/me", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
/**
 * Forgot password
 */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/send-password-reset-opt",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
/**
 * Forgot password
 */
export const CheckPaswordCode = createAsyncThunk(
  "auth/CheckPaswordCode",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/check-password-reset-otp",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
/**
 * Forgot password
 */
export const ChangePasswordReset = createAsyncThunk(
  "auth/ChangePasswordReset",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/auth/user-password-reset",
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Update User Status Data
export const profilePasswordChange = createAsyncThunk(
  "user/profilePasswordChange",
  async (data) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/auth/cp/${data.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);

// Update User Status Data
export const profileUpdate = createAsyncThunk(
  "user/profileUpdate",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/auth/profile-update/${data.id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
// Update User Status Data
export const profilePhotoUpdate = createAsyncThunk(
  "user/profilePhotoUpdate",
  async ({ data, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/auth/profile-photo-update/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
);
