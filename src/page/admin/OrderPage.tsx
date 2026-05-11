import { CBadge, CButton, CCol, CContainer, CRow } from "@coreui/react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarRange,
  FileSearch,
  Search,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useOrderPage } from "../../module/admin/hook/order_page/useOrderPage";
import { useMemo, useState } from "react";

const statusMeta = (status: number | string) => {
  if (status === 2 || status === "paid") {
    return { label: "Đã thanh toán", cls: "bg-success-subtle text-success border border-success-subtle" };
  }
  if (status === 3 || status === "cancel") {
    return { label: "Đã huỷ", cls: "bg-danger-subtle text-danger border border-danger-subtle" };
  }
  return { label: "Đang xử lý", cls: "bg-warning-subtle text-warning border border-warning-subtle" };
};

const OrderPage = () => {
  const { orderList, handleSearch, changePage } = useOrderPage();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const totalPages = orderList?.totalPages ?? 0;
  const currentPage = orderList?.page ?? 1;

  const summary = useMemo(() => {
    const list = orderList?.list ?? [];
    const paid = list.filter((x) => x.status === 2).length;
    const processing = list.filter((x) => x.status === 1).length;
    return {
      total: list.length,
      paid,
      processing,
    };
  }, [orderList]);

  const handleFilter = () => {
    console.log("Lọc từ:", startDate, "đến:", endDate);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    console.log("Đặt lại bộ lọc ngày");
  };

  return (
    <CContainer fluid className="px-0">
      <div className="mt-4 mb-5">
        <div
          className="card border-0 shadow mb-4"
          style={{ background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)" }}
        >
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  <ShoppingCart size={16} />
                  Quản trị đơn hàng
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">Quản lý đơn hàng</h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 680 }}>
                  Theo dõi trạng thái, tìm kiếm hoá đơn và kiểm soát luồng xử lý
                  đơn trong một giao diện đồng bộ.
                </p>
              </div>
              <CBadge color="primary" shape="rounded-pill" className="px-3 py-2 fs-6">
                {summary.total} đơn trong trang hiện tại
              </CBadge>
            </div>
          </div>
        </div>

        <CRow className="g-3 mb-4">
          <CCol xs={6} md={4}>
            <div className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm" style={{ border: "1px solid #e2e8f0", borderTop: "3px solid #0d6efd" }}>
              <div className="text-muted small mb-1">Tổng đơn</div>
              <div className="h4 mb-0 fw-bold">{summary.total}</div>
            </div>
          </CCol>
          <CCol xs={6} md={4}>
            <div className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm" style={{ border: "1px solid #e2e8f0", borderTop: "3px solid #198754" }}>
              <div className="text-muted small mb-1">Đã thanh toán</div>
              <div className="h4 mb-0 fw-bold">{summary.paid}</div>
            </div>
          </CCol>
          <CCol xs={6} md={4}>
            <div className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm" style={{ border: "1px solid #e2e8f0", borderTop: "3px solid #f59f00" }}>
              <div className="text-muted small mb-1">Đang xử lý</div>
              <div className="h4 mb-0 fw-bold">{summary.processing}</div>
            </div>
          </CCol>
        </CRow>

        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="row g-3 align-items-end">
              <div className="col-12 col-xl-4">
                <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                  Tìm kiếm theo SĐT
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0">
                    <Search size={18} className="text-primary" />
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0"
                    placeholder="Nhập số điện thoại"
                    onChange={handleSearch}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-xl-3">
                <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                  Từ ngày
                </label>
                <div className="input-group input-group-lg">
                  <span className="input-group-text bg-white border-end-0">
                    <CalendarRange size={18} className="text-primary" />
                  </span>
                  <input
                    type="date"
                    className="form-control border-start-0"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="col-12 col-md-6 col-xl-3">
                <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                  Đến ngày
                </label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="col-12 col-xl-2 d-flex gap-2">
                <CButton color="primary" className="flex-fill" onClick={handleFilter}>
                  Lọc
                </CButton>
                <CButton color="light" className="flex-fill border" onClick={handleReset}>
                  Reset
                </CButton>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-4">
            <div className="table-responsive rounded-4 overflow-hidden" style={{ border: "1px solid #e2e8f0" }}>
              <table className="table align-middle mb-0 bg-white">
                <thead style={{ background: "#111827" }}>
                  <tr>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Mã đơn</th>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Người mua</th>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Email</th>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Tổng tiền</th>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Trạng thái</th>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Ngày tạo</th>
                    <th className="border-0 px-4 py-3 small text-uppercase fw-semibold text-center" style={{ color: "#94a3b8" }}>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {orderList?.list?.map((item) => {
                    const createdDate = new Date(item.created_at).toLocaleString("vi-VN");
                    const status = statusMeta(item.status);
                    return (
                      <tr key={item.id}>
                        <td className="px-4 py-3 fw-semibold">#{item.id}</td>
                        <td className="px-4 py-3">{item.user?.name}</td>
                        <td className="px-4 py-3">{item.user?.email}</td>
                        <td className="px-4 py-3">{item.total?.toLocaleString("vi-VN")}</td>
                        <td className="px-4 py-3">
                          <span className={`badge rounded-pill ${status.cls}`}>{status.label}</span>
                        </td>
                        <td className="px-4 py-3">{createdDate}</td>
                        <td className="px-4 py-3 text-center">
                          <Link to={`../order-detail/${item.id}`} className="btn btn-sm btn-light border d-inline-flex align-items-center gap-1 text-primary">
                            <FileSearch size={14} />
                            Chi tiết
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <ul className="pagination pagination-sm align-items-center mb-0">
                <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
                  <button
                    type="button"
                    className="page-link border-0 rounded-3 mx-1 bg-primary bg-opacity-10 text-primary"
                    onClick={() => currentPage > 1 && changePage(currentPage - 1)}
                  >
                    <ArrowLeft size={14} />
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                  <li key={page} className="page-item">
                    <button
                      type="button"
                      className={`page-link border-0 rounded-3 mx-1 ${
                        page === currentPage
                          ? "bg-primary text-white"
                          : "bg-primary bg-opacity-10 text-primary"
                      }`}
                      onClick={() => changePage(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage >= totalPages ? "disabled" : ""}`}>
                  <button
                    type="button"
                    className="page-link border-0 rounded-3 mx-1 bg-primary bg-opacity-10 text-primary"
                    onClick={() => currentPage < totalPages && changePage(currentPage + 1)}
                  >
                    <ArrowRight size={14} />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default OrderPage;
