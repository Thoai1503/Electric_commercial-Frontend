import { Request } from "../../../api/http";

import type { OrderDetail } from "../../../type/OrderDetail";

export const getByOrderId = async (
  order_id: number
): Promise<OrderDetail[]> => {
  return await Request.get(`/api/v1/order-detail/order/${order_id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
