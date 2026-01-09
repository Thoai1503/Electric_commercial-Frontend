import React, { useState } from "react";
import type { ProductAttribute } from "../../../../type/ProductAttribute";

interface Prop {
  item: ProductAttribute;
  isHavingValuable: boolean;
  vl: string | number | undefined;
  attribute_value_id?: number;
  handleSubmit: (id: number, en: Partial<ProductAttribute>) => void;
}
const CustomInput = ({
  item,
  isHavingValuable,
  vl,
  handleSubmit,
  attribute_value_id,
}: Prop) => {
  const [submitData, setSubmitData] = useState<Partial<ProductAttribute>>({
    id: item.id,
    product_id: item.product_id,
    attribute_id: item.attribute_id,

    [`value_${item.attribute.data_type.trim() == "nvarchar" ? "text" : item.attribute.data_type}`]:
      isHavingValuable ? vl : "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setSubmitData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("Attr val: " + item.attribute.attribute_values);
  const attributeValues = item.attribute.attribute_values;

  //const inputRef = useRef(null);

  // const renderInput = (dt: string) => {
  //   const data_type = dt.trim();
  //   switch (data_type) {
  //     case "int":
  //       return (
  //         <div className="col-4">
  //           {
  //             <input
  //               ref={inputRef}
  //               name="value_int"
  //               type="number"
  //               className="form-control"
  //               value={submitData.value_int ?? ""}
  //               onChange={handleChange}
  //             />
  //           }
  //         </div>
  //       );
  //     case "decimal":
  //       return (
  //         <div className="col-4">
  //           {
  //             <input
  //               type="number"
  //               className="form-control"
  //               name="value_decimal"
  //               step={0.1}
  //               max={50}
  //               value={submitData.value_decimal ?? ""}
  //               onChange={handleChange}
  //             />
  //           }
  //         </div>
  //       );
  //     case "nvarchar":
  //       return (
  //         <div className="col-4">
  //           {
  //             <input
  //               type="text"
  //               name="value_text"
  //               className="form-control"
  //               value={submitData.value_text ?? ""}
  //               onChange={handleChange}
  //             />
  //           }
  //         </div>
  //       );
  //   }
  // };

  return (
    <div className="row mb-3 align-items-center">
      <div className="col-2">
        <label className="form-label mb-0">
          {item.attribute.name} (
          {item.attribute.unit != "" && item.attribute.unit}):
        </label>
      </div>
      <div className="col-4">
        {/* {attribute_value_id ? (
          <select className="form-select">
            {attributeValues?.map((av) => (
              <option
                key={av.id}
                value={av.id}
                selected={av.id === attribute_value_id}
              >
                {av.value}
              </option>
            ))}
          </select>
        ) : (
          renderInput(item.attribute.data_type)
        )} */}
        <select className="form-select" onChange={handleChange}>
          <option value="">-- Chọn giá trị --</option>
          {attributeValues?.map((av) => (
            <option
              key={av.id}
              value={av.id}
              selected={av.id === attribute_value_id}
            >
              {av.value}
            </option>
          ))}
        </select>
      </div>
      <div className="col-2">
        <button
          className="btn btn-outline-primary "
          onClick={() => {
            handleSubmit(item.id, submitData);
          }}
        >
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
      </div>
    </div>
  );
};

export default CustomInput;
