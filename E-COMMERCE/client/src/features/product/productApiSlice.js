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
export const updatedProductBrand = createAsyncThunk(
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

// product brand updated
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

// get all product tag
export const getAllTags = createAsyncThunk("user/getAllTags", async () => {
  try {
    const response = await axios.get(
      `http://localhost:5050/api/v1/product/tag/getAllTags`,

      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// product tag create
export const createTag = createAsyncThunk("user/createTag", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/product/tag`,
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

// product tag delete
export const deleteTag = createAsyncThunk("user/deleteTag", async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:5050/api/v1/product/tag/${id}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});
// product tag updated
export const updatedTag = createAsyncThunk(
  "user/updatedTag",
  async ({ name, id }) => {
    try {
      const response = await axios.patch(
        `http://localhost:5050/api/v1/product/tag/${id}`,
        { name },
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

// product tag updated
export const updatedStatusTag = createAsyncThunk(
  "user/updatedStatusTag",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/product/tag/status-updated/${id}`,
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
// product tag deleted
export const deleteTags = createAsyncThunk("user/deleteTags", async (data) => {
  try {
    const response = await axios.post(
      `http://localhost:5050/api/v1/product/tag/deleteTags`,
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

// get all categories
export const getAllCategories = createAsyncThunk(
  "user/getAllCategories",
  async () => {
    try {
      const response = await axios.get(
        `http://localhost:5050/api/v1/product/category/getAllCategory`,
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

// create product category
export const createProductCategory = createAsyncThunk(
  "user/createProductCategory",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/product/category`,
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
// product tag updated
export const updatedProductCategory = createAsyncThunk(
  "user/updatedProductCategory",
  async ({ data, id }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/product/category/${id}`,
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
/***
 * Update status product category
 */
export const updateStatusProductCategory = createAsyncThunk(
  "user/updateStatusProductCategory",
  async ({ id, status }) => {
    try {
      const response = await axios.put(
        `http://localhost:5050/api/v1/product/category/statusUpdate/${id}`,
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
/***
 *  delete product category
 */
export const deleteProductCategory = createAsyncThunk(
  "user/deleteProductCategory",
  async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/v1/product/category/${id}`,
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
 * Delete Categories
 */
export const deleteCategories = createAsyncThunk(
  "user/deleteCategories",
  async (data) => {
    try {
      const response = await axios.post(
        `http://localhost:5050/api/v1/product/category/deleteCategories`,
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
