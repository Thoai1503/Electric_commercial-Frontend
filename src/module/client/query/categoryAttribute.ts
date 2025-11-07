import { queryOptions } from "@tanstack/react-query";

import { getCategoryAttributesByCategory } from "../../admin/service/categoryAttribute";

export const categoryAttributeQuery = {
  category_slug: (category: string) =>
    queryOptions({
      queryKey: ["category-attribute", category],
      queryFn: () => getCategoryAttributesByCategory(category),
    }),
};
