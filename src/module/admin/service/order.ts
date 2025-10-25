import { Request } from "../../../api/http";
import type { Order } from "../../../type/Order";

export const getAllOrder = async (): Promise<Order[]> => {
  return await Request.get("/api/v1/order")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
