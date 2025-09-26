import { catalogRequest, catalogRequestTesting } from "../../../api/http";
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
    .get<Product>(`/product/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const createProduct = async (
  product: Partial<Product>
): Promise<Partial<Product>> => {
  return await catalogRequestTesting
    .post<Partial<Product>>("/api/product", product)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
