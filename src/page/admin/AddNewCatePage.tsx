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
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCollapse,
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
  cilChevronTop,
  cilChevronRight,
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
  const [showStats, setShowStats] = useState(true);

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
      console.log("Updated Tree:", newTree, _options);
    },
    []
  );

  const loading = isLoadingCategories || isLoadingAttr;
  const error = isCategoryError || isAttrError;

  // Statistics calculations
  const stats = useMemo(() => {
    const total = memoCategories.length;
    const rootCategories = memoCategories.filter(
      (cate) => cate.parent === 0
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

  const StatsCard = () => (
    <CCard className="mb-3 border-0 shadow-sm">
      <CCardHeader
        className="bg-light cursor-pointer d-flex justify-content-between align-items-center"
        onClick={() => setShowStats(!showStats)}
      >
        <div className="d-flex align-items-center">
          <CIcon icon={cilInfo} className="me-2 text-info" />
          <strong>Thống kê</strong>
        </div>
        <CIcon
          icon={showStats ? cilChevronTop : cilChevronRight}
          className="text-muted"
        />
      </CCardHeader>
      <CCollapse visible={showStats}>
        <CCardBody className="py-3">
          <CRow className="g-3">
            <CCol xs={6} md={3}>
              <div className="text-center">
                <div className="h4 mb-0 text-primary">{stats.total}</div>
                <small className="text-muted">Tổng danh mục</small>
              </div>
            </CCol>
            <CCol xs={6} md={3}>
              <div className="text-center">
                <div className="h4 mb-0 text-success">
                  {stats.rootCategories}
                </div>
                <small className="text-muted">Danh mục gốc</small>
              </div>
            </CCol>
            <CCol xs={6} md={3}>
              <div className="text-center">
                <div className="h4 mb-0 text-warning">
                  {stats.childCategories}
                </div>
                <small className="text-muted">Danh mục con</small>
              </div>
            </CCol>
            <CCol xs={6} md={3}>
              <div className="text-center">
                <div className="h4 mb-0 text-info">{stats.totalAttributes}</div>
                <small className="text-muted">Thuộc tính</small>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCollapse>
    </CCard>
  );

  return (
    <CContainer fluid className="px-4">
      <CRow className="mb-4">
        <CCol>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Quản lý danh mục</h2>
              <p className="text-muted mb-0">
                Thêm mới và quản lý cây danh mục sản phẩm
              </p>
            </div>
            <CBadge color="info" shape="rounded-pill">
              {loading ? "Đang tải..." : `${stats.total} danh mục`}
            </CBadge>
          </div>
        </CCol>
      </CRow>

      <StatsCard />

      <CRow className="g-4">
        {/* Left Panel - Add Category Form */}
        <CCol xs={12} xl={4}>
          <CCard className="h-100 shadow-sm border-0">
            <CCardHeader className="bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <CIcon icon={cilPlus} className="me-2" />
                  <strong>Thêm danh mục mới</strong>
                </div>
                <CButton
                  color="light"
                  variant="outline"
                  size="sm"
                  onClick={handleSubmit}
                  disabled={isP}
                  className="border-0"
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
              </div>
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

        {/* Right Panel - Tree View and Attributes */}
        <CCol xs={12} xl={8}>
          <CCard className="shadow-sm border-0" style={{ minHeight: "600px" }}>
            <CCardHeader className="border-bottom-0 pb-0">
              <CNav variant="pills" className="card-header-pills">
                <CNavItem>
                  <CNavLink
                    active={activeTab === "tree"}
                    onClick={() => setActiveTab("tree")}
                    className="d-flex align-items-center cursor-pointer"
                  >
                    <CIcon icon={cilFolder} className="me-2" />
                    Cây danh mục
                  </CNavLink>
                </CNavItem>
                <CNavItem>
                  <CNavLink
                    active={activeTab === "attributes"}
                    onClick={() => setActiveTab("attributes")}
                    className="d-flex align-items-center cursor-pointer"
                  >
                    <CIcon icon={cilSettings} className="me-2" />
                    Thuộc tính
                    <CBadge color="secondary" className="ms-2">
                      {memoAttributes.length}
                    </CBadge>
                  </CNavLink>
                </CNavItem>
              </CNav>
            </CCardHeader>

            <CCardBody className="p-4">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorAlert />
              ) : (
                <CTabContent>
                  <CTabPane visible={activeTab === "tree"}>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0 d-flex align-items-center">
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
                      <div className="border rounded p-3 bg-light">
                        <CategoryTree
                          nodes={nodes ?? memoCategories}
                          onMove={handleMove}
                        />
                      </div>
                    </div>

                    <hr className="my-4" />

                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="mb-0 d-flex align-items-center">
                          <CIcon icon={cilList} className="me-2 text-info" />
                          Danh sách chi tiết
                        </h5>
                      </div>
                      <div className="border rounded p-3">
                        <CategoryList
                          category={memoCategories}
                          attribute={memoAttributes}
                        />
                      </div>
                    </div>
                  </CTabPane>

                  <CTabPane visible={activeTab === "attributes"}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="mb-0 d-flex align-items-center">
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
                    <div className="border rounded p-3">
                      <AttributeList attributes={attributes || []} />
                    </div>
                  </CTabPane>
                </CTabContent>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Success/Error Messages */}
      {isSuccess && (
        <CRow className="mt-3">
          <CCol>
            <CAlert color="success" dismissible>
              <CIcon icon={cilInfo} className="me-2" />
              <strong>Thành công!</strong> Danh mục đã được thêm thành công.
            </CAlert>
          </CCol>
        </CRow>
      )}
    </CContainer>
  );
};
