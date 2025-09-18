import { catalogRequest } from "../../../api/http";
import type { Brand } from "../../../type/Brand";

export const getAllBrand = async (): Promise<Brand[]> => {
  return await catalogRequest
    .get("brand")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error get all brand:", error);
      throw error;
    });
};
