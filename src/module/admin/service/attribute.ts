import { catalogRequest } from "../../../api/http";
import type { Attribute } from "../../../type/Attribute";

export const getAllAttribute = async (): Promise<Attribute[]> => {
  return catalogRequest
    .get("/attribute")
    .then((res) => {
      console.log("Attr" + res.data);
      return res.data;
    })
    .catch((error) => {
      console.log("Error fetching attributes:", error);
      return []; // Return an empty array or handle the error as needed
    });
};
