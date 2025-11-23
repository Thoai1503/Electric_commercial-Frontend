import { queryOptions } from "@tanstack/react-query";
import {
  getAllProductVariant,
  getProductVariantById,
} from "../service/productVariant";

export const productVariantQuery = {
  list: queryOptions({
    queryKey: ["home-product-variant"],
    queryFn: () => getAllProductVariant(),
  }),
  detail: (id: number) =>
    queryOptions({
      queryKey: ["product-variant", id],
      queryFn: () => getProductVariantById(id),
    }),
};
