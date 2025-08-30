import {
  CButton,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CInputGroup,
} from "@coreui/react";
import { useCategoryPage } from "../../../module/admin/hook/useCategoryPage";

export const AddNewCate = () => {
  const { cate, handleChange } = useCategoryPage();
  return (
    <>
      <h3>Thêm danh mục</h3>
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
          aria-label="Text input with segmented dropdown button"
          value={cate.name}
          onChange={handleChange}
          placeholder="Nhập tên danh mục..."
        />
      </CInputGroup>
    </>
  );
};
