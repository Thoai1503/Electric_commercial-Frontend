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
  UserAuthenData, // return type should match the expected payload shape
  void, // argument type
  { state: { authen: AuthState }; rejectValue: string } // add state type
>("auth/refreshToken", async (_, { rejectWithValue }) => {
  try {
    console.log("Refreshing token...");

    // ✅ safely read from Redux state
    const refreshToken = localStorage.getItem("refreshToken") || "";

    const res = await axios.post(
      import.meta.env.VITE_API_URL + "/api/v1/auth/refresh_token",
      { refreshToken },
      { withCredentials: true }
    );

    console.log("Token refreshed:", res.data);
    return res.data as UserAuthenData;
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
    console.log("Builder :", builder);
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken || null;
      state.loading = false;
      state.isAuthenticated = true;
      state.error = null;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      state.accessToken = null;
      state.loading = false;
      state.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      state.error = action.payload || "Refresh failed";
    });
  },
});
export const { setAuthenState, setUser, clearUser } = authenSlice.actions;
export default authenSlice.reducer;
