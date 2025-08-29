import { axiosInstance } from "../../../api/http";
import type { Category } from "../../../type/Category";

export const addCategoryService = async (category: Category) => {
  try {
    const { data } = await axiosInstance.post<boolean>(
      "/api/category",
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
