import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../reducers/adminThemeReducer";
import authenSlice from "../reducers/authenReducer";

export const store = configureStore({
  reducer: {
    app: appSlice,
    authen: authenSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
