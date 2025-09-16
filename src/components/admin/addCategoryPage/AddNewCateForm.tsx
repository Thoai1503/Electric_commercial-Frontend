import {
  CButton,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CSpinner,
  CAlert,
  CCard,
  CCardBody,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilFolder, cilPlus, cilCheck, cilX } from "@coreui/icons";

import type { Category } from "../../../type/Category";
import type { NodeModel } from "@minoru/react-dnd-treeview";
import { memo, useState } from "react";

interface AddNewCateFormProps {
  categoryList: NodeModel[];
  category: Category;
  isPending: boolean;
  setCate: (cate: Category) => void;
  handleSubmit: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AddNewCateForm = ({
  categoryList,
  category,
  isPending,
  setCate,
  handleChange,
  handleSubmit,
}: AddNewCateFormProps) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!category.name.trim()) {
      newErrors.name = "Tên danh mục là bắt buộc";
    }

    if (category.name.length > 100) {
      newErrors.name = "Tên danh mục không được vượt quá 100 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitWithValidation = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  const handleParentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parentId = parseInt(e.target.value) || 0;
    setCate({ ...category, parent_id: parentId });
  };

  const selectedParent = categoryList.find(
    (cate) => cate.id === category.parent_id
  );

  return (
    <CCard className="border-0 shadow-sm">
      <CCardBody className="p-4">
        <div className="mb-4">
          <h5 className="d-flex align-items-center mb-3">
            <CIcon icon={cilFolder} className="me-2 text-primary" />
            Thông tin danh mục
          </h5>

          {isPending && (
            <CAlert color="info" className="d-flex align-items-center py-2">
              <CSpinner size="sm" className="me-2" />
              <small>Đang xử lý yêu cầu...</small>
            </CAlert>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitWithValidation();
          }}
        >
          {/* Parent Category Selection */}
          <div className="mb-3">
            <CFormLabel htmlFor="parentCategory" className="fw-semibold">
              Danh mục cha
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilFolder} />
              </CInputGroupText>
              <CFormSelect
                id="parentCategory"
                value={category.parent_id || 0}
                onChange={handleParentChange}
                disabled={isPending}
              >
                <option value={0}>📁 Danh mục gốc</option>
                {categoryList.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    📂 {cate.text}
                  </option>
                ))}
              </CFormSelect>
            </CInputGroup>
            <small className="text-muted">
              {selectedParent
                ? `Sẽ tạo danh mục con trong "${selectedParent.text}"`
                : "Sẽ tạo danh mục gốc"}
            </small>
          </div>

          {/* Category Name */}
          <div className="mb-4">
            <CFormLabel htmlFor="categoryName" className="fw-semibold">
              Tên danh mục <span className="text-danger">*</span>
            </CFormLabel>
            <CInputGroup>
              <CInputGroupText>
                <CIcon icon={cilPlus} />
              </CInputGroupText>
              <CFormInput
                type="text"
                id="categoryName"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Nhập tên danh mục..."
                invalid={!!errors.name}
                disabled={isPending}
                maxLength={100}
              />
            </CInputGroup>
            {errors.name && (
              <small className="text-danger">
                <CIcon icon={cilX} className="me-1" />
                {errors.name}
              </small>
            )}
            <small className="text-muted">
              {category.name.length}/100 ký tự
            </small>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <CButton
              color="primary"
              size="lg"
              disabled={isPending || !category.name.trim()}
              onClick={handleSubmitWithValidation}
              className="fw-semibold"
            >
              {isPending ? (
                <>
                  <CSpinner size="sm" className="me-2" />
                  Đang thêm danh mục...
                </>
              ) : (
                <>
                  <CIcon icon={cilCheck} className="me-2" />
                  Thêm danh mục
                </>
              )}
            </CButton>
          </div>

          {/* Help Text */}
          <div className="mt-3 p-3 bg-light rounded">
            <small className="text-muted">
              <strong>💡 Gợi ý:</strong>
              <ul className="mb-0 mt-2">
                <li>Tên danh mục nên ngắn gọn và dễ hiểu</li>
                <li>Chọn danh mục cha phù hợp để tổ chức cây danh mục tốt</li>
                <li>Tránh tạo danh mục trùng lặp</li>
              </ul>
            </small>
          </div>
        </form>
      </CCardBody>
    </CCard>
  );
};

export default memo(AddNewCateForm);
