import { Request } from "../../../api/http";
import type { Ward } from "../../../type/Ward";

export const getByDistrictId = async (district_id: number): Promise<Ward[]> => {
  return await Request.get<Ward[]>(`/api/v1/ward/district/${district_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
