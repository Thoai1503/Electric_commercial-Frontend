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
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import categoriesTreeQuery from "../../module/admin/query/category";
import CategoryTree from "../../components/admin/addCategoryPage/CateNodeTree";

export const AddNewCate = () => {
  const [value, setValue] = useState("");

  const [nodes, setNodes] = useState<NodeModel[] | undefined>();
  const { data: categories, isPending } = useQuery(categoriesTreeQuery.list);

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
  useEffect(() => {
    setNodes(categories);
  });

  return (
    <>
      <div className="row">
        <div className="col-md-6">
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
              value={value}
              onChange={handleChange}
              placeholder="Nhập tên danh mục..."
            />
          </CInputGroup>
          <button className="btn btn-success " style={{ color: "white" }}>
            Thêm
          </button>
        </div>
        <div className="col-md-6">
          {isPending ? (
            <h3 style={{ color: "black" }}>..Loading</h3>
          ) : (
            <>
              {" "}
              <h3>Cây thư mục</h3>
              <CategoryTree nodes={nodes ?? []} onMove={handleMove} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
