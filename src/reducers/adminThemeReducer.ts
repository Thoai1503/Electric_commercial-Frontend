import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppState {
  sidebarShow: boolean;
  theme: "light" | "dark";
}

const initialState: AppState = {
  sidebarShow: true,
  theme: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    set(state, action: PayloadAction<Partial<AppState>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { set } = appSlice.actions;
export default appSlice.reducer;
