import { queryOptions } from "@tanstack/react-query";
import { getAllProductVariant } from "../service/productVariant";

export const productVariantQuery = {
  list: queryOptions({
    queryKey: ["home-product-variant"],
    queryFn: () => getAllProductVariant(),
  }),
};
