import { useState } from "react";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [activeTab, setActiveTab] = useState<
    "profile" | "security" | "notifications"
  >("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user.name || "Nguyễn Văn A",
    email: user.email || "nguyenvana@email.com",
    phone: user.phone || "0123456789",
    address: user.address || "123 Đường ABC, Quận 1",
    city: user.city || "TP. Hồ Chí Minh",
    country: user.country || "Việt Nam",
    bio: user.bio || "Giới thiệu về bản thân...",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newsletter: true,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNotificationChange = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  const handleSaveProfile = () => {
    // Save to localStorage or API
    localStorage.setItem("user", JSON.stringify({ ...user, ...formData }));
    setIsEditing(false);
    alert("Cập nhật thông tin thành công!");
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Mật khẩu xác nhận không khớp!");
      return;
    }
    alert("Đổi mật khẩu thành công!");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const renderProfileTab = () => (
    <div className="row">
      <div className="col-lg-4 mb-4">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center">
            <div className="mb-3">
              <div className="position-relative d-inline-block">
                <img
                  src={
                    user.avatar ||
                    "https://ui-avatars.com/api/?name=" +
                      encodeURIComponent(formData.fullName) +
                      "&size=150&background=4F46E5&color=fff"
                  }
                  alt="Avatar"
                  className="rounded-circle"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <button
                  className="btn btn-primary btn-sm rounded-circle position-absolute bottom-0 end-0"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="mdi mdi-camera"></i>
                </button>
              </div>
            </div>
            <h4 className="mb-1">{formData.fullName}</h4>
            <p className="text-muted mb-3">{formData.email}</p>
            <div className="d-flex justify-content-center gap-2 mb-3">
              <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2">
                <i className="mdi mdi-account-check me-1"></i>Đã xác thực
              </span>
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2">
                <i className="mdi mdi-shield-check me-1"></i>Thành viên
              </span>
            </div>
            <div className="border-top pt-3">
              <div className="row text-center">
                <div className="col-4">
                  <h5 className="mb-0">24</h5>
                  <small className="text-muted">Đơn hàng</small>
                </div>
                <div className="col-4">
                  <h5 className="mb-0">12</h5>
                  <small className="text-muted">Đánh giá</small>
                </div>
                <div className="col-4">
                  <h5 className="mb-0">5</h5>
                  <small className="text-muted">Yêu thích</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-8">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0">Thông tin cá nhân</h5>
              {!isEditing ? (
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="mdi mdi-pencil me-1"></i>Chỉnh sửa
                </button>
              ) : (
                <div className="btn-group btn-group-sm">
                  <button
                    className="btn btn-success"
                    onClick={handleSaveProfile}
                  >
                    <i className="mdi mdi-check me-1"></i>Lưu
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    <i className="mdi mdi-close me-1"></i>Huỷ
                  </button>
                </div>
              )}
            </div>

            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Số điện thoại</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Quốc gia</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Thành phố</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Địa chỉ</label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="col-12">
                <label className="form-label fw-semibold">Giới thiệu</label>
                <textarea
                  className="form-control"
                  name="bio"
                  rows={4}
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-4">Đổi mật khẩu</h5>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Mật khẩu hiện tại
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Mật khẩu mới</label>
                <input
                  type="password"
                  className="form-control"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập mật khẩu mới"
                  required
                />
                <small className="text-muted">
                  Mật khẩu phải có ít nhất 8 ký tự
                </small>
              </div>
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  Xác nhận mật khẩu mới
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="Nhập lại mật khẩu mới"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <i className="mdi mdi-lock-reset me-2"></i>Đổi mật khẩu
              </button>
            </form>
          </div>
        </div>

        <div className="card border-0 shadow-sm mt-4">
          <div className="card-body">
            <h5 className="mb-3">Bảo mật tài khoản</h5>
            <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded mb-3">
              <div>
                <h6 className="mb-1">Xác thực hai yếu tố (2FA)</h6>
                <small className="text-muted">
                  Tăng cường bảo mật tài khoản của bạn
                </small>
              </div>
              <button className="btn btn-outline-primary btn-sm">Bật</button>
            </div>
            <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
              <div>
                <h6 className="mb-1">Phiên đăng nhập</h6>
                <small className="text-muted">
                  Quản lý các thiết bị đang đăng nhập
                </small>
              </div>
              <button className="btn btn-outline-danger btn-sm">Xem</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="row">
      <div className="col-lg-8 mx-auto">
        <div className="card border-0 shadow-sm">
          <div className="card-body">
            <h5 className="mb-4">Cài đặt thông báo</h5>

            <div className="mb-4">
              <h6 className="mb-3">Email</h6>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotifications"
                  checked={notifications.emailNotifications}
                  onChange={() =>
                    handleNotificationChange("emailNotifications")
                  }
                />
                <label
                  className="form-check-label"
                  htmlFor="emailNotifications"
                >
                  Nhận thông báo qua email
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="orderUpdates"
                  checked={notifications.orderUpdates}
                  onChange={() => handleNotificationChange("orderUpdates")}
                />
                <label className="form-check-label" htmlFor="orderUpdates">
                  Cập nhật đơn hàng
                </label>
              </div>
              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="promotions"
                  checked={notifications.promotions}
                  onChange={() => handleNotificationChange("promotions")}
                />
                <label className="form-check-label" htmlFor="promotions">
                  Khuyến mãi và ưu đãi
                </label>
              </div>
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="newsletter"
                  checked={notifications.newsletter}
                  onChange={() => handleNotificationChange("newsletter")}
                />
                <label className="form-check-label" htmlFor="newsletter">
                  Bản tin hàng tuần
                </label>
              </div>
            </div>

            <div className="border-top pt-4">
              <h6 className="mb-3">Push Notifications</h6>
              <div className="alert alert-info d-flex align-items-center">
                <i className="mdi mdi-information-outline me-2 font-size-20"></i>
                <div>
                  <strong>Chưa bật thông báo đẩy</strong>
                  <p className="mb-0 small">
                    Cho phép trình duyệt gửi thông báo để không bỏ lỡ cập nhật
                    quan trọng
                  </p>
                </div>
              </div>
              <button className="btn btn-primary">
                <i className="mdi mdi-bell-ring me-2"></i>Bật thông báo đẩy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container-fluid mt-5 mb-5">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-1 fw-bold">Hồ sơ cá nhân</h2>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <a href="#" className="text-decoration-none">
                  <i className="mdi mdi-home-outline"></i> Trang chủ
                </a>
              </li>
              <li className="breadcrumb-item active">Hồ sơ</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="row mb-4">
        <div className="col-12">
          <ul className="nav nav-pills nav-justified bg-light rounded p-2">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                <i className="mdi mdi-account me-2"></i>Thông tin
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "security" ? "active" : ""}`}
                onClick={() => setActiveTab("security")}
              >
                <i className="mdi mdi-shield-lock me-2"></i>Bảo mật
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                <i className="mdi mdi-bell me-2"></i>Thông báo
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && renderProfileTab()}
      {activeTab === "security" && renderSecurityTab()}
      {activeTab === "notifications" && renderNotificationsTab()}
    </div>
  );
};

export default UserProfile;
