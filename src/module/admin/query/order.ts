import { queryOptions } from "@tanstack/react-query";
import { getAllOrder } from "../service/order";

export const orderQuery = {
  list: (seacrh: string, page: number) =>
    queryOptions({
      queryKey: ["order", seacrh, page],
      queryFn: () => getAllOrder(seacrh, page),
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 5,
    }),
};
