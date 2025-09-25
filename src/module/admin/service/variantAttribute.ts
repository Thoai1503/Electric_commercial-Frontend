import { catalogRequest } from "../../../api/http";
import type { VariantAttribute } from "../../../type/VariantAttribute";

export const updateVariantAttributeList = async (
  list: VariantAttribute[]
): Promise<boolean> => {
  return await catalogRequest
    .post("/variantattribute/updatelist", list)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
