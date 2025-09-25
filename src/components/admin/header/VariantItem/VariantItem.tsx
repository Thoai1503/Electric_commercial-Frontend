import React, { useState } from "react";

import type { ProductVariant } from "../../../../type/productVariant";
import type { VariantAttribute } from "../../../../type/VariantAttribute";
import { useVariantAttributeMutation } from "../../../../module/admin/hook/product_detail_page/useVariantAttributeMutation";

interface Prop {
  item: Partial<ProductVariant>;
  index: number;
}
const VariantItem = ({ item, index }: Prop) => {
  console.log(index);
  const { update } = useVariantAttributeMutation();
  const [variantAttributeList, setVariantAttributeList] = useState<
    VariantAttribute[]
  >(item.variant_attributes ?? []);
  console.log("At: " + JSON.stringify(variantAttributeList));

  const handleSubmit = () => {
    // alert("Submit: " + JSON.stringify(variantAttributeList));
    // return;
    update(variantAttributeList);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    id: number
  ) => {
    const { value } = e.target;

    setVariantAttributeList((prev) =>
      prev.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              value_text:
                attr.attribute.data_type === "nvarchar"
                  ? value
                  : attr.value_text,
              value_int:
                attr.attribute.data_type === "int" ? value : attr.value_int,
              value_decimal:
                attr.attribute.data_type === "decimal"
                  ? value
                  : attr.value_decimal,
            }
          : attr
      )
    );
  };

  return (
    <tr key={item.id}>
      <td>{item.id}</td>
      <td>{item.sku}</td>
      <td>{item.price}</td>
      {variantAttributeList
        .sort((a, b) => a.attribute_id - b.attribute_id)
        .map((e) => (
          <td>
            <input
              placeholder={
                e.attribute.id.toString() + "&" + e.attribute.data_type
              }
              value={e.value_decimal || e.value_int || e.value_text}
              name={e.attribute.name}
              onChange={(ev) => handleChange(ev, e.id)}
            />
          </td>
        ))}
      <td>
        <button className="btn btn-outline-primary" onClick={handleSubmit}>
          Save
        </button>
      </td>
    </tr>
  );
};

export default VariantItem;
