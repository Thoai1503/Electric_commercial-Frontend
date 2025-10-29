import { Request } from "../../../api/http";
import type { OrderPaginateResponse } from "../../../type/Order";

export const getAllOrder = async (
  search: string,
  page: number
): Promise<OrderPaginateResponse> => {
  return await Request.get(`/api/v1/order?search=${search}&page=${page}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
