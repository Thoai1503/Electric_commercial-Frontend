import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useState } from "react";

interface Prop {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSubmit: () => void;
}

const AddVariantModal = ({ handleChange, handleSubmit }: Prop) => {
  const [visible, setVisible] = useState(false);

  const handleClose = () => {
    setVisible(false);
  };
  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Thêm biến thể mới
      </CButton>

      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={handleClose}
        aria-labelledby="AddProductModal"
        size="lg"
      >
        <CModalHeader>
          <CModalTitle id="AddProductModal">Thêm biến thể mới</CModalTitle>
        </CModalHeader>

        <CForm onSubmit={() => {}} style={{ overflowY: "scroll" }}>
          <CModalBody style={{ overflowY: "scroll" }}>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="image">Hình ảnh sản phẩm</CFormLabel>
                <CFormInput
                  type="file"
                  id="image"
                  multiple
                  name="image"
                  onChange={() => {}}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                />
                <small className="text-muted">
                  Chấp nhận file: JPEG, JPG, PNG, GIF, WEBP. Tối đa 5MB
                </small>
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="name">
                  Tên biến thể <span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nhập tên sản phẩm"
                  maxLength={255}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={8}>
                <CFormLabel htmlFor="slug">SKU</CFormLabel>
                <CFormInput
                  type="text"
                  id="slug"
                  name="sku"
                  placeholder="slug-san-pham"
                  onChange={handleChange}
                  maxLength={100}
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="slug">Giá bán (VNĐ)</CFormLabel>
                <CFormInput
                  type="number"
                  id="slug"
                  onChange={handleChange}
                  name="price"
                  placeholder="Nhập giá.."
                />
              </CCol>
            </CRow>
          </CModalBody>

          <CModalFooter>
            <CButton
              color="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              Hủy
            </CButton>
            <CButton
              color="primary"
              type="submit"
              disabled={false}
              onClick={handleSubmit}
            >
              Thêm sản phẩm
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};

export default AddVariantModal;
