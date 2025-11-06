import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ProductVariant } from "../type/productVariant";

import { catalogRequest } from "../api/http";

interface FilterState {
  variant: ProductVariant[];
  loading: boolean;
  current_length: number;
  progress: number;
  filter_state: {
    title: string;
    sortBy?: string;
    order?: string;
  };
}
interface FetchProductVariantParams {
  skip: number;
  take: number;
  order?: string;
  sortBy?: string;
  title?: string;
  category?: string;
}

export const fetchProductVariant = createAsyncThunk(
  "filter/fetchProductVariant",
  async (
    {
      skip,
      take,
      title,
      order,
      sortBy,
      category = "",
    }: FetchProductVariantParams,
    { dispatch }
  ) => {
    dispatch(setProgress(0));

    const progressInterval = setInterval(() => {
      dispatch(incrementProgress(10));
    }, 200);

    const response = await catalogRequest.get<ProductVariant[]>(
      `/productvariant?skip=${skip}&take=${take}&sortBy=${sortBy}&order=${order}&category=${category}`
    );

    clearInterval(progressInterval);
    dispatch(setProgress(90));
    dispatch(setProgress(100));

    return {
      data: response.data,
      skip,
      filter_state: {
        title,
        sortBy,
        order,
      },
    };
  }
);

const initialState: FilterState = {
  variant: [],
  loading: false,
  current_length: 0,
  progress: 0,
  filter_state: {
    title: "Giá tăng dần",
    sortBy: "price",
    order: "asc",
  },
};

const filterProductSlice = createSlice({
  name: "product-filter",
  initialState,
  reducers: {
    setFilterState: (state, action) => {
      state.filter_state = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = Math.min(action.payload, 100);
    },
    incrementProgress: (state, action) => {
      state.progress += Math.min(state.progress + action.payload, 90);
    },
  },
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
          state.filter_state = {
            ...action.payload.filter_state,
            title:
              action.payload.filter_state.title || state.filter_state.title,
          };
        } else {
          // Otherwise, append new items (load more)
          state.variant = [...state.variant, ...action.payload.data];
          state.filter_state = {
            ...action.payload.filter_state,
            title:
              action.payload.filter_state.title || state.filter_state.title,
          };
        }
        state.current_length = state.variant.length;
      })
      .addCase(fetchProductVariant.rejected, (state) => {
        state.loading = false;
      });
  },
});
export const { setFilterState, setProgress, incrementProgress } =
  filterProductSlice.actions;
export default filterProductSlice.reducer;
