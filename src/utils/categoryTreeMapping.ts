import type { NodeModel } from "@minoru/react-dnd-treeview";
import type { CategoryReponse } from "../type/Category";

export const categoryTreeMapping = (data: CategoryReponse[]): NodeModel[] => {
  if (!data || data.length === 0) return [];

  return data.map((item) => ({
    id: item.id,
    parent: item.parent_id,
    text: item.name,
    droppable: true,
  }));
};
