import { useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CAlert,
  CSpinner,
  CInputGroup,
  CInputGroupText,
  CRow,
  CCol,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilSettings, cilCheck, cilX, cilInfo } from "@coreui/icons";

import { createAttributeService } from "../../../module/admin/service/attribute";

interface AddAttributeModalProps {
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

const INITIAL_FORM_DATA = {
  id: 0,
  name: "",
  unit: "",
  data_type: "",
  slug: "",
  status: 1,
};

function AddAttributeModal({ show, handleClose }: AddAttributeModalProps) {
  const [formData, setFormData] = useState<any>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dataTypes = [
    { value: "int", label: "Số nguyên", icon: "🔢" },
    { value: "decimal", label: "Số thập phân", icon: "🔢" },
    { value: "nvarchar", label: "Ký tự ngắn", icon: "📝" },
    { value: "text", label: "Văn bản dài", icon: "📄" },
    { value: "boolean", label: "Đúng/Sai", icon: "✅" },
    { value: "date", label: "Ngày tháng", icon: "📅" },
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên thuộc tính là bắt buộc";
    } else if (formData.name.length < 2) {
      newErrors.name = "Tên thuộc tính phải có ít nhất 2 ký tự";
    } else if (formData.name.length > 100) {
      newErrors.name = "Tên thuộc tính không được vượt quá 100 ký tự";
    }

    if (!formData.data_type) {
      newErrors.dataType = "Vui lòng chọn kiểu dữ liệu";
    }

    if (formData.unit.length > 50) {
      newErrors.unit = "Đơn vị tính không được vượt quá 50 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await createAttributeService(formData);
      console.log("Submitting attribute:", formData);

      // Reset form and close modal
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      handleClose();

      // Show success message (you can implement toast notification here)
      alert("Thuộc tính đã được thêm thành công!");
    } catch (error) {
      console.error("Error creating attribute:", error);
      setErrors({
        submit: "Có lỗi xảy ra khi tạo thuộc tính. Vui lòng thử lại.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    if (!isSubmitting) {
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      handleClose();
    }
  };

  const selectedDataType = dataTypes.find(
    (type) => type.value === formData.data_type
  );

  console.log("Formdata :" + JSON.stringify(formData));
  return (
    <CModal
      visible={show}
      onClose={handleModalClose}
      size="lg"
      backdrop="static"
      keyboard={!isSubmitting}
    >
      <CModalHeader closeButton={!isSubmitting}>
        <CModalTitle className="d-flex align-items-center">
          <CIcon icon={cilSettings} className="me-2 text-primary" />
          Thêm thuộc tính mới
        </CModalTitle>
      </CModalHeader>

      <CForm onSubmit={handleSubmit}>
        <CModalBody className="p-4">
          {errors.submit && (
            <CAlert color="danger" className="d-flex align-items-center">
              <CIcon icon={cilX} className="me-2" />
              {errors.submit}
            </CAlert>
          )}

          <CRow>
            <CCol md={8}>
              {/* Attribute Name */}
              <div className="mb-3">
                <CFormLabel htmlFor="attributeName" className="fw-semibold">
                  Tên thuộc tính <span className="text-danger">*</span>
                </CFormLabel>
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilSettings} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    id="attributeName"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Ví dụ: Kích thước, Màu sắc, Trọng lượng..."
                    invalid={!!errors.name}
                    disabled={isSubmitting}
                    maxLength={100}
                  />
                </CInputGroup>
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
                <small className="text-muted">
                  {formData.name.length}/100 ký tự
                </small>
              </div>
            </CCol>

            <CCol md={4}>
              {/* Unit */}
              <div className="mb-3">
                <CFormLabel htmlFor="attributeUnit" className="fw-semibold">
                  Đơn vị tính
                </CFormLabel>
                <CFormInput
                  type="text"
                  id="attributeUnit"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="cm, kg, lít..."
                  invalid={!!errors.unit}
                  disabled={isSubmitting}
                  maxLength={50}
                />
                {errors.unit && (
                  <small className="text-danger">{errors.unit}</small>
                )}
              </div>
            </CCol>
          </CRow>

          {/* Data Type */}
          <div className="mb-3">
            <CFormLabel htmlFor="attributeDataType" className="fw-semibold">
              Kiểu dữ liệu <span className="text-danger">*</span>
            </CFormLabel>
            <CFormSelect
              id="attributeDataType"
              name="data_type"
              value={formData.data_type}
              onChange={handleInputChange}
              invalid={!!errors.dataType}
              disabled={isSubmitting}
            >
              <option value="">Chọn kiểu dữ liệu</option>
              {dataTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </CFormSelect>
            {errors.dataType && (
              <small className="text-danger">{errors.dataType}</small>
            )}
            {selectedDataType && (
              <small className="text-muted">
                <CIcon icon={cilInfo} className="me-1" />
                Đã chọn: {selectedDataType.label}
              </small>
            )}
          </div>

          {/* Options */}
          <hr></hr>
          {/* Preview */}
          <div className="border rounded p-3 bg-light">
            <h6 className="mb-2">
              <CIcon icon={cilInfo} className="me-2 text-info" />
              Xem trước
            </h6>
            <div className="row">
              <div className="col-md-6">
                <small className="text-muted">Tên:</small>
                <div className="fw-semibold">
                  {formData.name || <em className="text-muted">Chưa nhập</em>}
                </div>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Đơn vị:</small>
                <div className="fw-semibold">
                  {formData.unit || <em className="text-muted">Không có</em>}
                </div>
              </div>
              <div className="col-md-3">
                <small className="text-muted">Kiểu dữ liệu:</small>
                <div className="fw-semibold">
                  {selectedDataType ? (
                    <>
                      {selectedDataType.icon} {selectedDataType.label}
                    </>
                  ) : (
                    <em className="text-muted">Chưa chọn</em>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-2">
              <small className="text-muted">Tùy chọn:</small>
              <div className="d-flex gap-3">
                {formData.isRequired && (
                  <span className="badge bg-warning text-dark">Bắt buộc</span>
                )}
                {formData.isFilterable && (
                  <span className="badge bg-info">Có thể lọc</span>
                )}
                {!formData.isRequired && !formData.isFilterable && (
                  <em className="text-muted">Không có tùy chọn nào</em>
                )}
              </div>
            </div>
          </div>
        </CModalBody>

        <CModalFooter className="border-top-0">
          <div className="d-flex justify-content-between w-100">
            <CButton
              color="secondary"
              variant="outline"
              onClick={handleModalClose}
              disabled={isSubmitting}
            >
              <CIcon icon={cilX} className="me-2" />
              Hủy bỏ
            </CButton>
            <CButton
              color="primary"
              type="submit"
              disabled={
                isSubmitting || !formData.name.trim() || !formData.data_type
              }
            >
              {isSubmitting ? (
                <>
                  <CSpinner size="sm" className="me-2" />
                  Đang tạo thuộc tính...
                </>
              ) : (
                <>
                  <CIcon icon={cilCheck} className="me-2" />
                  Tạo thuộc tính
                </>
              )}
            </CButton>
          </div>
        </CModalFooter>
      </CForm>
    </CModal>
  );
}

export default AddAttributeModal;
