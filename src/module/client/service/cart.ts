import type { Cart } from "../../../type/Cart";
import { catalogRequest, Request } from "../../../api/http";

export const getByUserId = async (user_id: number): Promise<Cart[]> => {
  return catalogRequest
    .get<Cart[]>(`/cart/user/${user_id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
};

export const updateCartItemQuantity = async (
  id: number,
  quantity: number,
): Promise<boolean> => {
  return Request.post<boolean>(`api/cart/${id}`, { quantity: quantity })
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};

export const addToUserCart = async (item: Partial<Cart>): Promise<number> => {
  return Request.post<number>("api/cart", item)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const addManyToUserCart = async (
  user_id: number,
  items: Partial<Cart>[],
): Promise<boolean> => {
  return Request.post<boolean>("api/cart/list", {
    user_id: user_id,
    items: items,
  })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const removeCartItem = async (id: number): Promise<boolean> => {
  return Request.delete<boolean>(`api/cart/${id}`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
};
