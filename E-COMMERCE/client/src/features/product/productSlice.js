import { createSlice } from "@reduxjs/toolkit";
import {
  createBrand,
  createProductCategory,
  createTag,
  deleteBrand,
  deleteBrands,
  deleteCategories,
  deleteProductCategory,
  deleteTag,
  deleteTags,
  getAllBrands,
  getAllCategories,
  getAllTags,
  updateStatusProductCategory,
  updatedBrandStatusData,
  updatedProductBrand,
  updatedProductCategory,
  updatedStatusTag,
  updatedTag,
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
      .addCase(updatedProductBrand.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatedProductBrand.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updatedProductBrand.fulfilled, (state, action) => {
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
      })
      .addCase(createTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(createTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.tag = state.tag ?? [];
        state.tag.push(action.payload.tag);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(getAllTags.fulfilled, (state, action) => {
        state.tag = action.payload.tags;
        state.loader = false;
      })
      .addCase(deleteTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTag.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteTag.fulfilled, (state, action) => {
        state.tag = state.tag.filter(
          (data) => data._id != action.payload.tag._id
        );
        state.message = action.payload.message;
      })
      .addCase(updatedTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatedTag.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(updatedTag.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id == action.payload.tag._id)
        ] = action.payload.tag;
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(updatedStatusTag.pending, (state) => {
        state.loader = true;
      })
      .addCase(updatedStatusTag.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updatedStatusTag.fulfilled, (state, action) => {
        state.tag[
          state.tag.findIndex((data) => data._id == action.payload.tag._id)
        ] = action.payload.tag;
        state.message = action.payload.message;
      })
      .addCase(deleteTags.pending, (state) => {
        state.loader = true;
      })
      .addCase(deleteTags.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(deleteTags.fulfilled, (state, action) => {
        state.tag = state.tag.filter(
          (data) => data._id != action.payload.idList[0]
        );
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.category = action.payload.categories;
      })
      .addCase(createProductCategory.pending, (state) => {
        state.loader = true;
      })
      .addCase(createProductCategory.rejected, (state, action) => {
        state.error = action.error.message;
        state.loader = false;
      })
      .addCase(createProductCategory.fulfilled, (state, action) => {
        state.category = state.category ?? [];
        state.category.push(action.payload.category);
        state.message = action.payload.message;
        state.loader = false;
      })
      .addCase(updatedProductCategory.fulfilled, (state, action) => {
        state.category[
          state.category.findIndex(
            (data) => data._id == action.payload.updateCategory._id
          )
        ] = action.payload.updateCategory;
        state.loader = false;
        state.message = action.payload.message;
      })
      .addCase(updateStatusProductCategory.fulfilled, (state, action) => {
        state.category[
          state.category.findIndex(
            (data) => data._id == action.payload.category._id
          )
        ] = action.payload.category;
        state.message = action.payload.message;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (data) => data._id != action.payload.category._id
        );
        state.message = action.payload.message;
      })
      .addCase(deleteCategories.fulfilled, (state, action) => {
        state.category = state.category.filter(
          (data) => data._id != action.payload.idList[0]
        );
        state.message = action.payload.message;
      });
  },
});

// actions
export const { setMessageEmpty } = productSlice.actions;
// export default

export default productSlice.reducer;
