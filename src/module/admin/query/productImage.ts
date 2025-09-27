import { queryOptions } from "@tanstack/react-query";
import { getImageByVariant } from "../service/productImage";

const productImageQuery = {
  get_by_variant_id: (variant_id: number) =>
    queryOptions({
      queryKey: ["variant_image", variant_id],
      queryFn: () => getImageByVariant(variant_id),
    }),
};

export default productImageQuery;
