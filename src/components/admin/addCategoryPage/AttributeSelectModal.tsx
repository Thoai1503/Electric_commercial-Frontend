import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner,
  CAlert,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormCheck,
  CBadge,
  CPagination,
  CPaginationItem,
  CCard,
  CCardBody,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilSettings,
  cilCheck,
  cilX,
  cilSearch,
  cilFilter,
  cilCheckCircle,
  cilXCircle,
} from "@coreui/icons";

import attributeQuery from "../../../module/admin/query/attribute";
import { useAttributeSelectModal } from "../../../module/admin/hook/category_page/useAttributeSelectModal";

interface AttributeSelectModalProps {
  id: number;
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
}

interface AttributeWithSelection {
  id: number;
  name: string;
  slug?: string;
  is_selected: boolean;
  description?: string;
}

function AttributeSelectModal({
  id,
  show,
  handleClose,
}: AttributeSelectModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterType, setFilterType] = useState<
    "all" | "selected" | "available"
  >("all");
  const itemsPerPage = 8;

  const { setSelectedList, handleChange, handleSubmit, isPendingCreate } =
    useAttributeSelectModal(id, handleClose);

  const {
    data: attributes,
    isPending,
    error,
  } = useQuery(attributeQuery.selectedByCategoryId(id));

  // Filter and search attributes
  const filteredAttributes = useMemo(() => {
    if (!attributes) return [];

    let filtered = attributes.filter(
      (attr: AttributeWithSelection) =>
        attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (attr.slug &&
          attr.slug.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Apply filter type
    if (filterType === "selected") {
      filtered = filtered.filter((attr) => attr.is_selected);
    } else if (filterType === "available") {
      filtered = filtered.filter((attr) => !attr.is_selected);
    }

    return filtered;
  }, [attributes, searchTerm, filterType]);

  // Pagination
  const totalPages = Math.ceil(filteredAttributes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAttributes = filteredAttributes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const selectedCount = useMemo(() => {
    return (
      attributes?.filter((attr: AttributeWithSelection) => attr.is_selected)
        .length || 0
    );
  }, [attributes]);

  const newSelectionCount = useMemo(() => {
    return filteredAttributes.filter((attr) => !attr.is_selected).length;
  }, [filteredAttributes]);

  const handleModalClose = () => {
    handleClose();
    setSelectedList([]);
    setSearchTerm("");
    setCurrentPage(1);
    setFilterType("all");
  };

  const handleFilterChange = (type: "all" | "selected" | "available") => {
    setFilterType(type);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const getFilterBadge = (type: "all" | "selected" | "available") => {
    switch (type) {
      case "all":
        return { color: "secondary", count: attributes?.length || 0 };
      case "selected":
        return { color: "success", count: selectedCount };
      case "available":
        return { color: "info", count: newSelectionCount };
    }
  };

  return (
    <CModal
      visible={show}
      onClose={handleModalClose}
      size="xl"
      backdrop="static"
      scrollable
    >
      <CModalHeader closeButton={!isPendingCreate}>
        <CModalTitle className="d-flex align-items-center">
          <CIcon icon={cilSettings} className="me-2 text-primary" />
          Chọn thuộc tính cho danh mục (ID: {id})
        </CModalTitle>
      </CModalHeader>

      <CModalBody className="p-4">
        {error && (
          <CAlert color="danger" className="d-flex align-items-center">
            <CIcon icon={cilXCircle} className="me-2" />
            <div>
              <strong>Lỗi!</strong> Không thể tải danh sách thuộc tính.
              <br />
              <small>Vui lòng thử lại hoặc liên hệ quản trị viên.</small>
            </div>
          </CAlert>
        )}

        {isPending ? (
          <div className="text-center py-5">
            <CSpinner color="primary" size="sm" />
            <div className="mt-3 text-muted">
              Đang tải danh sách thuộc tính...
            </div>
          </div>
        ) : (
          <>
            {/* Search and Filter Controls */}
            <div className="row mb-4">
              <div className="col-md-6">
                <CInputGroup>
                  <CInputGroupText>
                    <CIcon icon={cilSearch} />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Tìm kiếm thuộc tính..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </CInputGroup>
              </div>
              <div className="col-md-6">
                <div className="d-flex gap-2">
                  {(["all", "selected", "available"] as const).map((type) => {
                    const badge = getFilterBadge(type);
                    return (
                      <CButton
                        key={type}
                        color={filterType === type ? "primary" : "secondary"}
                        variant={filterType === type ? undefined : "outline"}
                        size="sm"
                        onClick={() => handleFilterChange(type)}
                        className="d-flex align-items-center"
                      >
                        <CIcon icon={cilFilter} className="me-1" />
                        {type === "all" && "Tất cả"}
                        {type === "selected" && "Đã chọn"}
                        {type === "available" && "Có thể chọn"}
                        <CBadge
                          color={badge.color}
                          shape="rounded-pill"
                          className="ms-2"
                        >
                          {badge.count}
                        </CBadge>
                      </CButton>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="row mb-4">
              <div className="col-md-3">
                <CCard className="text-center border-0 bg-light">
                  <CCardBody className="py-3">
                    <div className="h5 mb-0 text-primary">
                      {attributes?.length || 0}
                    </div>
                    <small className="text-muted">Tổng thuộc tính</small>
                  </CCardBody>
                </CCard>
              </div>
              <div className="col-md-3">
                <CCard className="text-center border-0 bg-light">
                  <CCardBody className="py-3">
                    <div className="h5 mb-0 text-success">{selectedCount}</div>
                    <small className="text-muted">Đã áp dụng</small>
                  </CCardBody>
                </CCard>
              </div>
              <div className="col-md-3">
                <CCard className="text-center border-0 bg-light">
                  <CCardBody className="py-3">
                    <div className="h5 mb-0 text-info">
                      {filteredAttributes.length}
                    </div>
                    <small className="text-muted">Kết quả tìm kiếm</small>
                  </CCardBody>
                </CCard>
              </div>
              <div className="col-md-3">
                <CCard className="text-center border-0 bg-light">
                  <CCardBody className="py-3">
                    <div className="h5 mb-0 text-warning">
                      {currentPage}/{totalPages}
                    </div>
                    <small className="text-muted">Trang hiện tại</small>
                  </CCardBody>
                </CCard>
              </div>
            </div>

            {/* Attributes Table */}
            {filteredAttributes.length === 0 ? (
              <CAlert color="info" className="text-center">
                <CIcon icon={cilSearch} className="me-2" />
                {searchTerm || filterType !== "all"
                  ? "Không tìm thấy thuộc tính nào phù hợp với bộ lọc"
                  : "Không có thuộc tính nào"}
              </CAlert>
            ) : (
              <>
                <div className="table-responsive">
                  <CTable hover className="mb-0">
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell style={{ width: "8%" }}>
                          ID
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ width: "30%" }}>
                          Tên thuộc tính
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ width: "25%" }}>
                          Slug/Mô tả
                        </CTableHeaderCell>
                        <CTableHeaderCell style={{ width: "15%" }}>
                          Trạng thái
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{ width: "22%" }}
                          className="text-center"
                        >
                          Thao tác
                        </CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {currentAttributes.map((attr: AttributeWithSelection) => (
                        <CTableRow
                          key={attr.id}
                          className={attr.is_selected ? "table-success" : ""}
                        >
                          <CTableDataCell>
                            <CBadge color="secondary" shape="rounded-pill">
                              {attr.id}
                            </CBadge>
                          </CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex align-items-center">
                              {attr.is_selected && (
                                <CIcon
                                  icon={cilCheckCircle}
                                  className="text-success me-2"
                                />
                              )}
                              <span className="fw-semibold">{attr.name}</span>
                            </div>
                          </CTableDataCell>
                          <CTableDataCell>
                            <code className="small text-muted">
                              {attr.slug || "Không có slug"}
                            </code>
                          </CTableDataCell>
                          <CTableDataCell>
                            {attr.is_selected ? (
                              <CBadge color="success" shape="rounded-pill">
                                <CIcon icon={cilCheck} className="me-1" />
                                Đã áp dụng
                              </CBadge>
                            ) : (
                              <CBadge color="secondary" shape="rounded-pill">
                                Chưa áp dụng
                              </CBadge>
                            )}
                          </CTableDataCell>
                          <CTableDataCell className="text-center">
                            {attr.is_selected ? (
                              <div className="d-flex align-items-center justify-content-center">
                                <CIcon
                                  icon={cilCheckCircle}
                                  className="text-success me-2"
                                />
                                <span className="text-success small">
                                  Đã áp dụng
                                </span>
                              </div>
                            ) : (
                              <CFormCheck
                                id={`attr-${attr.id}`}
                                label="Chọn thuộc tính này"
                                onChange={(event) =>
                                  handleChange(event, attr.id)
                                }
                                className="d-flex align-items-center justify-content-center"
                              />
                            )}
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    <CPagination>
                      <CPaginationItem
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        Trước
                      </CPaginationItem>

                      {[...Array(totalPages)].map((_, index) => {
                        const page = index + 1;
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                        ) {
                          return (
                            <CPaginationItem
                              key={page}
                              active={page === currentPage}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </CPaginationItem>
                          );
                        } else if (
                          page === currentPage - 3 ||
                          page === currentPage + 3
                        ) {
                          return (
                            <CPaginationItem key={page}>...</CPaginationItem>
                          );
                        }
                        return null;
                      })}

                      <CPaginationItem
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Sau
                      </CPaginationItem>
                    </CPagination>
                  </div>
                )}
              </>
            )}

            {/* Help Text */}
            <CAlert color="info" className="mt-4">
              <CIcon icon={cilCheck} className="me-2" />
              <strong>Hướng dẫn:</strong>
              <ul className="mb-0 mt-2">
                <li>✅ Thuộc tính màu xanh đã được áp dụng cho danh mục này</li>
                <li>☑️ Chọn các thuộc tính mới mà bạn muốn thêm</li>
                <li>🔍 Sử dụng tìm kiếm và bộ lọc để dễ dàng tìm thuộc tính</li>
                <li>
                  💾 Nhấn "Lưu thay đổi" để áp dụng các thuộc tính đã chọn
                </li>
              </ul>
            </CAlert>
          </>
        )}
      </CModalBody>

      <CModalFooter className="border-top-0">
        <div className="d-flex justify-content-between w-100 align-items-center">
          <div className="text-muted small">
            {selectedCount > 0 && (
              <>Đã áp dụng {selectedCount} thuộc tính cho danh mục này</>
            )}
          </div>
          <div className="d-flex gap-2">
            <CButton
              color="secondary"
              variant="outline"
              onClick={handleModalClose}
              disabled={isPendingCreate}
            >
              <CIcon icon={cilX} className="me-2" />
              Đóng
            </CButton>
            <CButton
              color="primary"
              onClick={handleSubmit}
              disabled={isPendingCreate}
            >
              {isPendingCreate ? (
                <>
                  <CSpinner size="sm" className="me-2" />
                  Đang lưu thay đổi...
                </>
              ) : (
                <>
                  <CIcon icon={cilCheck} className="me-2" />
                  Lưu thay đổi
                </>
              )}
            </CButton>
          </div>
        </div>
      </CModalFooter>
    </CModal>
  );
}

export default AttributeSelectModal;
