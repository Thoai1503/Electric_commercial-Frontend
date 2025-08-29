import React from "react";
import { Tree } from "@minoru/react-dnd-treeview";
import type { NodeModel, DropOptions } from "@minoru/react-dnd-treeview";

type MyTreeProps = {
  nodes: NodeModel<any>[]; // list of nodes
  onMove: (newTree: NodeModel<any>[], _options: DropOptions) => void; // callback after drag-drop
};

const CategoryTree: React.FC<MyTreeProps> = ({ nodes, onMove }) => {
  const handleDrop = (newTree: NodeModel<any>[], _options: DropOptions) => {
    // newTree = danh sách node đã cập nhật sau khi kéo thả
    // gọi API cập nhật ParentId dựa trên newTree

    onMove(newTree, _options);
  };

  return (
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
      dragPreviewRender={(monitorProps) => <div>{monitorProps.item.text}</div>}
      onDrop={handleDrop}
    />
  );
};

export default CategoryTree;
