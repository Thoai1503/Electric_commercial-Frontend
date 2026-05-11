import { CBadge, CContainer } from "@coreui/react";
import { useQuery } from "@tanstack/react-query";
import { CreditCard, MapPin, PackageSearch, UserRound } from "lucide-react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { orderDetailQuery } from "../../module/admin/query/orderDetail";
import { productVariantQuery } from "../../module/client/query/productVariant";
import { getImageUrl } from "../../utils/imageHelper";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: variants } = useQuery(productVariantQuery.list());
  const { data: list } = useQuery(
    orderDetailQuery.get_by_order_id(Number(id!)),
  );

  const orderDetails = useMemo(
    () =>
      list?.map((item) => {
        const variant = variants?.find((u) => u.id == item.variant_id);
        return { ...item, variant };
      }) ?? [],
    [variants, list],
  );

  const totals = useMemo(() => {
    const subtotal = orderDetails.reduce((sum, item) => {
      const price = Number(item.variant?.price ?? 0);
      return sum + price * item.quantity;
    }, 0);

    return {
      subtotal,
      discount: 0,
      final: subtotal,
    };
  }, [orderDetails]);

  return (
    <CContainer fluid className="px-0">
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
                  <PackageSearch size={16} />
                  Theo dõi đơn hàng
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Chi tiết đơn hàng #{id}
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8" }}>
                  Kiểm tra sản phẩm, tổng tiền và thông tin nhận hàng trong cùng
                  một màn hình.
                </p>
              </div>
              <CBadge
                color="success"
                shape="rounded-pill"
                className="px-3 py-2 fs-6"
              >
                {orderDetails.length} sản phẩm
              </CBadge>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Danh sách sản phẩm</h5>
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
                          #
                        </th>
                        <th
                          className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                          style={{ color: "#94a3b8" }}
                        >
                          Ảnh
                        </th>
                        <th
                          className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                          style={{ color: "#94a3b8" }}
                        >
                          Sản phẩm
                        </th>
                        <th
                          className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                          style={{ color: "#94a3b8" }}
                        >
                          Số lượng
                        </th>
                        <th
                          className="border-0 px-4 py-3 small text-uppercase fw-semibold"
                          style={{ color: "#94a3b8" }}
                        >
                          Đơn giá
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderDetails.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3 fw-semibold">{index + 1}</td>
                          <td className="px-4 py-3">
                            <img
                              width={70}
                              height={70}
                              src={getImageUrl(
                                item.variant?.product_images?.[0]?.url,
                              )}
                              alt={item.variant?.name}
                              className="rounded border"
                              style={{
                                objectFit: "contain",
                                backgroundColor: "#f8f9fa",
                              }}
                            />
                          </td>
                          <td className="px-4 py-3 fw-medium">
                            {item.variant?.name}
                          </td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3 text-danger fw-semibold">
                            {formatCurrency(Number(item.variant?.price ?? 0))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 border-top pt-3">
                  <div className="d-flex justify-content-between">
                    <span className="fw-medium text-muted">Tổng tạm tính:</span>
                    <span>{formatCurrency(totals.subtotal)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="fw-medium text-muted">Chiết khấu:</span>
                    <span>{formatCurrency(totals.discount)}</span>
                  </div>
                  <div className="d-flex justify-content-between border-top pt-2 mt-2">
                    <strong>Tổng tiền:</strong>
                    <strong className="text-success">
                      {formatCurrency(totals.final)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <UserRound size={18} className="text-primary" />
                  Thông tin người mua
                </h5>
                <p className="mb-2">
                  <strong>Tên:</strong> Chưa có dữ liệu
                </p>
                <p className="mb-2">
                  <strong>Email:</strong> Chưa có dữ liệu
                </p>
                <p className="mb-2">
                  <strong>Số điện thoại:</strong> Chưa có dữ liệu
                </p>
                <p className="mb-0">
                  <strong>Địa chỉ:</strong> Chưa có dữ liệu
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-sm">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <CreditCard size={18} className="text-primary" />
                  Thanh toán
                </h5>
                <div
                  className="p-3 rounded-3"
                  style={{ background: "#f8fafc", border: "1px solid #e2e8f0" }}
                >
                  <p className="mb-2">
                    <strong>Phương thức:</strong> VNPay
                  </p>
                  <p className="mb-0">
                    <strong>Trạng thái:</strong>{" "}
                    <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle">
                      Hoàn tất
                    </span>
                  </p>
                </div>
                <div className="mt-3 small text-muted d-flex align-items-center gap-1">
                  <MapPin size={14} />
                  Dữ liệu người nhận sẽ hiển thị khi API trả đầy đủ thông tin.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  );
};

export default OrderDetailPage;
