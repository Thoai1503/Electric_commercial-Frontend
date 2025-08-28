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
import type { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import { useState } from "react";
import MyTree from "../../components/admin/addCategoryPage/CateNodeTree";

export const AddNewCate = () => {
  const [value, setValue] = useState("");

  const [nodes, setNodes] = useState<NodeModel[]>([
    { id: 1, parent: 0, droppable: true, text: "Root" },
    { id: 2, parent: 1, droppable: true, text: "Child A" },
    { id: 3, parent: 1, droppable: true, text: "Child B" },
    { id: 4, parent: 3, droppable: false, text: "Child B-1" },
  ]);

  const handleMove = (newTree: NodeModel[], _options: DropOptions) => {
    // Cập nhật state local
    setNodes(newTree);

    // Gọi API backend để lưu ParentId mới (nếu cần)
    console.log("Updated Tree:", newTree, _options);
  };

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
      <MyTree nodes={nodes} onMove={handleMove} />
    </>
  );
};
