import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, UserAuthenData } from "../type/AuthState";
import axios from "axios";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: "",
  refreshToken: "",
  loading: false,
  error: null,
};

export const refreshToken = createAsyncThunk<
  string, // return type
  void, // argument type
  { state: { authen: AuthState }; rejectValue: string } // add state type
>("auth/refreshToken", async (_, { rejectWithValue, getState }) => {
  try {
    console.log("Refreshing token...");

    // ✅ safely read from Redux state
    const { refreshToken } = getState().authen;

    const res = await axios.post(
      import.meta.env.VITE_CATOLOG_API + "/api/v1/auth/refresh_token",
      { refreshToken },
      { withCredentials: true }
    );

    console.log("Token refreshed:", res.data);
    return res.data.accessToken as string;
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      console.log("Error refreshing token:", err.response?.data);
      return rejectWithValue(
        err.response?.data?.message || "Failed to refresh token"
      );
    }
    console.log("Unexpected error:", err);
    return rejectWithValue("Unexpected error occurred");
  }
});

const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setAuthenState(state, action: PayloadAction<UserAuthenData>) {
      console.log("Setting authen state:", action.payload);
      state.user = action.payload;
      state.refreshToken = action.payload.refreshToken || null;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("refreshToken", action.payload.refreshToken || "");
    },
    setUser(state, action: PayloadAction<UserAuthenData>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload || null;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;

      state.user = state.user
        ? { ...state.user, accessToken: action.payload }
        : null;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.accessToken = null;
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload || "Refresh failed";
    });
  },
});
export const { setAuthenState, setUser, clearUser } = authenSlice.actions;
export default authenSlice.reducer;
