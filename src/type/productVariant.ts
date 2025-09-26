import type { VariantAttribute } from "./VariantAttribute";

export interface ProductVariant {
  id: number;
  product_id: number;
  name: string;
  sku: string;
  price: number;
  status: number;
  variant_attributes: VariantAttribute[];
}
