import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

import { useVariantConfigSection } from "../../../module/admin/hook/product_detail_page/useVariantConfigSection";

import AddVariantModal from "./AddVariantModal/AddVariantModal";
import VariantItem from "./VariantItem/VariantItem";

interface Prop {
  id: number;
  nextTab: () => void;
  prevTab: () => void;
}

const VariantConfigSection = ({ id, nextTab, prevTab }: Prop) => {
  const { handleChange, handleSubmit, variants, categoryAttributes } =
    useVariantConfigSection(id);

  console.log("Variant  :" + JSON.stringify(variants));
  // const en = variants && variants[0]?.variant_attributes;
  //alert(JSON.stringify(en));

  return (
    <>
      {" "}
      <div className="mb-4">
        <h6 className="mb-3">📌 Danh sách các biến thể:</h6>
        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>Tên</th>
                <th>SKU</th>
                <th>Giá</th>
                {categoryAttributes
                  ?.sort((a, b) => a.attribute.id - b.attribute.id)
                  .map((item) => (
                    <th key={item.attribute.id}>{item.attribute.name}</th>
                  ))}
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {variants?.map((variant, index) => (
                <VariantItem item={variant} index={index} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <span className="me-2">👉 Action:</span>
          <div className="btn-group">
            <button className="btn btn-outline-primary btn-sm">
              <Plus size={14} className="me-1" />
              Add Variant
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              Bulk Edit Price
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              Import CSV
            </button>
          </div>
        </div>
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
          <span>Ảnh</span>
        </button>
      </div>
      <AddVariantModal
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default VariantConfigSection;
