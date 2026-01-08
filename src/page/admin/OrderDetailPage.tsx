import { CCol, CContainer, CRow } from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { orderDetailQuery } from "../../module/admin/query/orderDetail";
import { productVariantQuery } from "../../module/client/query/productVariant";
import { useMemo } from "react";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: variants } = useQuery(productVariantQuery.list());
  const { data: list } = useQuery(
    orderDetailQuery.get_by_order_id(Number(id!))
  );

  const order_details = useMemo(
    () =>
      list?.map((item) => {
        const variant = variants?.find((u) => u.id == item.variant_id);
        return { ...item, variant: variant };
      }),
    [variants, list]
  );

  return (
    <CContainer fluid className="px-4 py-4 bg-light min-vh-100">
      {/* Header */}
      <CRow className="mb-4">
        <CCol>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className=" mb-0 "> Chi tiết đơn hàng #{id}</h2>
              <p className="text-muted mb-0">
                Ngày tạo: 23/10/2025 &nbsp; | &nbsp; Trạng thái:{" "}
                <span className="badge bg-success">Đã thanh toán</span>
              </p>
            </div>
          </div>
        </CCol>
      </CRow>

      <div className="row g-4">
        {/* Bảng sản phẩm */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h4 className="fw-semibold mb-4 text-secondary">
                Danh sách sản phẩm
              </h4>
              <div className="table-responsive">
                <table className="table align-middle table-hover">
                  <thead className="table">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col"></th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Số lượng</th>
                      <th scope="col">Đơn giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order_details?.map((item, index) => (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            width={70}
                            height={70}
                            src={`/uploads/${item.variant?.product_images?.[0]?.url}`}
                            alt={item.variant?.name}
                            className="rounded border"
                            style={{
                              objectFit: "contain",
                              backgroundColor: "#f8f9fa",
                            }}
                          />
                        </td>
                        <td className="fw-medium">{item.variant?.name}</td>
                        <td>{item.quantity}</td>
                        <td className="text-danger fw-semibold">
                          {item.variant?.price?.toLocaleString()} VNĐ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tổng tiền */}
              <div className="mt-4 border-top pt-3">
                <div className="d-flex justify-content-between">
                  <span className="fw-medium text-muted">Tổng tạm tính:</span>
                  <span>22.000.000 VNĐ</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span className="fw-medium text-muted">Chiết khấu:</span>
                  <span>10%</span>
                </div>
                <div className="d-flex justify-content-between border-top pt-2 mt-2">
                  <strong>Tổng tiền:</strong>
                  <strong className="text-success">20.000.000 VNĐ</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin người mua */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-body">
              <h4 className="fw-semibold mb-4 text-secondary">
                👤 Thông tin người mua
              </h4>
              <p className="mb-2">
                <strong>Tên:</strong> Võ Giang Thoại
              </p>
              <p className="mb-2">
                <strong>Email:</strong> thoai@example.com
              </p>
              <p className="mb-2">
                <strong>Số điện thoại:</strong> 0905 123 456
              </p>
              <p className="mb-2">
                <strong>Địa chỉ giao hàng:</strong> 123 Nguyễn Văn Linh, Đà Nẵng
              </p>

              <div className="mt-4 p-3 bg-light rounded border">
                <p className="mb-1">
                  <strong>Phương thức thanh toán:</strong> VNPay
                </p>
                <p className="mb-0">
                  <strong>Trạng thái:</strong>{" "}
                  <span className="badge bg-success">Hoàn tất</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default OrderDetailPage;
