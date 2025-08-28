import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { AuthState, UserAuthenData } from "../type/AuthState";

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authenSlice = createSlice({
  name: "authen",
  initialState,
  reducers: {
    setAuthenState(state, action: PayloadAction<UserAuthenData>) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
});
export const { setAuthenState } = authenSlice.actions;
export default authenSlice.reducer;
