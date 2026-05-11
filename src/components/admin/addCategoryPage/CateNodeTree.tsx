import React, { useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import type { NodeModel, DropOptions } from "@minoru/react-dnd-treeview";
import { useCategoryMutation } from "../../../module/admin/hook/category_page/useCategoryMutation";
import type { UpdatedCategory } from "../../../type/Category";
import { CSpinner } from "@coreui/react";

type MyTreeProps = {
  nodes: NodeModel<any>[]; // list of nodes
  onMove: (newTree: NodeModel<any>[], _options: DropOptions) => void; // callback after drag-drop
};
interface UpdateCategoryVariables {
  id: number;
  cate: UpdatedCategory | null;
}

const CategoryTree: React.FC<MyTreeProps> = ({ nodes, onMove }) => {
  const [cateValue, setCateValue] = useState<UpdateCategoryVariables>({
    id: 0,
    cate: null,
  });
  const successUpdate = () => {
    alert("Success");
  };
  const { isPending, updateProcess } = useCategoryMutation(
    cateValue.id,
    cateValue.cate,
    successUpdate,
  );

  const handleDrop = (newTree: NodeModel<any>[], _options: DropOptions) => {
    console.log(
      "API call: " + JSON.stringify(newTree),
      _options.dragSourceId,
      _options.dropTarget,
    );

    setCateValue({
      id: Number(_options.dragSourceId ?? 0),
      cate: {
        name: _options.dragSource?.text ?? "",
        parent_id:
          typeof _options.dropTargetId === "number" ? _options.dropTargetId : 0,
        slug: "updated-slug",
      },
    });

    console.log("Onchange: " + JSON.stringify(cateValue));
    //Gọi API thay đổi cho việc kéo thả
    updateProcess();
    onMove(newTree, _options);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
        <div>
          <h6 className="mb-1 fw-bold">Kéo thả cây danh mục</h6>
          <p className="text-muted mb-0 small">
            Kéo một mục và thả vào mục cha mới để cập nhật cấu trúc.
          </p>
        </div>
        {isPending && <CSpinner color="primary" size="sm" />}
      </div>

      <div
        className="rounded-4 p-3"
        style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
      >
        <div className="small text-muted mb-3">
          Mẹo: bấm vào biểu tượng mũi tên để mở/đóng nhóm con.
        </div>

        <Tree
          tree={nodes}
          rootId={0}
          render={(node, { depth, isOpen, onToggle }) => (
            <div style={{ marginLeft: depth * 18 }} className="mb-2">
              <div
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-3"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  minHeight: "42px",
                }}
              >
                {node.droppable ? (
                  <button
                    type="button"
                    className="btn btn-sm p-0 border-0 bg-transparent text-primary d-inline-flex align-items-center justify-content-center"
                    style={{ width: "20px", height: "20px" }}
                    onClick={onToggle}
                    aria-label={isOpen ? "Thu gọn" : "Mở rộng"}
                  >
                    {isOpen ? "▾" : "▸"}
                  </button>
                ) : (
                  <span style={{ width: "20px" }} />
                )}

                <span>{node.droppable ? "📁" : "📄"}</span>
                <span className="text-dark fw-semibold">{node.text}</span>

                {node.droppable && (
                  <span className="ms-auto badge rounded-pill text-bg-light border">
                    Nhóm
                  </span>
                )}
              </div>
            </div>
          )}
          dragPreviewRender={(monitorProps) => (
            <div
              className="px-3 py-2 rounded-3 shadow-sm"
              style={{ background: "#0d6efd", color: "#fff" }}
            >
              {monitorProps.item.text}
            </div>
          )}
          onDrop={handleDrop}
        />
      </div>
    </>
  );
};

export default CategoryTree;
