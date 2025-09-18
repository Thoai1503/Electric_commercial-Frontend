import { queryOptions } from "@tanstack/react-query";
import { getAllBrand } from "../service/brand";

const brandQueries = {
  list: queryOptions({
    queryKey: ["brand"],
    queryFn: () => getAllBrand(),
  }),
};

export default brandQueries;
