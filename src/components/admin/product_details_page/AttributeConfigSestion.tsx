import { ArrowLeft, ArrowRight } from "lucide-react";

import { useAttributeConfigSection } from "../../../module/admin/hook/product_detail_page/useAttributeConfigSection";
import CustomInput from "./CustomInput/CustomInput";

interface Prop {
  id: number;
  nextTab: () => void;
  prevTab: () => void;
}

const AttributeConfigSestion = ({ id, nextTab, prevTab }: Prop) => {
  const { nonVariantProductAttributes, categoryAttributes, handleSubmit } =
    useAttributeConfigSection(id);

  console.log("Res: " + JSON.stringify(categoryAttributes));

  return (
    <>
      <div className="mb-4">
        <h6 className="mb-3">📌 Thuộc tính sản phẩm chung:</h6>
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
          return (
            <>
              <CustomInput
                item={item}
                isHavingValuable={isHavingValuable}
                vl={vl}
                handleSubmit={handleSubmit}
              />
            </>
          );
        })}
      </div>

      <div className="d-flex gap-2">
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
          className="btn d-flex align-items-center"
          style={{ backgroundColor: "#6f42c1", color: "white" }}
          onClick={nextTab}
        >
          <span className="me-2">Tiếp tục</span>
          <ArrowRight size={16} className="me-1" />
          <span>Biến thể</span>
        </button>
      </div>
    </>
  );
};

export default AttributeConfigSestion;
