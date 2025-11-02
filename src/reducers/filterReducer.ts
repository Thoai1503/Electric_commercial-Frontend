import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductVariant } from "../type/productVariant";

import { catalogRequest } from "../api/http";

interface FilterState {
  variant: ProductVariant[];
  loading: boolean;
  current_length: number;
}
interface FetchProductVariantParams {
  skip: number;
  take: number;
  order?: string;
  sortBy?: string;
}

export const fetchProductVariant = createAsyncThunk(
  "filter/fetchProductVariant",
  async ({ skip, take, order, sortBy }: FetchProductVariantParams) => {
    const response = await catalogRequest.get<ProductVariant[]>(
      `/productvariant?skip=${skip}&take=${take}&sortBy=${sortBy}&order=${order}`
    );
    return { data: response.data, skip };
  }
);

const initialState: FilterState = {
  variant: [],
  loading: false,
  current_length: 0,
};

const filterProductSlice = createSlice({
  name: "product-filter",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductVariant.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductVariant.fulfilled, (state, action) => {
        state.loading = false;
        // If skip is 0, reset the array (new search/filter)
        if (action.payload.skip === 0) {
          state.variant = action.payload.data;
        } else {
          // Otherwise, append new items (load more)
          state.variant = [...state.variant, ...action.payload.data];
        }
        state.current_length = state.variant.length;
      })
      .addCase(fetchProductVariant.rejected, (state) => {
        state.loading = false;
      });
  },
});
//export const {} = filterProductSlice.actions;
export default filterProductSlice.reducer;
