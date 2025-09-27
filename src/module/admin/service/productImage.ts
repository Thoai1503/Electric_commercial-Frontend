import { catalogRequest } from "../../../api/http";
import type { ProductImage } from "../../../type/ProductImage";

export const getImageByVariant = async (
  variant_id: number
): Promise<ProductImage[]> => {
  return await catalogRequest
    .get<ProductImage[]>(`/productimage/variant/${variant_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteImage = async (id: number): Promise<boolean> => {
  return await catalogRequest
    .delete<boolean>(`/productimage/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
