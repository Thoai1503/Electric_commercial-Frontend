import { Request } from "../../../api/http";
import type { Province } from "../../../type/Province";

export const getAllProvince = async (): Promise<Province[]> => {
  return Request.get<Province[]>(`/api/v1/province`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
