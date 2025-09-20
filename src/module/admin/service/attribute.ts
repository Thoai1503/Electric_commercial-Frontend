import { catalogRequest, catalogRequestTesting } from "../../../api/http";
import type { Attribute } from "../../../type/Attribute";

export const getAllAttribute = async (): Promise<Attribute[]> => {
  return catalogRequest
    .get("/attribute")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching attributes:", error);
      return []; // Return an empty array or handle the error as needed
    });
};

export const getAllAndSelectedByCategoryId = async (
  categoryId: number
): Promise<Attribute[]> => {
  return catalogRequest
    .get(`/attribute/GetByCategoryId/${categoryId}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching attributes:", error);
      return []; // Return an empty array or handle the error as needed
    });
};

export const createAttributeService = async (
  attr: Partial<Attribute>
): Promise<boolean> => {
  return catalogRequestTesting
    .post(`/api/attribute`, attr)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching attributes:", error);
      return []; // Return an empty array or handle the error as needed
    });
};
