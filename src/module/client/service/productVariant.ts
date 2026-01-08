import { catalogRequest } from "../../../api/http";
import type { QueryState } from "../../../type/FilterState";
import type { ProductVariant } from "../../../type/productVariant";

export const getAllProductVariant = async (
  queryState?: QueryState
): Promise<ProductVariant[]> => {
  const params: string[] = [];

  if (queryState) {
    // Add required category
    params.push(`category=${encodeURIComponent(queryState.category)}`);

    // Add optional fields
    if (queryState.sortBy) {
      params.push(`sortBy=${encodeURIComponent(queryState.sortBy)}`);
    }

    if (queryState.order) {
      params.push(`order=${encodeURIComponent(queryState.order)}`);
    }

    // Add filters
    if (queryState.filters) {
      Object.entries(queryState.filters).forEach(([key, values]) => {
        if (values && values.length > 0) {
          params.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(values.join(","))}`
          );
        }
      });
    }
  }

  const query = params.length > 0 ? `?${params.join("&")}` : "";
  return catalogRequest
    .get(`/productvariant${query}`)
    .then((res) => res.data.data);
};

export const getProductVariantById = async (
  id: number
): Promise<ProductVariant> => {
  return await catalogRequest
    .get(`/productvariant/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getVariantByProductId = async (
  id: number
): Promise<Partial<ProductVariant>[]> => {
  return await catalogRequest
    .get(`/productvariant/product/${id}`)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
