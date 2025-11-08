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
): Promise<Partial<CategoryAttribute>> => {
  console.log(JSON.stringify(data));
  console.log("Updating category attribute with data:", data);
  alert(
    JSON.stringify({
      id: data.id,
      category_id: data.category_id,
      attribute_id: data.attribute_id,
      is_filterable: data.is_filterable,
      is_required: data.is_required,
      is_variant_level: data.is_variant_level,
    })
  );
  return await catalogRequest

    .put(`/categoryattribute/${id}`, {
      id: data.id,
      category_id: data.category_id,
      attribute_id: data.attribute_id,
      is_filterable: data.is_filterable,
      is_required: data.is_required,
      is_variant_level: data.is_variant_level,
    })
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
    .delete(`/categoryattribute/${id}`)
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
    .post(`/categoryattribute/category/${id}`, idList)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("Error creating category attribute:", error);
      throw error; // Propagate the error to be handled by the caller
    });
};

export const getCategoryAttributesByCategory = async (
  category_id: string
): Promise<CategoryAttribute[]> => {
  return await catalogRequest
    .get(`/categoryattribute/category/${category_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching attributes by category ID:", error);
      throw error; // Propagate the error to be handled by the caller
    });
};
