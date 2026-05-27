import { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, Plus, SlidersHorizontal } from "lucide-react";

import { useAttributeConfigSection } from "../../../module/admin/hook/product_detail_page/useAttributeConfigSection";
import CustomInput from "./CustomInput/CustomInput";

interface Prop {
  id: number;
  nextTab: () => void;
  prevTab: () => void;
}

const AttributeConfigSestion = ({ id, nextTab, prevTab }: Prop) => {
  const { nonVariantProductAttributes, handleSubmit, product } =
    useAttributeConfigSection(id);
  const [showNewAttributeRow, setShowNewAttributeRow] = useState(false);

  if (!product) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="d-flex align-items-center gap-2 text-dark fw-bold mb-3">
        <SlidersHorizontal size={18} className="text-primary" />
        Thuộc tính sản phẩm chung
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          {nonVariantProductAttributes?.map((item, index) => {
            const vl =
              item.value_decimal ||
              item.value_int ||
              item.value_text ||
              undefined;
            const isHavingValuable =
              item.value_decimal != null ||
              item.value_int != null ||
              item.value_text != null;
            const attribute_value_id = item.attribute_value_id;

            const isLastItem =
              index === (nonVariantProductAttributes?.length || 0) - 1;

            return (
              <div
                key={item.id}
                className="mb-4 d-flex align-items-start gap-2"
              >
                <div className="flex-grow-1">
                  <CustomInput
                    item={item}
                    isHavingValuable={isHavingValuable}
                    vl={vl}
                    handleSubmit={handleSubmit}
                    attribute_value_id={attribute_value_id}
                  />
                </div>
                {isLastItem && (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    title="Thêm thuộc tính mới"
                    onClick={() => setShowNewAttributeRow(true)}
                  >
                    <Plus size={16} />
                  </button>
                )}
              </div>
            );
          })}

          {showNewAttributeRow && (
            <div className="row mb-3 align-items-center">
              {/* <div className="col-2">
                <label className="form-label mb-0">Thuộc tính mới:</label>
              </div> */}
              <div className="col-2">
                {/* <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên thuộc tính"
                /> */}
                  <div className="position-relative flex-grow-1">
            <button
              className="btn btn-light border w-100 text-start d-flex justify-content-between align-items-center "
              type="button"
          //    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              style={{ minHeight: "48px", color: "#334155" }}
            >
              <span>Nhập tên thuộc tính</span>
              <ChevronDown size={16} />
            </button>
            {/* {categoryDropdownOpen && (
              <div
                className="position-absolute w-100 mt-1"
                style={{ zIndex: 1050 }}
              >
                <ul className="list-group shadow">
                  {categories?.map((category: any) => (
                    <li
                      key={category.id}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                    >
                      <button
                        className="btn btn-link text-decoration-none p-0 w-100 text-start text-dark"
                        onClick={() => {
                          setSelectedCategory({
                            id: category.id,
                            name: category.text,
                          });
                          setCategoryDropdownOpen(false);
                        }}
                      >
                        {category.text}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
            <small className="text-muted mt-2 d-inline-block">
              Du lieu lay tu cay danh muc hien co.
            </small>
          </div>
              </div>
              :
              <div className="col-4" style={{ width: "480px" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập giá trị thuộc tính"
                  width={10}
                />
              </div>
              <div className="col-2">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled
                >
                  Lưu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="d-flex gap-2 justify-content-end">
        <button
          type="button"
          className="btn btn-outline-secondary d-flex align-items-center"
          onClick={prevTab}
        >
          <ArrowLeft size={16} className="me-1" />
          <span>Quay lại</span>
        </button>
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2 px-4 fw-semibold"
          onClick={nextTab}
        >
          <span>Tiếp tục</span>
          <ArrowRight size={16} />
          <span>Biến thể</span>
        </button>
      </div>
    </>
  );
};

export default AttributeConfigSestion;
