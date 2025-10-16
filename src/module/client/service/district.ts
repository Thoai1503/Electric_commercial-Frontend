import { Request } from "../../../api/http";
import type { District } from "../../../type/District";

export const getByProvinceId = async (
  province_id: number
): Promise<District[]> => {
  return await Request.get<District[]>(
    `/api/v1/district/province/${province_id}`
  )
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
