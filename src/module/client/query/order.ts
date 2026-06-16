import { queryOptions } from "@tanstack/react-query";
import { getOrderById, getOrderByUserId } from "../service/order";

export const orderQuery = {
  get_by_user_id: (user_id: number) =>
    queryOptions({
      queryKey: ["order_by_user", user_id],
      queryFn: () => getOrderByUserId(user_id),
    }),
  get_by_id: (id: number) =>
    queryOptions({
      queryKey: ["order_by_id", id],
      queryFn: () => getOrderById(id),
    }),
};
