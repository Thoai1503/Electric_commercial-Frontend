import { axiosInstance, catalogRequest } from "../../../api/http";
import type { Category, CategoryReponse } from "../../../type/Category";
import { categoryTreeMapping } from "../../../utils/categoryTreeMapping";

export const addCategoryService = async (category: Category) => {
  try {
    const { data } = await axiosInstance.post<boolean>(
      "/api/v1/category",
      category
    );
    if (!data) {
      return data;
    }
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Details Error:", error.message);
    } else {
      console.error("Details Null:", error);
    }
    throw new Error("Error connect server.");
  }
};
export const getCategoryTree = async () => {
  try {
    const { data } = await catalogRequest.get<CategoryReponse[]>("/category");
    if (!data) {
      return [];
    }
    console.log("category:" + data);
    return categoryTreeMapping(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Details Error:", error.message);
    } else {
      console.error("Details Null:", error);
    }
    throw new Error("Error fetching category tree.");
  }
};
