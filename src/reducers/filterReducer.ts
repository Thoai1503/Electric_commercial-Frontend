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
    filters?: Record<string, (string | number)[]>;
  };
}
interface FetchProductVariantParams {
  skip: number;
  take: number;
  order?: string;
  sortBy?: string;
  title?: string;
  category?: string;
  filters?: Record<string, (string | number)[]>;
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
      filters = {},
    }: FetchProductVariantParams,
    { dispatch }
  ) => {
    dispatch(setProgress(0));

    const progressInterval = setInterval(() => {
      dispatch(incrementProgress(10));
    }, 200);
    const filterQuery = Object.entries(filters)
      .map(([key, values]) => {
        if (!values || (Array.isArray(values) && values.length === 0))
          return null;
        return `${encodeURIComponent(key)}=${encodeURIComponent(values.join(","))}`;
      })

      .filter(Boolean)
      .join("&");
    console.log("filterQuery", filterQuery);

    const response = await catalogRequest.get<ProductVariant[]>(
      `/api/productvariant?skip=${skip}&take=${take}&sortBy=${sortBy}&order=${order}&category=${category}${
        filterQuery ? `&${filterQuery}` : ""
      }`
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
        filters,
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
      state.filter_state = { ...state.filter_state, ...action.payload };
    },

    toggleAttributeValue: (
      state,
      action: { payload: { key: string; value: string | number } }
    ) => {
      const { key, value } = action.payload;
      const currentValues = state.filter_state.filters?.[key] || [];
      const exists = currentValues.includes(value);

      const newValues = exists
        ? currentValues.filter((v) => v !== value) // bỏ tick
        : [...currentValues, value]; // tick thêm

      state.filter_state.filters = {
        ...state.filter_state.filters,
        [key]: newValues,
      };
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
