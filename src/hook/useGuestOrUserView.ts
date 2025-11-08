import { useQuery } from "@tanstack/react-query";
import type { UserDataRespone } from "../type/User";
import cartQuery from "../module/client/query/cart";
import type { Cart } from "../type/Cart";
//
import type { ProductVariant } from "../type/productVariant";
import { useMemo } from "react";

export const useGuestOrUserView = (
  user_id: number,
  list: ProductVariant[] | undefined
) => {
  const { data: userCart, isPending } = useQuery(
    cartQuery.getByUser(user_id || 0)
  );
  const user = ((): Partial<UserDataRespone> => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();
  const guestCart: Cart[] = ((): Cart[] => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  })();

  const effectiveCart: Cart[] = (user?.id ? userCart : guestCart) || [];

  const product = useMemo(
    () =>
      list?.map((item: any) => {
        const cartItem = effectiveCart.find((c) => c.variant_id === item.id);
        if (!cartItem) {
          return { ...item, inCart: false, cart: { id: 0, quantity: 0 } };
        }
        return {
          ...item,
          inCart: true,
          cart: { id: cartItem.id, quantity: cartItem.quantity },
        };
      }),
    [effectiveCart, list]
  );
  return {
    product,
    isPending,
  };
};
