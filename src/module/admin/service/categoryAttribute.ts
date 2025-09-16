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

export const deleteCategoryAttributeService = async (
  id: number
): Promise<boolean> => {
  return await catalogRequest
    .delete(`categoryattribute/${id}`)
    .then((res) => {
      console.log("API: " + res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("Error deleting category attribute:", error);
      throw error; // Propagate the error to be handled by the caller
    });
};

export const createAttributeForCategory = async (
  id: number,
  idList: number[]
): Promise<boolean> => {
  return await catalogRequest
    .post(`categoryattribute/category/${id}`, idList)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("Error creating category attribute:", error);
      throw error; // Propagate the error to be handled by the caller
    });
};
