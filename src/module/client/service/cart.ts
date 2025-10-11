import type { Cart } from "../../../type/Cart";
import { catalogRequest, Request } from "../../../api/http";

export const getByUserId = async (user_id: number): Promise<Cart[]> => {
  return catalogRequest
    .get<Cart[]>(`/cart/user/${user_id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const updateCartItemQuantity = async (
  id: number,
  quantity: number
): Promise<boolean> => {
  return Request.post<boolean>(`/api/v1/cart/${id}`, { quantity: quantity })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
