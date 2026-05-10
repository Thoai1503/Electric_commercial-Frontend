import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { LucideIcon } from "lucide-react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clock3,
  CreditCard,
  Download,
  Eye,
  PackageOpen,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  XCircle,
} from "lucide-react";
import { orderQuery } from "../../module/client/query/order";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const formatDateTime = (value: Date | string) =>
  new Date(value).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const statusBadgeClasses = {
  success: "bg-success-subtle text-success border border-success-subtle",
  warning: "bg-warning-subtle text-warning border border-warning-subtle",
  danger: "bg-danger-subtle text-danger border border-danger-subtle",
  secondary: "bg-light text-secondary border",
} as const;

const OrderHistory = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { data, isLoading } = useQuery(orderQuery.get_by_user_id(user.id));

  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<"all" | 1 | 2 | 3>("all");
  const [sortField, setSortField] = useState<"id" | "total" | "created_at">(
    "created_at",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const getStatusInfo = (
    status: number,
  ): {
    text: string;
    tone: keyof typeof statusBadgeClasses;
    icon: LucideIcon;
  } => {
    switch (status) {
      case 3:
        return { text: "Đã huỷ", tone: "danger", icon: XCircle };
      case 2:
        return { text: "Đã thanh toán", tone: "success", icon: CheckCircle2 };
      case 1:
        return { text: "Đang xử lý", tone: "warning", icon: Clock3 };
      default:
        return { text: "Không xác định", tone: "secondary", icon: CircleHelp };
    }
  };

  const statusTabs = useMemo(
    () => [
      { value: "all" as const, label: "Tất cả", count: data?.length ?? 0 },
      {
        value: 1 as const,
        label: "Đang xử lý",
        count: data?.filter((item) => item.status === 1).length ?? 0,
      },
      {
        value: 2 as const,
        label: "Đã thanh toán",
        count: data?.filter((item) => item.status === 2).length ?? 0,
      },
      {
        value: 3 as const,
        label: "Đã huỷ",
        count: data?.filter((item) => item.status === 3).length ?? 0,
      },
    ],
    [data],
  );

  const summaryCards = useMemo(
    () => [
      { title: "Tổng đơn hàng", value: data?.length ?? 0, icon: ShoppingBag },
      {
        title: "Đã thanh toán",
        value: data?.filter((item) => item.status === 2).length ?? 0,
        icon: CheckCircle2,
      },
      {
        title: "Đang xử lý",
        value: data?.filter((item) => item.status === 1).length ?? 0,
        icon: Clock3,
      },
      {
        title: "Đã huỷ",
        value: data?.filter((item) => item.status === 3).length ?? 0,
        icon: XCircle,
      },
    ],
    [data],
  );

  const filteredData = useMemo(() => {
    if (!data) return [];

    let filtered = [...data];

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.id.toString().includes(searchTerm) ||
          item.total.toString().includes(searchTerm),
      );
    }

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
  }, [data, searchTerm, sortField, sortOrder, statusFilter]);

  const totalPages =
    filteredData.length === 0
      ? 1
      : Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);
  const visibleStart = filteredData.length === 0 ? 0 : startIndex + 1;
  const visibleEnd =
    filteredData.length === 0 ? 0 : Math.min(endIndex, filteredData.length);

  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
      return;
    }

    setSortField(field);
    setSortOrder("desc");
  };

  const renderSortIcon = (field: typeof sortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={14} style={{ color: "#64748b" }} />;
    }

    return sortOrder === "asc" ? (
      <ArrowUp size={14} style={{ color: "#60a5fa" }} />
    ) : (
      <ArrowDown size={14} style={{ color: "#60a5fa" }} />
    );
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(
        <li key={page} className="page-item">
          <button
            className={`page-link border-0 rounded-3 mx-1 ${
              currentPage === page
                ? "bg-primary text-white"
                : "bg-primary bg-opacity-10 text-primary"
            }`}
            onClick={() => setCurrentPage(page)}
            type="button"
          >
            {page}
          </button>
        </li>,
      );
    }

    return pages;
  };

  if (isLoading) {
    return (
      <div className="col-12 px-0">
        <div className="card border-0 shadow-sm mt-4 mb-5">
          <div
            className="card-body d-flex flex-column justify-content-center align-items-center text-center"
            style={{ minHeight: "360px" }}
          >
            <div
              className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
              style={{ width: 64, height: 64 }}
            >
              <ShoppingBag size={28} className="text-primary" />
            </div>
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="mb-1">Đang tải lịch sử đơn hàng</h5>
            <p className="text-muted mb-0">
              Dữ liệu của bạn sẽ hiển thị trong giây lát.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="col-12 px-0">
      <div className="mt-4 mb-5">
        <div
          className="card border-0 shadow mb-4"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
          }}
        >
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  <ShoppingBag size={16} className="text-primary" />
                  Đơn hàng của tôi
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Lịch sử mua hàng
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 640 }}>
                  Theo dõi trạng thái đơn hàng, tìm lại giao dịch gần đây và xem
                  nhanh những đơn đã hoàn tất hoặc đang xử lý.
                </p>
              </div>
              <button
                type="button"
                className="btn btn-primary d-inline-flex align-items-center gap-2 px-4 fw-semibold"
              >
                <Download size={16} />
                Xuất danh sách
              </button>
            </div>

            <div className="row g-3 mt-3">
              {summaryCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div key={card.title} className="col-12 col-sm-6 col-xl-3">
                    <div
                      className="rounded-4 h-100 bg-white px-3 py-3"
                      style={{
                        border: "1px solid #e2e8f0",
                        borderTop: "3px solid #0d6efd",
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <span className="text-muted small text-uppercase fw-semibold">
                          {card.title}
                        </span>
                        <div
                          className="bg-primary bg-opacity-10 rounded-3 d-inline-flex align-items-center justify-content-center"
                          style={{ width: 40, height: 40 }}
                        >
                          <Icon size={18} className="text-primary" />
                        </div>
                      </div>
                      <div
                        className="fw-bold text-dark"
                        style={{ fontSize: "1.75rem" }}
                      >
                        {card.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="d-flex flex-column gap-3 mb-4">
              <div className="d-flex align-items-center gap-2 text-dark fw-bold">
                <SlidersHorizontal size={18} className="text-primary" />
                Trạng thái đơn hàng
              </div>
              <div className="d-flex flex-wrap gap-2">
                {statusTabs.map((tab) => (
                  <button
                    key={String(tab.value)}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-2 ${
                      statusFilter === tab.value
                        ? "btn-primary"
                        : "btn-light border border-primary-subtle text-primary"
                    }`}
                    onClick={() => {
                      setStatusFilter(tab.value);
                      setCurrentPage(1);
                    }}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`badge rounded-pill ${
                        statusFilter === tab.value
                          ? "text-bg-light"
                          : "bg-primary bg-opacity-10 text-primary"
                      }`}
                    >
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="row g-3 align-items-end mb-4">
              <div className="col-12 col-lg-8">
                <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                  Tìm kiếm đơn hàng
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0">
                    <Search size={18} className="text-primary" />
                  </span>
                  <input
                    type="search"
                    className="form-control border-start-0"
                    placeholder="Tìm theo mã đơn hàng hoặc tổng tiền"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                </div>
              </div>
              <div className="col-12 col-lg-4">
                <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                  Số dòng hiển thị
                </label>
                <select
                  className="form-select form-select-lg"
                  value={entriesPerPage}
                  onChange={(e) => {
                    setEntriesPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value="5">5 dòng</option>
                  <option value="10">10 dòng</option>
                  <option value="25">25 dòng</option>
                  <option value="50">50 dòng</option>
                </select>
              </div>
            </div>

            <div
              className="table-responsive rounded-4 overflow-hidden"
              style={{ border: "1px solid #e2e8f0" }}
            >
              <table className="table align-middle mb-0 bg-white">
                <thead style={{ background: "#111827" }}>
                  <tr>
                    <th
                      className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                      style={{ color: "#94a3b8" }}
                    >
                      Mã đơn hàng
                    </th>
                    <th
                      className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                      style={{ cursor: "pointer", color: "#94a3b8" }}
                      onClick={() => handleSort("total")}
                    >
                      <div className="d-inline-flex align-items-center gap-2">
                        Tổng tiền
                        {renderSortIcon("total")}
                      </div>
                    </th>
                    <th
                      className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                      style={{ cursor: "pointer", color: "#94a3b8" }}
                      onClick={() => handleSort("created_at")}
                    >
                      <div className="d-inline-flex align-items-center gap-2">
                        Ngày đặt
                        {renderSortIcon("created_at")}
                      </div>
                    </th>
                    <th
                      className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                      style={{ color: "#94a3b8" }}
                    >
                      Thanh toán
                    </th>
                    <th
                      className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                      style={{ color: "#94a3b8" }}
                    >
                      Trạng thái
                    </th>
                    <th className="border-0 px-4 py-3 text-muted small text-uppercase fw-semibold text-center">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-5">
                        <div className="d-flex flex-column align-items-center justify-content-center py-4">
                          <div
                            className="bg-primary bg-opacity-10 rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                            style={{ width: 64, height: 64 }}
                          >
                            <PackageOpen size={28} className="text-primary" />
                          </div>
                          <h5 className="mb-2">
                            Không tìm thấy đơn hàng phù hợp
                          </h5>
                          <p className="text-muted mb-0">
                            Hãy thử thay đổi từ khóa hoặc bộ lọc trạng thái.
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    currentData.map((item) => {
                      const statusInfo = getStatusInfo(item.status);
                      const StatusIcon = statusInfo.icon;

                      return (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <div className="d-flex flex-column gap-1">
                              <span className="fw-bold text-dark">
                                #DHG{String(item.id).padStart(6, "0")}
                              </span>
                              <span className="small text-muted">
                                Đơn hàng của bạn đã được ghi nhận
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 fw-bold text-dark">
                            {formatCurrency(item.total)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="d-inline-flex align-items-center gap-2 text-muted small">
                              <CalendarDays size={16} />
                              {formatDateTime(item.created_at)}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill bg-primary bg-opacity-10 border border-primary-subtle small text-primary">
                              <CreditCard size={15} className="text-primary" />
                              Thanh toán
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill small fw-medium ${statusBadgeClasses[statusInfo.tone]}`}
                            >
                              <StatusIcon size={15} />
                              {statusInfo.text}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-center">
                            <div className="d-inline-flex gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary d-inline-flex align-items-center gap-2"
                              >
                                <Eye size={15} />
                                Chi tiết
                              </button>
                              {item.status === 2 && (
                                <button
                                  type="button"
                                  className="btn btn-sm btn-primary d-inline-flex align-items-center gap-2"
                                >
                                  <Download size={15} />
                                  Hoá đơn
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

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mt-4">
              <div className="text-muted small">
                Hiển thị {visibleStart} đến {visibleEnd} trong tổng số{" "}
                {filteredData.length} đơn hàng
              </div>
              <nav aria-label="Phân trang lịch sử đơn hàng">
                <ul className="pagination pagination-sm align-items-center mb-0">
                  <li className="page-item">
                    <button
                      type="button"
                      className="page-link border-0 rounded-3 bg-primary bg-opacity-10 text-primary"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft size={16} />
                    </button>
                  </li>
                  {renderPagination()}
                  <li className="page-item">
                    <button
                      type="button"
                      className="page-link border-0 rounded-3 bg-primary bg-opacity-10 text-primary"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
