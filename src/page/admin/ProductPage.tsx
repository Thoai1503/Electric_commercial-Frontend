import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { ProductList } from "../../components/admin/productManagement/productList";
import CIcon from "@coreui/icons-react";
import { cilPlus } from "@coreui/icons";
import { AddProductModal } from "../../components/admin/productManagement/addProductModal";

const ProductPage = () => {
  return (
    <>
      <CContainer fluid className="px-4">
        <CRow className="mb-4">
          <CCol>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-1">Quản lý sản phẩm</h2>
                <p className="text-muted mb-0">
                  Thêm mới và quản lý cây danh mục sản phẩm
                </p>
              </div>
              <CButton
                color="success"
                size="sm"
                className="border-0"
                style={{ color: "white" }}
              >
                <CIcon icon={cilPlus} className="me-1" />
                Thêm mới
              </CButton>
            </div>
          </CCol>
        </CRow>
        <ProductList />
        <AddProductModal />
      </CContainer>
    </>
  );
};

export default ProductPage;
