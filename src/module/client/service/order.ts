import { Request } from "../../../api/http";
import type { Order } from "../../../type/Order";

export const getOrderByUserId = async (user_id: number): Promise<Order[]> => {
  return await Request.get(`/api/v1/order/user/${user_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
