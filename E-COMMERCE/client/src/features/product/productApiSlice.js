import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// get all brands
export const getAllBrands = createAsyncThunk(
  "product/getAllBrands",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:5050/api/v1/product/brand",
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
// create brand
export const createBrand = createAsyncThunk(
  "product/createBrand",
  async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/v1/product/brand",
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
// delete brand
export const deleteBrand = createAsyncThunk(
  "product/deleteBrand",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/product/brand/${id}`,
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

// brand status updated
export const updatedBrandStatusData = createAsyncThunk(
  "user/updatedBrandStatusData",
  async ({ id, status }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/product/brand/status/${id}`,
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
// brand updated
export const updatedBrandData = createAsyncThunk(
  "user/updatedBrandData",
  async ({ data, id }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/product/brand/${id}`,
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

// brand updated
export const deleteBrands = createAsyncThunk(
  "user/deleteBrands",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/product/brand/deleteBrands`,
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
