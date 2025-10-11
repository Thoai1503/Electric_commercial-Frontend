import type { ProductVariant } from "./productVariant";

export interface Cart {
  id: number;
  variant_id?: number;
  user_id?: number;
  quantity?: number;
  price?: number;
  variant?: ProductVariant;
}
