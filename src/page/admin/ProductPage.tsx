import { CButton } from "@coreui/react";
import { ProductList } from "../../components/admin/productManagement/productList";
import CIcon from "@coreui/icons-react";

import { AddProductModal } from "../../components/admin/productManagement/addProductModal";

import { useState } from "react";

const ProductPage = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="col-12 px-0">
      <div className="mt-4 mb-5">
        <div
          className="card border-0 shadow mb-4"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
          }}
        >
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  <span>Quản trị sản phẩm</span>
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Quản lý sản phẩm
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 680 }}>
                  Tạo sản phẩm mới và quản lý danh sách sản phẩm theo một bố cục
                  gọn, rõ ràng, đồng bộ với toàn bộ khu vực quản trị.
                </p>
              </div>
              <CButton
                color="primary"
                className="d-inline-flex align-items-center gap-2 px-4 fw-semibold"
                onClick={() => {
                  setVisible(!visible);
                }}
              >
                <CIcon className="me-1" />
                Thêm sản phẩm
              </CButton>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <ProductList />
          </div>
        </div>

        <AddProductModal visible={visible} />
      </div>
    </div>
  );
};

export default ProductPage;
