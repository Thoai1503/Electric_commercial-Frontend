import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ProductVariant } from "../type/productVariant";

function loadCartFromLocalStorage(): Partial<ProductVariant>[] {
  try {
    const stored = localStorage.getItem("cart");
    if (stored) {
      return JSON.parse(stored) as Partial<ProductVariant>[];
    }
  } catch (e) {
    console.error("Invalid cart data in localStorage", e);
  }
  return [];
}

function saveCartToLocalStorage(cart: Partial<ProductVariant>[]) {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (e) {
    console.error("Failed to save cart", e);
  }
}
export const addToCartAsync = createAsyncThunk<
  Partial<ProductVariant>,
  Partial<ProductVariant>,
  { rejectValue: string }
>("cart/addToCartAsync", async (item, { rejectWithValue }) => {
  try {
    // Gọi API check số lượng trước
    const ok = await new Promise<boolean>((resolve) =>
      setTimeout(() => resolve(true), 700)
    );

    if (!ok) {
      return rejectWithValue("Sản phẩm đã hết hàng");
    }
    return item; // trả về item để reducer xử lý
  } catch {
    return rejectWithValue("Không thể kiểm tra tồn kho");
  }
});

interface CartState {
  items: Partial<ProductVariant>[];
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
    addToCart(state, action: PayloadAction<Partial<ProductVariant>>) {
      alert("Added to cart");

      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

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
        const item = action.payload;
        const existingItem = state.items.find((i) => i.id === item.id);

        if (existingItem) {
          existingItem.quantity = (existingItem.quantity ?? 0) + 1;
        } else {
          item.quantity = item.quantity ?? 1;
          state.items.push(item);
        }

        saveCartToLocalStorage(state.items);
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Không thể thêm sản phẩm";
      });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
