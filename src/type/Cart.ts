import type { ProductVariant } from "./productVariant";

export interface Cart {
  id: number;
  variant_id: number;
  user_id: number;
  quantity: number;
  unit_price: number;
  variant?: ProductVariant;
}
