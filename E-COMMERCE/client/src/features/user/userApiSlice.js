import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all permission
export const getAllPermission = createAsyncThunk(
  "user/getAllPermission",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/permission",
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
// get all roles
export const getAllRoles = createAsyncThunk("user/getAllRoles", async () => {
  try {
    const response = await axios.get("http://localhost:5050/api/v1/role", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// create permission
export const createPermission = createAsyncThunk(
  "user/createPermission",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/permission",
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
// delete permission
export const deletePermission = createAsyncThunk(
  "user/deletePermission",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/permission/${id}`,

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
// delete permission
export const deleteRole = createAsyncThunk("user/deleteRole", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/role/${id}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// update Permission Status Data
export const updatePermissionStatusData = createAsyncThunk(
  "user/updatePermissionStatusData",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/permission/${id}`,
        { status },
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
// update Role Status Data
export const updateRoleStatusData = createAsyncThunk(
  "user/updateRoleStatusData",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/role/${id}`,
        { status },
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

// create role
export const createRole = createAsyncThunk("user/createRole", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/role",
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
// update role
export const updateRole = createAsyncThunk("user/updateRole", async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:5050/api/v1/role/${data.id}`,
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
// create user
export const createUser = createAsyncThunk("user/createUser", async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5050/api/v1/user",
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
// get all users
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5050/api/v1/user",

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// delete user
export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/user/${id}`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// Update User Status Data
export const updateUserStatusData = createAsyncThunk(
  "user/updateUserStatusData",
  async ({ id, status }) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/user/${id}`,
        { status },
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
export const updateUser = createAsyncThunk(
  "user/updateUserUpdate",
  async (data) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/user/${data.id}`,
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
