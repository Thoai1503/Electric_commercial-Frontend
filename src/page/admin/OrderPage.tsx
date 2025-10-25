import { CButton, CCol, CContainer, CRow } from "@coreui/react";

import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useOrderPage } from "../../module/admin/hook/order_page/useOrderPage";

const OrderPage = () => {
  const { orderList } = useOrderPage();
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
          {orderList?.map((item) => {
            const created_date = new Date(item.created_at).toLocaleString(
              "vi-VN"
            );
            return (
              <tr>
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
    </CContainer>
  );
};

export default OrderPage;
