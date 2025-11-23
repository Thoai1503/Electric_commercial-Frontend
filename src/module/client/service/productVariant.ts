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

export const getProductVariantById = async (
  id: number
): Promise<ProductVariant> => {
  return await catalogRequest
    .get(`/productvariant/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
