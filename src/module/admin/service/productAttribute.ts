import { catalogRequestTesting } from "../../../api/http";
import type { ProductAttribute } from "../../../type/ProductAttribute";

export const updateProductAttribute = async (
  id: number,
  en: Partial<ProductAttribute>
): Promise<boolean> => {
  return await catalogRequestTesting
    .put(`/productattribute/${id}`, en)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
