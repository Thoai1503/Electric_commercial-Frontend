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
    successUpdate
  );

  const handleDrop = (newTree: NodeModel<any>[], _options: DropOptions) => {
    console.log(
      "API call: " + JSON.stringify(newTree),
      _options.dragSourceId,
      _options.dropTarget
    );

    setCateValue({
      id: Number(_options.dragSourceId ?? 0),
      cate: {
        name: _options.dragSource?.text ?? "",
        parent_id:
          typeof _options.dropTargetId === "number" ? _options.dropTargetId : 0,
      },
    });

    console.log("Onchange: " + JSON.stringify(cateValue));
    //Gọi API thay đổi cho việc kéo thả
    updateProcess();
    onMove(newTree, _options);
  };

  return (
    <>
      <h3>
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-diagram-3-fill text-info"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H14a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 2 7h5.5V6A1.5 1.5 0 0 1 6 4.5zm-6 8A1.5 1.5 0 0 1 1.5 10h1A1.5 1.5 0 0 1 4 11.5v1A1.5 1.5 0 0 1 2.5 14h-1A1.5 1.5 0 0 1 0 12.5zm6 0A1.5 1.5 0 0 1 7.5 10h1a1.5 1.5 0 0 1 1.5 1.5v1A1.5 1.5 0 0 1 8.5 14h-1A1.5 1.5 0 0 1 6 12.5zm6 0a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5z"
          />
        </svg>{" "}
        Cây thư mục
      </h3>
      <p className="text-danger mb-1">
        * Kéo thả để cập nhật thay đổi cấu trúc cây
      </p>
      {isPending && <CSpinner color="primary" />}

      <Tree
        tree={nodes}
        rootId={0}
        render={(node, { depth, isOpen, onToggle }) => (
          <div className="col-lg-3" style={{ marginLeft: depth * 20 }}>
            {node.droppable && (
              <span
                style={{ cursor: "pointer", marginRight: 5 }}
                onClick={onToggle}
              >
                {isOpen ? "📂" : "📁"}
              </span>
            )}
            {node.text}
          </div>
        )}
        dragPreviewRender={(monitorProps) => (
          <div>{monitorProps.item.text}</div>
        )}
        onDrop={handleDrop}
      />
    </>
  );
};

export default CategoryTree;
