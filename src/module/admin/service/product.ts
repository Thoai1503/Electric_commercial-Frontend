import { catalogRequest } from "../../../api/http";
import type { Product } from "../../../type/Product";

export const getAllProduct = async (): Promise<Partial<Product>[]> => {
  return await catalogRequest
    .get<Product[]>("/product")
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductById = async (id: number): Promise<Product> => {
  return await catalogRequest
    .get<Product>(`/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken") || ""}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const createProduct = async (
  product: Partial<Product>,
): Promise<Partial<Product>> => {
  return await catalogRequest
    .post<Partial<Product>>("/product", product, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
