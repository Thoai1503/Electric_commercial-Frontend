import { CButton, CCol, CContainer, CRow } from "@coreui/react";
import { FiEdit, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useOrderPage } from "../../module/admin/hook/order_page/useOrderPage";
import { useState } from "react";
import type { JSX } from "react";

const OrderPage = () => {
  const { orderList, handleSearch, changePage } = useOrderPage();

  // ✅ State cho lọc theo ngày
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const totalPages = orderList?.totalPages ?? 0;

  let content: JSX.Element[] = [];
  for (let i = 1; i <= totalPages; i++) {
    content.push(
      <li
        key={i}
        className={`page-item ${i === orderList?.page ? "active" : ""}`}
        onClick={() => changePage(i)}
        style={{ cursor: "pointer" }}
      >
        <span className="page-link">{i}</span>
      </li>
    );
  }

  // ✅ Xử lý khi nhấn nút Lọc
  const handleFilter = () => {
    console.log("Lọc từ:", startDate, "đến:", endDate);
    // TODO: Gọi API hoặc queryClient.invalidateQueries() với tham số ngày
  };

  // ✅ Xử lý khi nhấn nút Reset
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    console.log("Đặt lại bộ lọc ngày");
    // TODO: Refetch lại danh sách mặc định
  };

  return (
    <CContainer fluid className="px-4">
      <CRow className="mb-4 ">
        <CCol>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-1">Quản lý đơn hàng</h2>
              <p className="text-muted mb-0">
                Danh sách đơn hàng và truy vấn hoá đơn
              </p>
            </div>
          </div>
        </CCol>
      </CRow>

      {/* Thanh tìm kiếm và lọc ngày */}
      <div className="d-flex justify-content-end gap-2 mb-3">
        <FiSearch className="me-2 text-muted " />
        <input
          type="text"
          className="form-control"
          placeholder="Tìm bằng sđt..."
          onChange={handleSearch}
          style={{ maxWidth: "200px" }}
        />

        <input
          type="date"
          className="form-control"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <CButton color="primary" onClick={handleFilter}>
          Lọc
        </CButton>
        <CButton color="secondary" onClick={handleReset}>
          Reset
        </CButton>
      </div>

      {/* Bảng dữ liệu */}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Mã đơn</th>
            <th scope="col">Tên người mua</th>
            <th scope="col">Email</th>
            <th scope="col">Tổng tiền đơn hàng</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Ngày tạo</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orderList?.list?.map((item) => {
            const created_date = new Date(item.created_at).toLocaleString(
              "vi-VN"
            );
            return (
              <tr key={item.id}>
                <th scope="row">{item.id}</th>
                <td>{item.user?.name}</td>
                <td>{item.user?.email}</td>
                <td>{item.total?.toLocaleString("vi-VN")}</td>
                <td>{item.status}</td>
                <td>{created_date}</td>
                <td>
                  <CButton color="primary" variant="outline" size="sm">
                    <Link to={`../order-detail/${item.id}`}>
                      <FiEdit />
                    </Link>
                  </CButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="d-flex justify-content-end">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {content}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </CContainer>
  );
};

export default OrderPage;
