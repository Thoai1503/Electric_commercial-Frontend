import { CSpinner } from "@coreui/react";
import type { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import categoriesTreeQuery from "../../module/admin/query/category";
import CategoryTree from "../../components/admin/addCategoryPage/CateNodeTree";
import { useCategoryPage } from "../../module/admin/hook/useCategoryPage";
import { CategoryList } from "../../components/admin/addCategoryPage/CategoryList";
import AddNewCateForm from "../../components/admin/addCategoryPage/AddNewCateForm";
import attributeQuery from "../../module/admin/query/attribute";
export const AddNewCatePage = () => {
  const [nodes, setNodes] = useState<NodeModel[] | undefined>();

  const { handleSubmit, handleChange, setCate, cate, isP, isSuccess } =
    useCategoryPage();
  const { data: categories, isPending } = useQuery(categoriesTreeQuery.list);
  const { data: attributes, isPending: isPendingAttr } = useQuery(
    attributeQuery.list
  );
  console.log("Attributes:" + JSON.stringify(attributes));

  const handleMove = (newTree: NodeModel[], _options: DropOptions) => {
    // Cập nhật state local
    setNodes(newTree);
    // Gọi API backend để lưu ParentId mới (nếu cần)
    console.log("Updated Tree:", newTree, _options);
  };

  console.log("Nodes:", nodes);

  useEffect(() => {
    if (isSuccess) setNodes(categories);
  }, [isSuccess]);
  // useEffect(() => {
  //   setNodes(categories);
  // }, [categories]);

  return (
    <>
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <AddNewCateForm
                setCate={setCate}
                categoryList={categories ?? []}
                category={cate}
                handleChange={handleChange}
                isPending={isP}
                handleSubmit={handleSubmit}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          {isPending ? (
            <CSpinner color="primary" />
          ) : (
            <>
              <CategoryTree nodes={categories ?? []} onMove={handleMove} />
            </>
          )}
        </div>
        {!isPending && !isPendingAttr && (
          <CategoryList category={categories ?? []} attribute={attributes} />
        )}
      </div>
    </>
  );
};
