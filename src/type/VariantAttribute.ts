import type { Attribute } from "./Attribute";

export interface VariantAttribute {
  id: number;
  attribute_id: number;
  variant_id: number;
  value_int: string;
  value_text: string;
  value_decimal: string;
  attribute: Attribute;
}
