import type { Attribute } from "./Attribute";
import type { AttributeValue } from "./AttributeValue";

export interface VariantAttribute {
  id: number;
  attribute_id: number;
  variant_id: number;
  value_int: string;
  value_text: string;
  value_decimal: string;
  attribute_value_id: number | null;
  attribute_value: AttributeValue | null;
  attribute: Attribute;
}
