import type { ProductVariant } from "./productVariant";

export interface OrderDetail {
  id: number;
  order_id: number;
  variant_id: number;
  variant?: Partial<ProductVariant>;
  quantity: number;
}
