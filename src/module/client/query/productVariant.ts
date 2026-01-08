import { queryOptions } from "@tanstack/react-query";
import {
  getAllProductVariant,
  getProductVariantById,
  getVariantByProductId,
} from "../service/productVariant";
import type { QueryState } from "../../../type/FilterState";

export const productVariantQuery = {
  list: (queryState?: QueryState) =>
    queryOptions({
      queryKey: ["home-product-variant", queryState || {}],
      queryFn: () => getAllProductVariant(queryState),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: ["product-variant", id],
      queryFn: () => getProductVariantById(id),
    }),
  by_product_id: (id: number) =>
    queryOptions({
      queryKey: ["product-variant-by-product-id", id],
      queryFn: () => getVariantByProductId(id),
    }),
};
