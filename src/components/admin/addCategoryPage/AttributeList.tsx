import { useState, useMemo } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CInputGroup,
  CFormInput,
  CAlert,
  CPagination,
  CPaginationItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilPlus,
  cilPencil,
  cilTrash,
  cilSearch,
  cilSettings,
  cilFilter,
} from "@coreui/icons";
import type { Attribute } from "../../../type/Attribute";
import AddAttributeModal from "./AddAtributeModal";

interface AttributeListProps {
  attributes: Attribute[];
}

const AttributeList = ({ attributes }: AttributeListProps) => {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "id">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Filter and sort attributes
  const filteredAndSortedAttributes = useMemo(() => {
    let filtered = attributes.filter(
      (attr) =>
        attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (attr.slug &&
          attr.slug.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aValue, bValue;
      if (sortBy === "name") {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else {
        aValue = a.id;
        bValue = b.id;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [attributes, searchTerm, sortBy, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(
    filteredAndSortedAttributes.length / itemsPerPage
  );
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentAttributes = filteredAndSortedAttributes.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSort = (column: "name" | "id") => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (column: "name" | "id") => {
    if (sortBy !== column) return "↕️";
    return sortOrder === "asc" ? "↑" : "↓";
  };

  return (
    <CCard className="shadow-sm border-0">
      <CCardHeader className="bg-gradient border-bottom-0">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h5 className="mb-1 d-flex align-items-center">
              <CIcon icon={cilSettings} className="me-2 text-primary" />
              Danh sách thuộc tính
            </h5>
            <small className="text-muted">
              Quản lý thuộc tính cho danh mục sản phẩm
            </small>
          </div>
          <CButton
            color="success"
            onClick={handleShow}
            className="d-flex align-items-center"
          >
            <CIcon icon={cilPlus} className="me-2" />
            Thêm thuộc tính
          </CButton>
        </div>
      </CCardHeader>

      <CCardBody className="p-4">
        {/* Search and Filter Controls */}
        <div className="row mb-4">
          <div className="col-md-8">
            <CInputGroup>
              <CInputGroup>
                <CFormInput
                  placeholder="Tìm kiếm thuộc tính..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CButton type="button" color="primary" variant="outline">
                  <CIcon icon={cilSearch} />
                </CButton>
              </CInputGroup>
            </CInputGroup>
          </div>
          <div className="col-md-4">
            <CDropdown className="w-100">
              <CDropdownToggle
                color="secondary"
                variant="outline"
                className="w-100"
              >
                <CIcon icon={cilFilter} className="me-2" />
                Sắp xếp: {sortBy === "name" ? "Tên" : "ID"} (
                {sortOrder === "asc" ? "A-Z" : "Z-A"})
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem onClick={() => handleSort("name")}>
                  Tên A-Z
                </CDropdownItem>
                <CDropdownItem
                  onClick={() => {
                    setSortBy("name");
                    setSortOrder("desc");
                  }}
                >
                  Tên Z-A
                </CDropdownItem>
                <CDropdownItem onClick={() => handleSort("id")}>
                  ID tăng dần
                </CDropdownItem>
                <CDropdownItem
                  onClick={() => {
                    setSortBy("id");
                    setSortOrder("desc");
                  }}
                >
                  ID giảm dần
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </div>
        </div>

        {/* Statistics */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="text-center p-3 bg-light rounded">
              <div className="h4 mb-0 text-primary">{attributes.length}</div>
              <small className="text-muted">Tổng thuộc tính</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-3 bg-light rounded">
              <div className="h4 mb-0 text-success">
                {filteredAndSortedAttributes.length}
              </div>
              <small className="text-muted">Kết quả tìm kiếm</small>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center p-3 bg-light rounded">
              <div className="h4 mb-0 text-info">
                {currentPage}/{totalPages}
              </div>
              <small className="text-muted">Trang hiện tại</small>
            </div>
          </div>
        </div>

        {/* Table */}
        {filteredAndSortedAttributes.length === 0 ? (
          <CAlert color="info" className="text-center">
            <CIcon icon={cilSearch} className="me-2" />
            {searchTerm
              ? "Không tìm thấy thuộc tính nào phù hợp"
              : "Chưa có thuộc tính nào"}
          </CAlert>
        ) : (
          <>
            <div className="table-responsive">
              <CTable hover className="mb-0">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell
                      scope="col"
                      className="cursor-pointer user-select-none"
                      onClick={() => handleSort("id")}
                    >
                      ID {getSortIcon("id")}
                    </CTableHeaderCell>
                    <CTableHeaderCell
                      scope="col"
                      className="cursor-pointer user-select-none"
                      onClick={() => handleSort("name")}
                    >
                      Tên thuộc tính {getSortIcon("name")}
                    </CTableHeaderCell>
                    <CTableHeaderCell scope="col">Slug/Mô tả</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="text-center">
                      Thao tác
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentAttributes.map((attr) => (
                    <CTableRow key={attr.id} className="align-middle">
                      <CTableDataCell>
                        <CBadge color="secondary" shape="rounded-pill">
                          {attr.id}
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="fw-semibold">{attr.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <span className="text-muted">
                          {attr.slug || "Chưa có mô tả"}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge color="success" shape="rounded-pill">
                          Hoạt động
                        </CBadge>
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        <div className="d-flex gap-2 justify-content-center">
                          <CButton
                            color="primary"
                            variant="outline"
                            size="sm"
                            title="Chỉnh sửa"
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="danger"
                            variant="outline"
                            size="sm"
                            title="Xóa"
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
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
                      return <CPaginationItem key={page}>...</CPaginationItem>;
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
      </CCardBody>

      <AddAttributeModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
      />
    </CCard>
  );
};

export default AttributeList;
