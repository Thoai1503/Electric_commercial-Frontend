import { catalogRequest } from "../../../api/http";
import type { CategoryAttribute } from "../../../type/CategoryAttribute";

export const getCategoryAttributes = async (): Promise<CategoryAttribute[]> => {
  return await catalogRequest
    .get("/categoryattribute")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching category attributes:", error);
      throw error; // Propagate the error to be handled by the caller
    });
};

export const updateCategoryAttributeService = async (
  id: number,
  data: Partial<CategoryAttribute>
): Promise<CategoryAttribute> => {
  console.log("Updating value:", data);
  return await catalogRequest
    .put(`categoryattribute/${id}`, data)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error updating category attribute:", error);
      throw error; // Propagate the error to be handled by the caller
    });
};
