import { ArrowLeft, ArrowRight, Plus } from "lucide-react";

import { useVariantConfigSection } from "../../../module/admin/hook/product_detail_page/useVariantConfigSection";

import AddVariantModal from "./AddVariantModal/AddVariantModal";

interface Prop {
  id: number;
  nextTab: () => void;
  prevTab: () => void;
}

const VariantConfigSection = ({ id, nextTab, prevTab }: Prop) => {
  const { handleChange, handleSubmit, variants, categoryAttributes } =
    useVariantConfigSection(id);

  console.log("Variant Attribute :" + JSON.stringify(variants));
  const en = variants && variants[0]?.variant_attributes;
  //alert(JSON.stringify(en));

  return (
    <>
      {" "}
      <div className="mb-4">
        <h6 className="mb-3">📌 Danh sách các biến thể:</h6>

        {/* <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedVariantAttributes.ram}
              onChange={(e) =>
                setSelectedVariantAttributes({
                  ...selectedVariantAttributes,
                  ram: e.target.checked,
                })
              }
            />
            <label className="form-check-label">RAM (8GB, 12GB, 16GB)</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedVariantAttributes.storage}
              onChange={(e) =>
                setSelectedVariantAttributes({
                  ...selectedVariantAttributes,
                  storage: e.target.checked,
                })
              }
            />
            <label className="form-check-label">
              Storage (128GB, 256GB, 512GB)
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={selectedVariantAttributes.color}
              onChange={(e) =>
                setSelectedVariantAttributes({
                  ...selectedVariantAttributes,
                  color: e.target.checked,
                })
              }
            />
            <label className="form-check-label">
              Màu sắc (Black, Silver, Gold)
            </label>
          </div>
        </div> */}

        <div className="table-responsive mb-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr>
                <th>STT</th>
                <th>SKU</th>
                <th>Giá</th>
                {categoryAttributes?.map((item) => (
                  <th key={item.attribute.id}>{item.attribute.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants?.map((variant, index) => (
                <tr key={index}>
                  <td>{variant.id}</td>
                  <td>{variant.sku}</td>
                  <td>{variant.price}</td>
                  {en?.map((e) => (
                    <td>
                      <input
                        placeholder={
                          e.attribute.id.toString() + "&" + e.id.toString()
                        }
                        value={""}
                      />
                    </td>
                  ))}
                </tr>
              ))}
              <tr>Chưa có biến thể</tr>
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
