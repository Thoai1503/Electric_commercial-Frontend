import { catalogRequest } from "../../../api/http";
import type { CategoryAttribute } from "../../../type/CategoryAttribute";

export const getCategoryAttributes = async (): Promise<CategoryAttribute> => {
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
