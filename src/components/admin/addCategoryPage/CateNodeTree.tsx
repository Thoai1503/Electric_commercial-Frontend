import React, { useState } from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import type { NodeModel, DropOptions } from "@minoru/react-dnd-treeview";
import { useCategoryMutation } from "../../../module/admin/hook/useCategoryMutation";
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
  console.log("Onchange  2: " + JSON.stringify(cateValue));
  return (
    <>
      <h3>Cây thư mục</h3>
      {isPending && <CSpinner color="primary" />}
      <Tree
        tree={nodes}
        rootId={0}
        render={(node, { depth, isOpen, onToggle }) => (
          <div style={{ marginLeft: depth * 20 }}>
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
