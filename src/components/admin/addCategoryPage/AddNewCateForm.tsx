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
import type { NodeModel } from "@minoru/react-dnd-treeview";

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
  console.log("Cate change:" + JSON.stringify(category));
  useEffect(() => console.log("re-render"), []);
  return (
    <>
      <h3>Thêm danh mục</h3>
      {isPending && <h4 style={{ color: "black" }}>Đang thêm..</h4>}
      <CInputGroup className="mb-3">
        <CDropdown variant="input-group">
          <CButton type="button" color="secondary" variant="outline">
            {category.parent_id !== 0
              ? categoryList.find((cate) => cate.id === category.parent_id)
                  ?.text
              : "Chọn danh mục cha (mặc định là gốc)"}
          </CButton>
          <CDropdownToggle color="secondary" variant="outline" split />

          <CDropdownMenu>
            <CDropdownItem
              onClick={() => setCate({ ...category, parent_id: 0 })}
            >
              Danh mục gốc
            </CDropdownItem>
            {categoryList.map((cate) => (
              <CDropdownItem
                key={cate.id}
                onClick={() =>
                  setCate({ ...category, parent_id: Number(cate.id) })
                }
              >
                {cate.text}
              </CDropdownItem>
            ))}

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
