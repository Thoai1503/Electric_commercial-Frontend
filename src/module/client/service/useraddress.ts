import { Request } from "../../../api/http";
import type { UserAddress } from "../../../type/UserAddress";

export const getByUserId = async (user_id: number): Promise<UserAddress[]> => {
  return await Request.get<UserAddress[]>(`/api/v1/useraddress/user/${user_id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
export const createNewAddress = async (
  addr: Partial<UserAddress>
): Promise<number> => {
  return await Request.post("/api/v1/useraddress", addr)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
export const updateAddress = async (
  id: number,
  addr: Partial<UserAddress>
): Promise<number> => {
  return await Request.put(`/api/v1/useraddress/${id}`, addr)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
