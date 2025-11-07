import type { AttributeValue } from "./AttributeValue";

export interface Attribute {
  id: number;
  name: string;
  unit: string;
  data_type: string;
  slug?: string;
  status: number;
  is_selected: boolean;
  attribute_values?: AttributeValue[];
}
