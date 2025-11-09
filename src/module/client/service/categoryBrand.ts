import { catalogRequest } from "../../../api/http";
import type { CategoryBrand } from "../../../type/CategoryBrand";

export const getByCategory = async (
  category: string
): Promise<CategoryBrand[]> => {
  return catalogRequest
    .get<CategoryBrand[]>(`/categorybrand/category/${category}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
