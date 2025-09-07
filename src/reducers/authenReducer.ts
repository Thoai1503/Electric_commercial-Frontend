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
};

export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
  console.log("Refreshing token...");
  const res = await axios.post("/refresh_token", {}, { withCredentials: true });
  return res.data.accessToken as string;
});

const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setAuthenState(state, action: PayloadAction<UserAuthenData>) {
      state.user = action.payload;
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
      state.user = state.user
        ? { ...state.user, accessToken: action.payload }
        : null;
    });
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshToken.rejected, (state) => {
      state.accessToken = null;
      state.loading = false;
    });
  },
});
export const { setAuthenState, setUser, clearUser } = authenSlice.actions;
export default authenSlice.reducer;
