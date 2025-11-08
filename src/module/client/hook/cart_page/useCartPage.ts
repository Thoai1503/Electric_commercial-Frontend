import { useQuery } from "@tanstack/react-query";
import cartQuery from "../../query/cart";
import { changeItemQuantityAsync } from "../../../../reducers/cartReducer";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../store/store";

const useCartPage = (user_id: number) => {
  const { data: CartList, isPending } = useQuery(cartQuery.getByUser(user_id));

  const list = CartList?.map((c) => c.variant);
  const dispatch = useDispatch<AppDispatch>();

  const totalPrice = CartList?.reduce(
    (sum, item) => sum + item?.variant?.price! * item.quantity!,
    0
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, id } = e.target;

    console.log("value", value, id);

    dispatch(
      changeItemQuantityAsync({
        variant_id: Number(id),
        quantity: Number(value),
      })
    );
  };

  return { CartList, isPending, list, totalPrice, handleChange };
};
export default useCartPage;
