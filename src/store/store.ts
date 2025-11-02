import { configureStore } from "@reduxjs/toolkit";
import appSlice from "../reducers/adminThemeReducer";
import authenSlice from "../reducers/authenReducer";
import cartSlice from "../reducers/cartReducer";

import filterProductSlice from "../reducers/filterReducer";

export const store = configureStore({
  reducer: {
    app: appSlice,
    authen: authenSlice,
    cart: cartSlice,
    filterProduct: filterProductSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
