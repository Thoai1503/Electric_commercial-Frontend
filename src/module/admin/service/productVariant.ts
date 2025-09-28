import { catalogRequest, catalogRequestTesting } from "../../../api/http";
import type { ProductVariant } from "../../../type/productVariant";

export const addProductVariant = async (
  en: Partial<ProductVariant>
): Promise<boolean> => {
  return await catalogRequest
    .post("/productvariant", en)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getVariantByProductId = async (
  id: number
): Promise<Partial<ProductVariant>[]> => {
  return await catalogRequest
    .get(`/productvariant/product/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteProductVariant = async (id: number): Promise<boolean> => {
  return await catalogRequest
    .delete(`/productvariant/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const updateProductVariant = async (
  en: Partial<ProductVariant>
): Promise<boolean> => {
  return await catalogRequestTesting
    .post(`/api/productvariant/update`, en)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
