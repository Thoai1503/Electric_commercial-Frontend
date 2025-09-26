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
  const { update, handleDelete, isPendingDelete } =
    useVariantAttributeMutation();
  const [variantAttributeList, setVariantAttributeList] = useState<
    VariantAttribute[]
  >(item.variant_attributes ?? []);

  const handleSubmit = () => {
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
      <td>{item.name}</td>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            fill="currentColor"
            className="bi bi-floppy"
            viewBox="0 0 16 16"
          >
            <path d="M11 2H9v3h2z" />
            <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
          </svg>
        </button>
        <button
          className="btn btn-outline-danger mx-2"
          onClick={() => handleDelete(item.id!)}
          disabled={isPendingDelete}
        >
          {isPendingDelete ? (
            "..deleting"
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              className="bi bi-trash-fill"
              viewBox="0 0 16 16"
            >
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>
          )}
        </button>
      </td>
    </tr>
  );
};

export default VariantItem;
