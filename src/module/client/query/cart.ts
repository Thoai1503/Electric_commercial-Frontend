import { queryOptions } from "@tanstack/react-query";
import { getByUserId } from "../service/cart";

const cartQuery = {
  getByUser: (user_id: number) =>
    queryOptions({
      queryKey: ["cart", user_id],
      queryFn: async () => getByUserId(user_id),
    }),
};

export default cartQuery;
