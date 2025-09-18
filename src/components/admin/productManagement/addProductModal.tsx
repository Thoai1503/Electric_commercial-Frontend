import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol,
} from "@coreui/react";

import { useAddProductModal } from "../../../module/admin/hook/product_page/useAddProductModal";

export const AddProductModal = () => {
  // Mock data cho brands và categories - thay thế bằng data thực tế
  const {
    brands,
    categories,
    handleInputChange,
    handleImageChange,
    formData,
    handleClose,
    handleSubmit,
    visible,
    setVisible,
    imagePreview,
    isPending,
  } = useAddProductModal();

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(!visible)}>
        Thêm sản phẩm mới
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
          <CModalTitle id="AddProductModal">Thêm sản phẩm mới</CModalTitle>
        </CModalHeader>

        <CForm onSubmit={handleSubmit} style={{ overflowY: "scroll" }}>
          <CModalBody style={{ overflowY: "scroll" }}>
            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="image">Hình ảnh sản phẩm</CFormLabel>
                <CFormInput
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                />
                <small className="text-muted">
                  Chấp nhận file: JPEG, JPG, PNG, GIF, WEBP. Tối đa 5MB
                </small>

                {imagePreview && (
                  <div className="mt-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <strong>Xem trước:</strong>
                      <CButton color="danger" variant="outline">
                        Xóa ảnh
                      </CButton>
                    </div>
                    <div
                      style={{
                        maxWidth: "200px",
                        maxHeight: "200px",
                        overflow: "hidden",
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                )}
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="name">
                  Tên sản phẩm <span className="text-danger">*</span>
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên sản phẩm"
                  maxLength={255}
                  required
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="slug">Slug</CFormLabel>
                <CFormInput
                  type="text"
                  id="slug"
                  name="slug"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="slug-san-pham"
                  maxLength={100}
                />
              </CCol>
            </CRow>

            <CRow className="mb-3">
              <CCol md={6}>
                <CFormLabel htmlFor="brand_id">
                  Thương hiệu <span className="text-danger">*</span>
                </CFormLabel>
                <CFormSelect
                  id="brand_id"
                  name="brand_id"
                  value={formData.brand_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn thương hiệu</option>
                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={6}>
                <CFormLabel htmlFor="category_id">
                  Danh mục <span className="text-danger">*</span>
                </CFormLabel>
                <CFormSelect
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Chọn danh mục</option>
                  {categories &&
                    categories?.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.text}
                      </option>
                    ))}
                </CFormSelect>
              </CCol>
            </CRow>

            {/* <CRow className="mb-3">
              <CCol md={12}>
                <CFormLabel htmlFor="description">Mô tả sản phẩm</CFormLabel>
                <CFormTextarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả chi tiết về sản phẩm"
                  rows={4}
                  maxLength={1000}
                />
                <small className="text-muted">
                  {formData.description.length}/1000 ký tự
                </small>
              </CCol>
            </CRow> */}
          </CModalBody>

          <CModalFooter>
            <CButton color="secondary" onClick={handleClose}>
              Hủy
            </CButton>
            <CButton color="primary" type="submit" disabled={isPending}>
              Thêm sản phẩm
            </CButton>
          </CModalFooter>
        </CForm>
      </CModal>
    </>
  );
};
