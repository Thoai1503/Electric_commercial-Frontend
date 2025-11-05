import { catalogRequest } from "../../../api/http";
import type { AttributeValue } from "../../../type/AttributeValue";

export const getByAttributeId = async (
  categoryId: number
): Promise<AttributeValue[]> => {
  return catalogRequest
    .get(`/attributevalue/attribute/${categoryId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching attributes:", error);
      return []; // Return an empty array or handle the error as needed
    });
};
