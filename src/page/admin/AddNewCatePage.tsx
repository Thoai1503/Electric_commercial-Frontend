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
  CBadge,
  CTabContent,
  CTabPane,
  CContainer,
} from "@coreui/react";
import type { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import { useQuery } from "@tanstack/react-query";
import CIcon from "@coreui/icons-react";
import {
  cilPlus,
  cilFolder,
  cilList,
  cilSettings,
  cilInfo,
} from "@coreui/icons";

import categoriesTreeQuery from "../../module/admin/query/category";
import attributeQuery from "../../module/admin/query/attribute";
import CategoryTree from "../../components/admin/addCategoryPage/CateNodeTree";
import { useCategoryPage } from "../../module/admin/hook/category_page/useCategoryPage";
import { CategoryList } from "../../components/admin/addCategoryPage/CategoryList";
import AddNewCateForm from "../../components/admin/addCategoryPage/AddNewCateForm";
import AttributeList from "../../components/admin/addCategoryPage/AttributeList";

export const AddNewCatePage = () => {
  const [nodes, setNodes] = useState<NodeModel[] | undefined>();
  const [activeTab, setActiveTab] = useState<"tree" | "attributes">("tree");

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

  // initialize nodes when categories arrive
  useEffect(() => {
    if (categories && !nodes) {
      setNodes(categories);
    }
  }, [categories, nodes]);

  // keep nodes in sync if categories change
  useEffect(() => {
    if (categories && isSuccess) {
      setNodes(categories);
    }
  }, [categories, isSuccess]);

  const memoCategories = useMemo(() => categories ?? [], [categories]);
  const memoAttributes = useMemo(() => attributes ?? [], [attributes]);

  const handleMove = useCallback(
    (newTree: NodeModel[], _options: DropOptions) => {
      setNodes(newTree);
    },
    [],
  );

  const loading = isLoadingCategories || isLoadingAttr;
  const error = isCategoryError || isAttrError;

  // Statistics calculations
  const stats = useMemo(() => {
    const total = memoCategories.length;
    const rootCategories = memoCategories.filter(
      (cate) => cate.parent === 0,
    ).length;
    const childCategories = total - rootCategories;
    const totalAttributes = memoAttributes.length;

    return {
      total,
      rootCategories,
      childCategories,
      totalAttributes,
    };
  }, [memoCategories, memoAttributes]);

  const LoadingSpinner = () => (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <CSpinner color="primary" size="sm" />
        <div className="mt-2 text-muted">Đang tải dữ liệu...</div>
      </div>
    </div>
  );

  const ErrorAlert = () => (
    <CAlert color="danger" className="d-flex align-items-center">
      <CIcon icon={cilInfo} className="me-2" />
      <div>
        <strong>Lỗi!</strong> Không thể tải dữ liệu danh mục hoặc thuộc tính.
        <br />
        <small>Vui lòng thử lại hoặc liên hệ quản trị viên.</small>
      </div>
    </CAlert>
  );

  return (
    <CContainer fluid className="px-0">
      <div className="mt-4 mb-5">
        <CCard
          className="border-0 shadow mb-4"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
          }}
        >
          <CCardBody className="p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  Quản trị danh mục
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Quản lý danh mục
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 700 }}>
                  Tạo mới danh mục, quản lý cây phân cấp và gán thuộc tính theo
                  một bố cục thống nhất, dễ theo dõi.
                </p>
              </div>
              <CBadge
                color="primary"
                shape="rounded-pill"
                className="px-3 py-2 fs-6"
              >
                {loading ? "Đang tải..." : `${stats.total} danh mục`}
              </CBadge>
            </div>
          </CCardBody>
        </CCard>

        <CRow className="g-3 mb-4">
          <CCol xs={6} md={3}>
            <div
              className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "3px solid #0d6efd",
              }}
            >
              <div className="text-muted small mb-1">Tổng danh mục</div>
              <div className="h4 mb-0 text-dark fw-bold">{stats.total}</div>
            </div>
          </CCol>
          <CCol xs={6} md={3}>
            <div
              className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "3px solid #198754",
              }}
            >
              <div className="text-muted small mb-1">Danh mục gốc</div>
              <div className="h4 mb-0 text-dark fw-bold">
                {stats.rootCategories}
              </div>
            </div>
          </CCol>
          <CCol xs={6} md={3}>
            <div
              className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "3px solid #f59f00",
              }}
            >
              <div className="text-muted small mb-1">Danh mục con</div>
              <div className="h4 mb-0 text-dark fw-bold">
                {stats.childCategories}
              </div>
            </div>
          </CCol>
          <CCol xs={6} md={3}>
            <div
              className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm"
              style={{
                border: "1px solid #e2e8f0",
                borderTop: "3px solid #0dcaf0",
              }}
            >
              <div className="text-muted small mb-1">Thuộc tính</div>
              <div className="h4 mb-0 text-dark fw-bold">
                {stats.totalAttributes}
              </div>
            </div>
          </CCol>
        </CRow>

        <CRow className="g-4">
          <CCol xs={12} xl={4}>
            <CCard className="h-100 shadow-sm border-0">
              <CCardHeader className="bg-white border-bottom d-flex justify-content-between align-items-center py-3">
                <div className="d-flex align-items-center text-dark fw-bold">
                  <CIcon icon={cilPlus} className="me-2 text-primary" />
                  Thêm danh mục mới
                </div>
                <CButton
                  color="primary"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isP}
                  className="d-inline-flex align-items-center"
                >
                  {isP ? (
                    <>
                      <CSpinner size="sm" className="me-2" />
                      Đang thêm...
                    </>
                  ) : (
                    <>
                      <CIcon icon={cilPlus} className="me-1" />
                      Thêm
                    </>
                  )}
                </CButton>
              </CCardHeader>
              <CCardBody className="p-4">
                <AddNewCateForm
                  setCate={setCate}
                  categoryList={memoCategories}
                  category={cate}
                  handleChange={handleChange}
                  isPending={isP}
                  handleSubmit={handleSubmit}
                />
              </CCardBody>
            </CCard>
          </CCol>

          <CCol xs={12} xl={8}>
            <CCard
              className="shadow-sm border-0"
              style={{ minHeight: "600px" }}
            >
              <CCardBody className="p-4">
                <div className="d-flex flex-wrap gap-2 mb-4">
                  <CButton
                    type="button"
                    color={activeTab === "tree" ? "primary" : "light"}
                    className={`rounded-pill px-3 d-inline-flex align-items-center gap-2 ${
                      activeTab === "tree"
                        ? "text-white"
                        : "border border-primary-subtle text-primary"
                    }`}
                    onClick={() => setActiveTab("tree")}
                  >
                    <CIcon icon={cilFolder} />
                    Cây danh mục
                  </CButton>
                  <CButton
                    type="button"
                    color={activeTab === "attributes" ? "primary" : "light"}
                    className={`rounded-pill px-3 d-inline-flex align-items-center gap-2 ${
                      activeTab === "attributes"
                        ? "text-white"
                        : "border border-primary-subtle text-primary"
                    }`}
                    onClick={() => setActiveTab("attributes")}
                  >
                    <CIcon icon={cilSettings} />
                    Thuộc tính
                    <CBadge
                      color={activeTab === "attributes" ? "light" : "primary"}
                      shape="rounded-pill"
                    >
                      {memoAttributes.length}
                    </CBadge>
                  </CButton>
                </div>

                {loading ? (
                  <LoadingSpinner />
                ) : error ? (
                  <ErrorAlert />
                ) : (
                  <CTabContent>
                    <CTabPane visible={activeTab === "tree"}>
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0 d-flex align-items-center fw-bold">
                            <CIcon
                              icon={cilFolder}
                              className="me-2 text-success"
                            />
                            Cây danh mục
                          </h5>
                          <CBadge color="primary" shape="rounded-pill">
                            {memoCategories.length} mục
                          </CBadge>
                        </div>
                        <div
                          className="border rounded-4 p-3"
                          style={{
                            background: "#f8fafc",
                            borderColor: "#e2e8f0",
                          }}
                        >
                          <CategoryTree
                            nodes={nodes ?? memoCategories}
                            onMove={handleMove}
                          />
                        </div>
                      </div>

                      <hr className="my-4" />

                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h5 className="mb-0 d-flex align-items-center fw-bold">
                            <CIcon icon={cilList} className="me-2 text-info" />
                            Danh sách chi tiết
                          </h5>
                        </div>
                        <div
                          className="border rounded-4 p-3"
                          style={{ borderColor: "#e2e8f0" }}
                        >
                          <CategoryList
                            category={memoCategories}
                            attribute={memoAttributes}
                          />
                        </div>
                      </div>
                    </CTabPane>

                    <CTabPane visible={activeTab === "attributes"}>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0 d-flex align-items-center fw-bold">
                          <CIcon
                            icon={cilSettings}
                            className="me-2 text-warning"
                          />
                          Danh sách thuộc tính
                        </h5>
                        <CBadge color="warning" shape="rounded-pill">
                          {memoAttributes.length} thuộc tính
                        </CBadge>
                      </div>
                      <div
                        className="border rounded-4 p-3"
                        style={{ borderColor: "#e2e8f0" }}
                      >
                        <AttributeList attributes={attributes || []} />
                      </div>
                    </CTabPane>
                  </CTabContent>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {isSuccess && (
          <CRow className="mt-3">
            <CCol>
              <CAlert
                color="success"
                dismissible
                className="shadow-sm border-0"
              >
                <CIcon icon={cilInfo} className="me-2" />
                <strong>Thành công!</strong> Danh mục đã được thêm thành công.
              </CAlert>
            </CCol>
          </CRow>
        )}
      </div>
    </CContainer>
  );
};
