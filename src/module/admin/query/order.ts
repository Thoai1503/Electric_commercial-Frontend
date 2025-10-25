import { queryOptions } from "@tanstack/react-query";
import { getAllOrder } from "../service/order";

export const orderQuery = {
  list: queryOptions({
    queryKey: ["order"],
    queryFn: () => getAllOrder(),
  }),
};
