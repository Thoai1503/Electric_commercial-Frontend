import { queryOptions } from "@tanstack/react-query";
import { getByUserId } from "../service/useraddress";

export const userAddressQuery = {
  get_by_user_id: (user_id: number) =>
    queryOptions({
      queryKey: ["user_address", user_id],
      queryFn: async () => getByUserId(user_id),
    }),
};
