import { catalogRequest } from "../../../api/http";
import type { ProductVariant } from "../../../type/productVariant";

export const getAllProductVariant = async (): Promise<ProductVariant[]> => {
  return await catalogRequest
    .get("/productvariant")
    .then((res) => res.data.data)
    .catch((error) => {
      throw error;
    });
};
