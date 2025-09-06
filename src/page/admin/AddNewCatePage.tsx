import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
} from "@coreui/react";
import type { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import { useQuery } from "@tanstack/react-query";

import categoriesTreeQuery from "../../module/admin/query/category";
import attributeQuery from "../../module/admin/query/attribute";
import CategoryTree from "../../components/admin/addCategoryPage/CateNodeTree";
import { useCategoryPage } from "../../module/admin/hook/useCategoryPage";
import { CategoryList } from "../../components/admin/addCategoryPage/CategoryList";
import AddNewCateForm from "../../components/admin/addCategoryPage/AddNewCateForm";

export const AddNewCatePage = () => {
  const [nodes, setNodes] = useState<NodeModel[] | undefined>();

  const { handleSubmit, handleChange, setCate, cate, isP, isSuccess } =
    useCategoryPage();

  const {
    data: categories,
    isPending: isLoadingCategories,
    isError: isCategoryError,
  } = useQuery(categoriesTreeQuery.list);
  const {
    data: attributes,
    isPending: isLoadingAttr,
    isError: isAttrError,
  } = useQuery(attributeQuery.list);

  // initialize nodes when categories arrive (only once unless categories change)
  useEffect(() => {
    if (categories && !nodes) {
      setNodes(categories);
    }
  }, [categories, nodes]);

  // keep nodes in sync if categories change in backend (optional)
  useEffect(() => {
    if (categories && isSuccess) {
      setNodes(categories);
    }
  }, [categories, isSuccess]);

  // memoized view-data to avoid unnecessary renders
  const memoCategories = useMemo(() => categories ?? [], [categories]);
  const memoAttributes = useMemo(() => attributes ?? [], [attributes]);

  const handleMove = useCallback(
    (newTree: NodeModel[], _options: DropOptions) => {
      setNodes(newTree);
      // TODO: call backend to persist parent changes; keep this action debounced if needed.
      console.log("Updated Tree:", newTree, _options);
    },
    []
  );

  // combined loading & error states
  const loading = isLoadingCategories || isLoadingAttr;
  const error = isCategoryError || isAttrError;

  return (
    <CRow className="g-3">
      <CCol xs={12} lg={3}>
        <CCard className="h-100">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Thêm danh mục</strong>
            <div>
              <CButton
                color="primary"
                size="sm"
                onClick={handleSubmit}
                disabled={isP}
              >
                {isP ? (
                  <>
                    <CSpinner size="sm" className="me-2" /> Đang thêm...
                  </>
                ) : (
                  "Thêm"
                )}
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <AddNewCateForm
              setCate={setCate}
              categoryList={memoCategories}
              category={cate}
              handleChange={handleChange}
              isPending={isP}
              handleSubmit={handleSubmit}
            />
            <div className="mt-4">
              {" "}
              <h4>Danh sách hiện có:</h4>
              <ul>
                <li>
                  Tổng danh mục: {memoCategories.length} | Thuộc tính:{" "}
                  {memoAttributes.length}
                </li>
                <li>
                  Danh mục gốc:{" "}
                  {memoCategories.filter((cate) => cate.parent === 0).length}
                </li>
                <li>
                  Danh mục con:{" "}
                  {memoCategories.filter((cate) => cate.parent !== 0).length}
                </li>
              </ul>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol xs={12} lg={9}>
        <CCard className="mb-3" style={{ height: "50%" }}>
          <CCardHeader>
            <strong>Danh sách & Trình xem cây</strong>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: 200 }}
              >
                <CSpinner color="primary" />
              </div>
            ) : error ? (
              <CAlert color="danger">
                Không thể tải dữ liệu danh mục / thuộc tính.
              </CAlert>
            ) : (
              <>
                <div style={{ marginBottom: 16 }}>
                  <CategoryTree
                    nodes={nodes ?? memoCategories}
                    onMove={handleMove}
                  />
                </div>

                <div style={{ marginTop: 12 }}>
                  <CategoryList
                    category={memoCategories}
                    attribute={memoAttributes}
                  />
                </div>
              </>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};
