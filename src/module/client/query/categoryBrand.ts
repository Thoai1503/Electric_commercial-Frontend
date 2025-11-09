import { queryOptions } from "@tanstack/react-query";
import { getByCategory } from "../service/categoryBrand";

export const categoryBrandQuery = {
  category_slug: (category: string) =>
    queryOptions({
      queryKey: ["category-brand-by-category", category],
      queryFn: () => getByCategory(category),
    }),
};
