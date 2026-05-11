import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";

import MainChart from "../../components/admin/dashboard/MainChart";

const summaryCards = [
  {
    title: "Đơn hàng",
    value: "1,284",
    subtitle: "+12% so với tháng trước",
    icon: ShoppingCart,
    accent: "#0d6efd",
  },
  {
    title: "Sản phẩm",
    value: "436",
    subtitle: "32 sản phẩm sắp hết hàng",
    icon: Package,
    accent: "#198754",
  },
  {
    title: "Khách hàng",
    value: "8,920",
    subtitle: "+214 khách hàng mới",
    icon: Users,
    accent: "#f59f00",
  },
  {
    title: "Doanh thu",
    value: "2.4 tỷ",
    subtitle: "Tăng trưởng ổn định",
    icon: TrendingUp,
    accent: "#0dcaf0",
  },
];

const Dashboard = () => {
  return (
    <CContainer fluid className="px-0">
      <div className="mt-4 mb-5">
        <CCard
          className="border-0 shadow mb-4"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)",
          }}
        >
          <CCardBody className="p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  <LayoutDashboard size={16} />
                  Tổng quan vận hành
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">
                  Dashboard quản trị
                </h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 720 }}>
                  Theo dõi nhanh doanh thu, đơn hàng và hiệu suất bán hàng trong
                  một bố cục đồng bộ với toàn bộ khu vực admin.
                </p>
              </div>
              <CBadge
                color="primary"
                shape="rounded-pill"
                className="px-3 py-2 fs-6"
              >
                Cập nhật theo thời gian thực
              </CBadge>
            </div>
          </CCardBody>
        </CCard>

        <CRow className="g-3 mb-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <CCol key={card.title} xs={12} sm={6} xl={3}>
                <div
                  className="rounded-4 h-100 bg-white px-3 py-3 shadow-sm"
                  style={{
                    border: "1px solid #e2e8f0",
                    borderTop: `3px solid ${card.accent}`,
                  }}
                >
                  <div className="d-flex align-items-start justify-content-between mb-2">
                    <div className="text-muted small">{card.title}</div>
                    <div
                      className="rounded-circle d-inline-flex align-items-center justify-content-center"
                      style={{
                        width: 34,
                        height: 34,
                        background: "#eff6ff",
                        color: card.accent,
                      }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="h4 mb-1 fw-bold text-dark">{card.value}</div>
                  <div className="small text-muted">{card.subtitle}</div>
                </div>
              </CCol>
            );
          })}
        </CRow>

        <CCard className="border-0 shadow-sm">
          <CCardBody className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1 fw-bold">Phân tích lưu lượng truy cập</h5>
                <p className="mb-0 text-muted small">
                  Tổng hợp dữ liệu theo tháng
                </p>
              </div>
            </div>
            <MainChart />
          </CCardBody>
        </CCard>
      </div>
    </CContainer>
  );
};

export default Dashboard;
