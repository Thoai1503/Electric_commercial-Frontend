import { ArrowLeft, ArrowRight, Plus, Shapes } from "lucide-react";

import { useVariantConfigSection } from "../../../module/admin/hook/product_detail_page/useVariantConfigSection";

import AddVariantModal from "./AddVariantModal/AddVariantModal";
import VariantItem from "./VariantItem/VariantItem";
import { useState } from "react";

interface Prop {
  id: number;
  nextTab: () => void;
  prevTab: () => void;
}

const VariantConfigSection = ({ id, nextTab, prevTab }: Prop) => {
  const { handleChange, handleSubmit, variants, categoryAttributes, product } =
    useVariantConfigSection(id);

  const [visible, setVisible] = useState(false);
  const handleClose = () => {
    setVisible(false);
  };

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
        <Shapes size={18} className="text-primary" />
        Danh sách biến thể
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-sm btn-primary d-inline-flex align-items-center gap-1"
              data-bs-toggle="modal"
              onClick={() => {
                setVisible(true);
              }}
            >
              <Plus size={14} className="me-1" />
              Thêm biến thể
            </button>
          </div>

          <div
            className="table-responsive rounded-4 overflow-hidden mb-2"
            style={{ border: "1px solid #e2e8f0" }}
          >
            <table className="table align-middle mb-0 bg-white">
              <thead style={{ background: "#111827" }}>
                <tr>
                  <th
                    className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                    style={{ color: "#94a3b8" }}
                  >
                    STT
                  </th>
                  <th
                    className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                    style={{ color: "#94a3b8" }}
                  >
                    Tên
                  </th>
                  <th
                    className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                    style={{ color: "#94a3b8" }}
                  >
                    SKU
                  </th>
                  <th
                    className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                    style={{ color: "#94a3b8" }}
                  >
                    Giá
                  </th>
                  {categoryAttributes
                    ?.sort((a, b) => a.attribute.id - b.attribute.id)
                    .map((item) => (
                      <th
                        key={item.attribute.id}
                        className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                        style={{ color: "#94a3b8" }}
                      >
                        {item.attribute.name}
                      </th>
                    ))}
                  <th
                    className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                    style={{ color: "#94a3b8" }}
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {variants?.map((variant, index) => (
                  <VariantItem key={variant.id} item={variant} index={index} />
                ))}
              </tbody>
            </table>
          </div>
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
          <span>Ảnh</span>
        </button>
      </div>
      <AddVariantModal
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        visible={visible}
        handleClose={handleClose}
      />
    </>
  );
};

export default VariantConfigSection;
