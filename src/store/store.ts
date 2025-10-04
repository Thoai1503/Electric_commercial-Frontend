import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../reducers/adminThemeReducer";
import authenSlice from "../reducers/authenReducer";
import cartSlice from "../reducers/cartReducer";

export const store = configureStore({
  reducer: {
    app: appSlice,
    authen: authenSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
