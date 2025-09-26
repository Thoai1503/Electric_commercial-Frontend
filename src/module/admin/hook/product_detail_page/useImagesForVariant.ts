import { useQuery } from "@tanstack/react-query";

import productVariantQuery from "../../query/productVariant";

export const useImagesForVariant = (id: number) => {
  const { data: variants } = useQuery(
    productVariantQuery.detail_by_product_id(id)
  );
  return { variants };
};
