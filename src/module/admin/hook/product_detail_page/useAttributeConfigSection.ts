import { useQueryClient } from "@tanstack/react-query";

import type { Product } from "../../../../type/Product";
import type { CategoryAttribute } from "../../../../type/CategoryAttribute";

export const useAttributeConfigSection = (id: number) => {
  const queryClient = useQueryClient();

  const product = queryClient.getQueryData(["product", id]) as Product;

  const productAttribute = product?.category.category_attributes.filter(
    (item) => item.is_variant_level == false
  ) as CategoryAttribute[];

  return { product, productAttribute };
};
