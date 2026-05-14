import { queryOptions } from "@tanstack/react-query";
import { getPublishedProductContent } from "../service/productContent";

export const productContentQuery = {
  published: (productId: number) =>
    queryOptions({
      queryKey: ["product-content-published", productId],
      queryFn: () => getPublishedProductContent(productId),
    }),
};
