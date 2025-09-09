import type { Attribute } from "./Attribute";

export interface CategoryAttribute {
  id: number;
  category_id: number;
  attribute_id: number;
  is_filterable: boolean;
  is_required: boolean;
  is_variant_level: boolean;
  attribute: Attribute;
}
