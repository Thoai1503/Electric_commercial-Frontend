import { queryOptions } from "@tanstack/react-query";
import { getAllProduct } from "../service/product";

const productQuery = {
  list: queryOptions({
    queryKey: ["all-products"],
    queryFn: () => getAllProduct(),
  }),
};
export default productQuery;
