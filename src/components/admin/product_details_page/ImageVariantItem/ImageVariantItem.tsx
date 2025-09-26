import { Upload } from "lucide-react";

import type { ProductVariant } from "../../../../type/productVariant";
import AddImageModal from "./AddImageModal";
import { useState } from "react";

interface Prop {
  variant: Partial<ProductVariant>;
}
const ImageVariantItem = ({ variant }: Prop) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      key={variant.id}
      className="d-flex align-items-center justify-content-between border-bottom py-2"
    >
      <span>- {variant.name}</span>
      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => setVisible(!visible)}
      >
        <Upload size={14} className="me-1" />
        Upload
      </button>
      <AddImageModal
        visible={visible}
        setVisible={setVisible}
        variant_id={variant.id!}
        product_id={variant.product_id!}
      />
    </div>
  );
};

export default ImageVariantItem;
