import { useQuery } from "@tanstack/react-query";
import { orderQuery } from "../../module/client/query/order";
import { useState, useMemo } from "react";

const OrderHistory = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { data, isLoading } = useQuery(orderQuery.get_by_user_id(user.id));

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<"id" | "total" | "created_at">(
    "id"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Filter and sort data
  const filteredData = useMemo(() => {
    if (!data) return [];

    let filtered = [...data];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.id.toString().includes(searchTerm) ||
          item.total.toString().includes(searchTerm)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "created_at") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      } else {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    });

    return filtered;
  }, [data, searchTerm, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
  };

  const getStatusInfo = (status: number) => {
    switch (status) {
      case 3:
        return { text: "Đã huỷ", badge: "danger", icon: "mdi-close-circle" };
      case 2:
        return {
          text: "Đã thanh toán",
          badge: "success",
          icon: "mdi-check-circle",
        };
      case 1:
        return {
          text: "Đang xử lý",
          badge: "warning",
          icon: "mdi-clock-outline",
        };
      default:
        return {
          text: "Không xác định",
          badge: "secondary",
          icon: "mdi-help-circle",
        };
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <button className="page-link" onClick={() => setCurrentPage(i)}>
            {i}
          </button>
        </li>
      );
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="container-fluid mt-5">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-5 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1 fw-bold">Lịch sử đơn hàng</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="#" className="text-decoration-none">
                      <i className="mdi mdi-home-outline"></i> Trang chủ
                    </a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#" className="text-decoration-none">
                      Ecommerce
                    </a>
                  </li>
                  <li className="breadcrumb-item active">Lịch sử đơn hàng</li>
                </ol>
              </nav>
            </div>
            <div>
              <button className="btn btn-primary">
                <i className="mdi mdi-download me-2"></i>Xuất báo cáo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              {/* Controls */}
              <div className="row mb-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="d-flex align-items-center">
                    <label className="me-2 text-nowrap mb-0">Hiển thị</label>
                    <select
                      className="form-select form-select-sm"
                      style={{ width: "auto" }}
                      value={entriesPerPage}
                      onChange={(e) => {
                        setEntriesPerPage(Number(e.target.value));
                        setCurrentPage(1);
                      }}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <span className="ms-2 text-muted">mục</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="mdi mdi-magnify"></i>
                    </span>
                    <input
                      type="search"
                      className="form-control border-start-0"
                      placeholder="Tìm kiếm theo mã đơn hàng..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th
                        className="cursor-pointer user-select-none"
                        onClick={() => handleSort("id")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          Mã đơn hàng
                          {sortField === "id" && (
                            <i
                              className={`mdi mdi-chevron-${sortOrder === "asc" ? "up" : "down"} ms-1`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th
                        className="cursor-pointer user-select-none"
                        onClick={() => handleSort("total")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          Tổng tiền
                          {sortField === "total" && (
                            <i
                              className={`mdi mdi-chevron-${sortOrder === "asc" ? "up" : "down"} ms-1`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th
                        className="cursor-pointer user-select-none"
                        onClick={() => handleSort("created_at")}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="d-flex align-items-center">
                          Ngày đặt
                          {sortField === "created_at" && (
                            <i
                              className={`mdi mdi-chevron-${sortOrder === "asc" ? "up" : "down"} ms-1`}
                            ></i>
                          )}
                        </div>
                      </th>
                      <th>Thanh toán</th>
                      <th>Trạng thái</th>
                      <th className="text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-5">
                          <i className="mdi mdi-package-variant-closed font-size-48 text-muted d-block mb-3"></i>
                          <p className="text-muted mb-0">
                            Không tìm thấy đơn hàng nào
                          </p>
                        </td>
                      </tr>
                    ) : (
                      currentData.map((item) => {
                        const statusInfo = getStatusInfo(item.status);
                        const createdDate = new Date(
                          item.created_at
                        ).toLocaleString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        });

                        return (
                          <tr key={item.id}>
                            <td>
                              <a
                                href="#"
                                className="text-decoration-none fw-semibold"
                              >
                                #DHG{String(item.id).padStart(6, "0")}
                              </a>
                            </td>
                            <td className="fw-semibold text-primary">
                              {item.total.toLocaleString("vi-VN")} ₫
                            </td>
                            <td>
                              <small className="text-muted">
                                {createdDate}
                              </small>
                            </td>
                            <td>
                              <i className="fab fa-cc-visa text-primary font-size-20"></i>
                            </td>
                            <td>
                              <span
                                className={`badge bg-${statusInfo.badge} bg-opacity-10 text-${statusInfo.badge} px-3 py-2`}
                              >
                                <i
                                  className={`mdi ${statusInfo.icon} me-1`}
                                ></i>
                                {statusInfo.text}
                              </span>
                            </td>
                            <td className="text-center">
                              <div
                                className="btn-group btn-group-sm"
                                role="group"
                              >
                                <button
                                  className="btn btn-outline-primary"
                                  title="Xem chi tiết"
                                >
                                  <i className="mdi mdi-eye"></i>
                                </button>
                                {item.status === 2 && (
                                  <button
                                    className="btn btn-outline-success"
                                    title="Tải hoá đơn"
                                  >
                                    <i className="mdi mdi-download"></i>
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Footer */}
              <div className="row mt-3">
                <div className="col-md-6 mb-3 mb-md-0">
                  <div className="text-muted">
                    Hiển thị {startIndex + 1} đến{" "}
                    {Math.min(endIndex, filteredData.length)} trong tổng số{" "}
                    {filteredData.length} đơn hàng
                  </div>
                </div>
                <div className="col-md-6">
                  <nav>
                    <ul className="pagination pagination-sm justify-content-md-end justify-content-center mb-0">
                      <li
                        className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <i className="mdi mdi-chevron-left"></i>
                        </button>
                      </li>
                      {renderPagination()}
                      <li
                        className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <i className="mdi mdi-chevron-right"></i>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="row mt-4">
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm bg-success bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-success d-flex align-items-center justify-content-center">
                    <i className="mdi mdi-check-circle font-size-24 text-white"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Đã thanh toán</h6>
                  <h4 className="mb-0">
                    {data?.filter((o) => o.status === 2).length || 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm bg-warning bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-warning d-flex align-items-center justify-content-center">
                    <i className="mdi mdi-clock-outline font-size-24 text-white"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Đang xử lý</h6>
                  <h4 className="mb-0">
                    {data?.filter((o) => o.status === 1).length || 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm bg-danger bg-opacity-10">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avatar-sm rounded-circle bg-danger d-flex align-items-center justify-content-center">
                    <i className="mdi mdi-close-circle font-size-24 text-white"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-1">Đã huỷ</h6>
                  <h4 className="mb-0">
                    {data?.filter((o) => o.status === 3).length || 0}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
