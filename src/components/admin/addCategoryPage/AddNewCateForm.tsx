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

import type { NodeModel } from "@minoru/react-dnd-treeview";
import { memo } from "react";

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
  console.log("re-render");
  return (
    <>
      <h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-folder-plus text-info"
          viewBox="0 0 16 16"
        >
          <path d="m.5 3 .04.87a2 2 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2m5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19q-.362.002-.683.12L1.5 2.98a1 1 0 0 1 1-.98z" />
          <path d="M13.5 9a.5.5 0 0 1 .5.5V11h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V12h-1.5a.5.5 0 0 1 0-1H13V9.5a.5.5 0 0 1 .5-.5" />
        </svg>{" "}
        Thêm danh mục
      </h3>
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
export default memo(AddNewCateForm);
