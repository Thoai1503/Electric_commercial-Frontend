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
import { useState } from "react";

export const AddNewCate = () => {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
    console.log("Input value:", e.target.value);
  };

  return (
    <>
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
          value={value}
          onChange={handleChange}
          placeholder="Nhập tên danh mục..."
        />
      </CInputGroup>

      <CInputGroup>
        <CFormInput aria-label="Text input with segmented dropdown button" />
        <CDropdown alignment="end" variant="input-group">
          <CButton type="button" color="secondary" variant="outline">
            Action
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
      </CInputGroup>
    </>
  );
};
