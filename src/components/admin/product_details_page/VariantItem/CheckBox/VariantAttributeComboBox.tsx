import { useQuery } from "@tanstack/react-query";

import attributevalueQuery from "../../../../../module/admin/query/attributeValue";

interface Prop {
  attribute_id: number;
  attribute_value_id: number | null;
  handleChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const VariantAttributeComboBox = ({
  attribute_id,
  attribute_value_id,
  handleChange,
}: Prop) => {
  const { data: attribute_values } = useQuery(
    attributevalueQuery.getByAttributeId(attribute_id),
  );

  return (
    <select
      name="attribute_value_id"
      value={attribute_value_id ?? 0}
      onChange={handleChange}
    >
      <option value={0}></option>

      {attribute_values?.map((attribute_value) => (
        <option key={attribute_value.id} value={attribute_value.id}>
          {attribute_value.value}
        </option>
      ))}
    </select>
  );
};

export default VariantAttributeComboBox;
