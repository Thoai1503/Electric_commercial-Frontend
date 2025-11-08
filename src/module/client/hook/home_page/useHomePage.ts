import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import cartQuery from "../../query/cart";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../store/store";
import { productVariantQuery } from "../../query/productVariant";
import type { Cart } from "../../../../type/Cart";
import { addToCartAsync } from "../../../../reducers/cartReducer";
import { useCallback } from "react";
import { updateCartItemQuantity } from "../../service/cart";

export const useHomePage = (user_id: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { data: userCart, isPending } = useQuery(
    cartQuery.getByUser(user_id || 0)
  );
  const { data, isPending: isPendingList } = useQuery(productVariantQuery.list);
  const loading = useSelector((state: RootState) => state.cart.loading);

  const addToCartForAuthenticatedUser = useCallback(
    async (cart: Cart) => {
      try {
        const result = await dispatch(addToCartAsync(cart)).unwrap();

        console.log("Result: " + result);
        queryClient.invalidateQueries(cartQuery.getByUser(cart.user_id));

        return { success: true };
      } catch (err) {
        // Handles rejection from the thunk
        alert(typeof err === "string" ? err : "Không thể thêm sản phẩm");
        return { success: false, error: err };
      }
    },
    [dispatch, queryClient, user_id]
  );
  interface MutateProp {
    id: number;
    quantity: number;
  }
  const {
    isPending: isPendingUpdateCart,

    mutate: updateQuantity,
  } = useMutation({
    mutationFn: ({ id, quantity }: MutateProp) =>
      updateCartItemQuantity(id, quantity),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["cart", user_id] });
    },
    onError: (error) => {
      alert("Lỗi cập nhật giỏ hàng: " + error.message);
    },
  });
  const handleClickChange = (id: number, quantity: number) => {
    updateQuantity({ id, quantity });
  };

  return {
    addToCartForAuthenticatedUser,
    loading,
    userCart,
    isPending,
    handleClickChange,
    isPendingUpdateCart,
    isPendingList,
    data,
  };
};
