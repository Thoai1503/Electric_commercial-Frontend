import { ArrowLeft, Check, Plus } from "lucide-react";

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
      <div className="mb-4">
        <h6 className="mb-3">📌 Ảnh chung cho sản phẩm:</h6>
        <div
          className="border rounded p-4 text-center mb-4"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <button className="btn btn-outline-primary">
            <Plus size={16} className="me-1" />
            Upload Image
          </button>
          <p className="text-muted mt-2 mb-0">
            Drag & Drop để sắp xếp thứ tự hiển thị
          </p>
        </div>

        <h6 className="mb-3">📌 Ảnh cho từng biến thể:</h6>
        <div className="mb-3">
          {variants?.map((variant) => (
            <ImageVariantItem variant={variant} />
          ))}
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
          className="btn btn-success d-flex align-items-center"
        >
          <Check size={16} className="me-1" />
          <span>Lưu sản phẩm</span>
        </button>
      </div>
    </>
  );
};

export default ImagesForVariant;
