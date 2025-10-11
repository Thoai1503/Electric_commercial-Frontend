import { queryOptions } from "@tanstack/react-query";
import { getByUserId } from "../service/cart";

const cartQuery = {
  getByUser: (user_id: number) =>
    queryOptions({
      queryKey: ["cart", user_id],
      queryFn: async () => getByUserId(user_id),
      staleTime: 5 * 60 * 1000, // 5 minutes

      refetchOnWindowFocus: false,
    }),
};

export default cartQuery;
