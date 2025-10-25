import { useQuery } from "@tanstack/react-query";
import { orderQuery } from "../../query/order";

export const useOrderPage = () => {
  const { data: orderList } = useQuery(orderQuery.list);
  return {
    orderList,
  };
};
