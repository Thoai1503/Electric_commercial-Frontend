import { queryOptions } from "@tanstack/react-query";
import { getAllProduct, getProductById } from "../service/product";

const productQuery = {
  list: queryOptions({
    queryKey: ["all-products"],
    queryFn: () => getAllProduct(),
  }),
  detail: (id: number) =>
    queryOptions({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
    }),
};

export default productQuery;
