import { ArrowLeft, Check, Images, Plus } from "lucide-react";

import { useImagesForVariant } from "../../../module/admin/hook/product_detail_page/useImagesForVariant";
import ImageVariantItem from "./ImageVariantItem/ImageVariantItem";

interface Prop {
  prevTab: () => void;
  id: number;
}

const ImagesForVariant = ({ prevTab, id }: Prop) => {
  const { variants } = useImagesForVariant(id);

  return (
    <>
      <div className="d-flex align-items-center gap-2 text-dark fw-bold mb-3">
        <Images size={18} className="text-primary" />
        Hình ảnh sản phẩm
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
          <h6 className="mb-3">Ảnh chung cho sản phẩm</h6>
          <div
            className="border rounded-4 p-4 text-center mb-4"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <button className="btn btn-outline-primary d-inline-flex align-items-center gap-1">
              <Plus size={16} className="me-1" />
              Upload Image
            </button>
            <p className="text-muted mt-2 mb-0">
              Drag & Drop để sắp xếp thứ tự hiển thị
            </p>
          </div>

          <h6 className="mb-3">Ảnh cho từng biến thể</h6>
          <div className="mb-3">
            {variants?.map((variant) => (
              <ImageVariantItem key={variant.id} variant={variant} />
            ))}
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
        >
          <Check size={16} />
          <span>Lưu sản phẩm</span>
        </button>
      </div>
    </>
  );
};

export default ImagesForVariant;
