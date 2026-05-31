import { catalogRequest } from "../../../api/http";
import type { ProductAttribute } from "../../../type/ProductAttribute";

export const updateProductAttribute = async (
  id: number,
  en: Partial<ProductAttribute>,
): Promise<boolean> => {
  return await catalogRequest
    .put(`/productattribute/${id}`, en, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.log("Error updating product attribute:", error);
      throw error;
    });
};
