import { queryOptions } from "@tanstack/react-query";
import { getVariantByProductId } from "../service/productVariant";

const productVariantQuery = {
  detail_by_product_id: (product_id: number) =>
    queryOptions({
      queryKey: ["variant_by_product_id", product_id],
      queryFn: () => getVariantByProductId(product_id),
    }),
};
export default productVariantQuery;
