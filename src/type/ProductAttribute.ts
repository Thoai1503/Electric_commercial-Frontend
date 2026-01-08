import type { Attribute } from "./Attribute";

export interface ProductAttribute {
  id: number;
  product_id: number;
  attribute_id: number;
  value_text: string | null;
  value_decimal: number | null;
  value_int: number | null;
  attribute: Attribute;
  attribute_value_id: number;
}
