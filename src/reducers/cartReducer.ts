import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type { Cart } from "../type/Cart";
import { addToUserCart } from "../module/client/service/cart";

function loadCartFromLocalStorage(): Cart[] {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      return JSON.parse(stored) as Cart[];
    }
  } catch (e) {
    console.error("Invalid cart data in localStorage", e);
  }
  return [];
}

function saveCartToLocalStorage(cart: Partial<Cart>[]) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart", e);
  }
}
export const addToCartAsync = createAsyncThunk<
  { item: Cart; isAuthenticated: boolean },
  Cart,
  { rejectValue: string }
>("cart/addToCartAsync", async (item, { rejectWithValue }) => {
  try {
    let ok = false;
    const isAuthenticated = item.user_id != 0;
    // Gọi API check số lượng trước
    if (!isAuthenticated) {
      ok = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 700)
      );
      console.log("isAuthen:" + isAuthenticated);
    } else {
      ok = (await addToUserCart(item)) != 0;
      console.log("isAuthen else:" + ok);
    }

    if (!ok) {
      return rejectWithValue("Sản phẩm đã hết hàng");
    }
    return { item, isAuthenticated }; // trả về item để reducer xử lý
  } catch {
    return rejectWithValue("Không thể kiểm tra tồn kho");
  }
});

export const changeItemQuantityAsync = createAsyncThunk<
  { variant_id: number; quantity: number },
  any,
  { rejectValue: string }
>(
  "cart/changeItemQuantityAsync",
  async ({ variant_id, quantity }, { rejectWithValue }) => {
    try {
      // Gọi API check số lượng trước
      const ok = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 700)
      );

      if (!ok) {
        return rejectWithValue("Sản phẩm đã hết hàng");
      }
      return {
        variant_id,
        quantity,
      };
    } catch {
      return rejectWithValue("Không thể kiểm tra tồn kho");
    }
  }
);

interface CartState {
  items: Cart[];
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Cart>) {
      alert("Added to cart");

      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.variant_id === item.variant_id
      );

      // call api check stock (bạn có thể handle async ở middleware/thunk)
      if (existingItem) {
        existingItem.quantity = (existingItem.quantity ?? 0) + 1;
      } else {
        item.quantity = item.quantity ?? 1;

        state.items.push(item);
      }

      saveCartToLocalStorage(state.items);
    },

    removeFromCart(state, action: PayloadAction<string | number>) {
      const index = state.items.findIndex((i) => i.id === action.payload);
      if (index !== -1) {
        state.items.splice(index, 1);
        saveCartToLocalStorage(state.items);
      }
    },

    clearCart() {
      saveCartToLocalStorage([]);
      return { items: [], loading: false, error: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false;

        // Only update local cart for guest users
        if (!action.payload.isAuthenticated) {
          const item = action.payload.item;
          const existingItem = state.items.find(
            (i) => i.variant_id === item.variant_id
          );

          if (existingItem) {
            existingItem.quantity = (existingItem.quantity ?? 0) + 1;
          } else {
            item.quantity = item.quantity ?? 1;
            state.items.push(item);
          }

          saveCartToLocalStorage(state.items);
        } else {
          state.loading = false;
        }
        // For authenticated users, cart is managed server-side
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể thêm sản phẩm";
      });

    builder
      .addCase(changeItemQuantityAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(changeItemQuantityAsync.fulfilled, (state, action) => {
        state.loading = false;
        const { variant_id, quantity } = action.payload;
        const existingItem = state.items.find(
          (i) => i.variant_id === variant_id
        );
        if (existingItem) {
          existingItem.quantity = quantity;
          saveCartToLocalStorage(state.items);
        }
      })
      .addCase(changeItemQuantityAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể cập nhật số lượng";
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
