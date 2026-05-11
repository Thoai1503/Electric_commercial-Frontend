import { ArrowLeft, ArrowRight, SlidersHorizontal } from "lucide-react";

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
          {nonVariantProductAttributes?.map((item) => {
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

            return (
              <div key={item.id} className="mb-4">
                <CustomInput
                  item={item}
                  isHavingValuable={isHavingValuable}
                  vl={vl}
                  handleSubmit={handleSubmit}
                  attribute_value_id={attribute_value_id}
                />
              </div>
            );
          })}
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
