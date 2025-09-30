import { catalogRequest } from "../../../api/http";
import type { ProductVariant } from "../../../type/productVariant";

export const getAllProductVariant = async (): Promise<ProductVariant[]> => {
  return await catalogRequest
    .get<ProductVariant[]>("/productvariant")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
