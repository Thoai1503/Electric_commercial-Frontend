import { queryOptions } from "@tanstack/react-query";
import {
  getAllProductVariant,
  getProductVariantById,
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
};
