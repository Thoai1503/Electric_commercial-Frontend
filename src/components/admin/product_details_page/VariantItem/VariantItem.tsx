import React, { useEffect, useState } from "react";

import type { ProductVariant } from "../../../../type/productVariant";
import type { VariantAttribute } from "../../../../type/VariantAttribute";
import { useVariantAttributeMutation } from "../../../../module/admin/hook/product_detail_page/useVariantAttributeMutation";

import VariantAttributeComboBox from "./CheckBox/VariantAttributeComboBox";

interface Prop {
  item: Partial<ProductVariant>;
  index: number;
}
const VariantItem = ({ item, index }: Prop) => {
  console.log(index);

  const {
    update,
    handleDelete,
    isPendingDelete,
    isEdit,
    setIsEdit,
    updateVariant,
  } = useVariantAttributeMutation(item.id!);
  const [variantAttributeList, setVariantAttributeList] = useState<
    VariantAttribute[]
  >(item.variant_attributes ?? []);
  const [productVariant, setProductVariant] = useState<Partial<ProductVariant>>(
    {
      id: item.id,
      product_id: item.product_id,
      name: item.name,
      sku: item.sku,
      price: item.price,
    }
  );

  const handleSubmit = () => {
    console.log("Data: " + JSON.stringify(variantAttributeList));
    //  alert("Submitting..." + JSON.stringify(variantAttributeList));
    // return;
    updateVariant(productVariant);
    update(variantAttributeList);
  };
  useEffect(() => {
    setVariantAttributeList(item.variant_attributes ?? []);
  }, [isEdit, item.variant_attributes]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    id: number
  ) => {
    const { name, value } = e.target;

    setProductVariant((pre) => ({
      ...pre,
      [name]: value,
    }));

    setVariantAttributeList((prev) =>
      prev.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              value_text:
                attr.attribute?.data_type === "nvarchar"
                  ? value
                  : attr.value_text,
              value_int:
                attr.attribute?.data_type === "int" ? value : attr.value_int,
              value_decimal:
                attr.attribute?.data_type === "decimal"
                  ? value
                  : attr.value_decimal,
              attribute_value_id: value != "0" ? Number(value) : null,
            }
          : attr
      )
    );
  };
  if (!isEdit)
    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.sku}</td>
        <td>{item.price?.toLocaleString().replace(",", ".")}đ</td>
        {variantAttributeList
          .sort((a, b) => a.attribute_id - b.attribute_id)
          .map((e) => {
            return <td>{e.attribute_value?.value}</td>;
          })}
        <td>
          <button
            className="btn btn-outline-info"
            onClick={() => setIsEdit(!isEdit)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
              />
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
  return (
    <tr key={productVariant.id}>
      <td>{productVariant.id}</td>
      <td>
        <input
          name="name"
          value={productVariant.name}
          onChange={(ev) => handleChange(ev, productVariant.id!)}
        />
      </td>
      <td>
        <input name="sku" value={productVariant.sku} onChange={() => {}} />
      </td>
      <td>
        <input name="price" value={productVariant.price} onChange={() => {}} />
      </td>
      {variantAttributeList
        .sort((a, b) => a.attribute_id - b.attribute_id)
        .map((e) => (
          <td>
            {/* <input
              placeholder={
                e.attribute?.id.toString() + "&" + e.attribute?.data_type
              }
              value={e.value_decimal || e.value_int || e.value_text}
              name={e.attribute?.name}
              onChange={(ev) => handleChange(ev, e.id)}
              style={{
                width: e.attribute?.data_type == "int" ? "40px" : "auto",
              }}
            /> */}

            <VariantAttributeComboBox
              attribute_id={e.attribute_id}
              attribute_value_id={e.attribute_value_id || null}
              handleChange={(ev: React.ChangeEvent<HTMLSelectElement>) =>
                handleChange(ev, e.id)
              }
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
