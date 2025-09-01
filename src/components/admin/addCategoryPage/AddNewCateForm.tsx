import {
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CInputGroup,
  CSpinner,
} from "@coreui/react";

import type { Category } from "../../../type/Category";
import { useEffect } from "react";

interface AddNewCateFormProps {
  category: Category;
  isPending: boolean;
  handleSubmit: () => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const AddNewCateForm = ({
  category,
  handleChange,
  isPending,
  handleSubmit,
}: AddNewCateFormProps) => {
  console.log("Cate change:" + JSON.stringify(category));
  useEffect(() => console.log("re-render"), []);
  return (
    <>
      <h3>Thêm danh mục</h3>
      {isPending && <h4 style={{ color: "black" }}>Đang thêm..</h4>}
      <CInputGroup className="mb-3">
        <CDropdown variant="input-group">
          <CButton type="button" color="secondary" variant="outline">
            Chọn loại cha
          </CButton>
          <CDropdownToggle color="secondary" variant="outline" split />
          <CDropdownMenu>
            <CDropdownItem href="#">Action</CDropdownItem>
            <CDropdownItem href="#">Another action</CDropdownItem>
            <CDropdownItem href="#">Something else here</CDropdownItem>
            <CDropdownDivider />
            <CDropdownItem href="#">Separated link</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CFormInput
          name="name"
          aria-label="Text input with segmented dropdown button"
          value={category.name}
          onChange={handleChange}
          placeholder="Nhập tên danh mục..."
        />
      </CInputGroup>
      <CButton color="success" disabled={isPending} onClick={handleSubmit}>
        {isPending ? (
          <>
            <CSpinner as="span" className="me-2" size="sm" aria-hidden="true" />
            <span role="status">Loading...</span>
          </>
        ) : (
          <span style={{ color: "white" }}>Thêm</span>
        )}
      </CButton>
    </>
  );
};
export default AddNewCateForm;
