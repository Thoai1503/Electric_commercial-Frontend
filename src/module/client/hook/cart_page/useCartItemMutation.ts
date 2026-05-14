import { useState } from "react";
import type { Cart } from "../../../../type/Cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem, updateCartItemQuantity } from "../../service/cart";

export const useCartItemMutation = (item: Cart) => {
  const [cartItem, setCartItem] = useState<Partial<Cart>>({
    id: item.id,
    quantity: item.quantity,
  });
  const queryClient = useQueryClient();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.preventDefault();
    alert("HandleChange");
    const { name, value } = e.target;
    setCartItem((pre) => ({ ...pre, [name]: value }));

    updateQuantity({ id: cartItem.id!, quantity: parseInt(value) });
  };
  interface MutateProp {
    id: number;
    quantity: number;
  }

  const {
    isPending,
    isSuccess,
    mutate: updateQuantity,
  } = useMutation({
    mutationFn: ({ id, quantity }: MutateProp) =>
      updateCartItemQuantity(id, quantity),
    onSuccess: (data) => {
      console.log(data);
      queryClient.invalidateQueries({ queryKey: ["cart", item.user_id] });
    },
    onError: (error) => {
      alert("Lỗi cập nhật giỏ hàng: " + error.message);
    },
  });

  const { isPending: isRemoving, mutate: removeItem } = useMutation({
    mutationFn: (id: number) => removeCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", item.user_id] });
    },
    onError: (error) => {
      alert("Lỗi xoá sản phẩm khỏi giỏ hàng: " + error.message);
    },
  });

  const handleRemove = () => {
    if (!item.id) return;
    removeItem(item.id);
  };

  return {
    cartItem,
    handleChange,
    isPending,
    isSuccess,
    handleRemove,
    isRemoving,
  };
};
