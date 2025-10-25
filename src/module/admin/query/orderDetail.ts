import { queryOptions } from "@tanstack/react-query";

import { getByOrderId } from "../service/orderDetail";

export const orderDetailQuery = {
  get_by_order_id: (order_id: number) =>
    queryOptions({
      queryKey: ["order_detail", order_id],
      queryFn: () => getByOrderId(order_id),
    }),
};
