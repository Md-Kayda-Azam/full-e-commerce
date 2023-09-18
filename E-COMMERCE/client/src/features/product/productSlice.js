import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  deleteBrand,
  deleteBrands,
  getAllBrands,
  updatedBrandData,
  updatedBrandStatusData,
} from "./productApiSlice";

// create user slice
const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    brand: null,
    category: null,
    tag: null,
    error: null,
    message: null,
    loader: false,
  },
  reducers: {
    setMessageEmpty: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.brand = state.brand ?? [];
        state.brand.push(action.payload.brand);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllBrands.pending, (state) => {
        state.loader = true;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.brand = action.payload.brands;
        state.loader = false;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (data) => data._id != action.payload.brand._id
        );
        state.message = action.payload.message;
      })
      .addCase(updatedBrandStatusData.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatedBrandStatusData.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id == action.payload.brand._id)
        ] = action.payload.brand;
        state.message = action.payload.message;
      })
      .addCase(updatedBrandData.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatedBrandData.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updatedBrandData.fulfilled, (state, action) => {
        state.brand[
          state.brand.findIndex((data) => data._id == action.payload.brand._id)
        ] = action.payload.brand;
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(deleteBrands.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteBrands.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteBrands.fulfilled, (state, action) => {
        state.brand = state.brand.filter(
          (data) => data._id != action.payload.idList[0]
        );
        state.loader = false;
        state.message = action.payload.message;
      });
  },
});

// actions
export const { setMessageEmpty } = productSlice.actions;
// export default

export default productSlice.reducer;
