import { useQuery } from "@tanstack/react-query";
import cartQuery from "../../query/cart";

const useCartPage = (user_id: number) => {
  const { data: CartList, isPending } = useQuery(cartQuery.getByUser(user_id));
  const list = CartList?.map((c) => c.variant);
  const totalPrice = CartList?.reduce(
    (sum, item) => sum + item?.variant?.price! * item.quantity!,
    0
  );
  return { CartList, isPending, list, totalPrice };
};
export default useCartPage;
