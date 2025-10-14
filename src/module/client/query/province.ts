import { queryOptions } from "@tanstack/react-query";
import { getAllProvince } from "../service/province";

export const provinceQuery = {
  list: queryOptions({
    queryKey: ["province"],
    queryFn: () => getAllProvince(),
  }),
};
