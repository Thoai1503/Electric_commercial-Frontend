import { useState } from "react";
import { useLoginPage } from "../../hook/useLoginPage";
import { useRegister } from "../../hook/useRegister";
import {
  Mail,
  Lock,
  User,
  Smartphone,
  Loader2,
  AlertCircle,
} from "lucide-react";

const Login = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const {
    handleChange,
    loginValue,
    handleSubmit,
    isPending,
    showError,
    error,
  } = useLoginPage();
  const { formErrors } = useLoginPage();

  const {
    handleChangeRegiter,
    handleSubmitRegister,
    submitData,
    isPendingRegister,
  } = useRegister();

  return (
    <div className="min-vh-100 bg-gradient-to-br from-blue-50 via-white to-orange-50 d-flex align-items-center py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-9 col-xl-8">
            <div className="card shadow-xl border-0 rounded-4 overflow-hidden">
              <div className="row g-0">
                {/* Left: Banner */}
                <div className="col-lg-5 d-none d-lg-flex position-relative overflow-hidden">
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      backgroundImage:
                        "url('https://thumbs.dreamstime.com/b/cyber-monday-deals-modern-electronics-gadgets-promotional-banner-featuring-variety-electronic-laptops-smartphones-409165946.jpg')",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                  <div className="position-relative w-100 h-100 bg-black bg-opacity-50 d-flex flex-column justify-content-center align-items-center text-white p-5 z-1">
                    <h1 className="display-5 fw-bold mb-3 text-orange-400">
                      TechZone
                    </h1>
                    <p className="fs-5 text-center px-4 opacity-90">
                      Khám phá smartphone, laptop, tivi, máy lạnh và phụ kiện
                      chính hãng
                      <br />
                      với giá tốt nhất thị trường!
                    </p>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="col-lg-7 bg-white p-4 p-md-5">
                  {/* Mobile Title */}
                  <div className="text-center mb-5 d-lg-none">
                    <Smartphone size={60} className="text-blue-600 mb-3" />
                    <h3 className="fw-bold text-dark">TechZone</h3>
                  </div>

                  {/* Tabs */}
                  <ul className="nav nav-pills nav-fill mb-5 border-0 shadow-sm rounded-pill overflow-hidden bg-light">
                    <li className="nav-item">
                      <button
                        className={`nav-link fw-semibold py-3 rounded-pill ${
                          activeTab === "login"
                            ? "active bg-blue-600 text-white"
                            : "text-dark hover:bg-blue-50"
                        }`}
                        onClick={() => setActiveTab("login")}
                      >
                        Đăng nhập
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link fw-semibold py-3 rounded-pill ${
                          activeTab === "register"
                            ? "active bg-orange-600 text-white"
                            : "text-dark hover:bg-orange-50"
                        }`}
                        onClick={() => setActiveTab("register")}
                      >
                        Đăng ký
                      </button>
                    </li>
                  </ul>

                  {/* Login Form */}
                  {activeTab === "login" && (
                    <form
                      onSubmit={handleSubmit}
                      className="needs-validation"
                      noValidate
                    >
                      {showError && (
                        <div
                          className="alert alert-danger login-alert d-flex align-items-center rounded-3 mb-4"
                          role="alert"
                        >
                          <AlertCircle
                            size={20}
                            className="me-2 flex-shrink-0"
                          />
                          <div>
                            {error?.message || "Email hoặc mật khẩu không đúng"}
                          </div>
                        </div>
                      )}

                      <div className="mb-4 position-relative">
                        <Mail
                          className="position-absolute top-50 start-3 translate-middle-y text-muted"
                          size={20}
                        />
                        <input
                          type="email"
                          name="email"
                          value={loginValue.email}
                          onChange={handleChange}
                          className={`form-control form-control-lg ps-5 rounded-3 border-0 shadow-sm ${
                            formErrors?.email ? "is-invalid" : ""
                          }`}
                          placeholder="Email của bạn"
                          required
                        />
                        {formErrors?.email && (
                          <div className="invalid-feedback d-block">
                            {formErrors.email}
                          </div>
                        )}
                      </div>

                      <div className="mb-4 position-relative">
                        <Lock
                          className="position-absolute top-50 start-3 translate-middle-y text-muted"
                          size={20}
                        />
                        <input
                          type="password"
                          name="password"
                          value={loginValue.password}
                          onChange={handleChange}
                          className={`form-control form-control-lg ps-5 rounded-3 border-0 shadow-sm ${
                            formErrors?.password ? "is-invalid" : ""
                          }`}
                          placeholder="Mật khẩu"
                          required
                        />
                        {formErrors?.password && (
                          <div className="invalid-feedback d-block">
                            {formErrors.password}
                          </div>
                        )}
                      </div>

                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="remember"
                            defaultChecked
                          />
                          <label
                            className="form-check-label text-muted"
                            htmlFor="remember"
                          >
                            Ghi nhớ đăng nhập
                          </label>
                        </div>
                        <a
                          href="#!"
                          className="text-decoration-none small text-blue-600 fw-medium hover:text-blue-800"
                        >
                          Quên mật khẩu?
                        </a>
                      </div>

                      <button
                        type="submit"
                        disabled={
                          isPending ||
                          !!formErrors?.email ||
                          !!formErrors?.password
                        }
                        className="btn bg-blue-600 hover:bg-blue-700 text-black btn-lg w-100 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold transition-colors"
                      >
                        {isPending && (
                          <Loader2 className="animate-spin" size={20} />
                        )}
                        Đăng nhập
                      </button>
                    </form>
                  )}

                  {/* Register Form */}
                  {activeTab === "register" && (
                    <form
                      onSubmit={handleSubmitRegister}
                      className="needs-validation"
                      noValidate
                    >
                      {isPendingRegister && (
                        <div className="text-center py-5">
                          <Loader2
                            className="animate-spin text-orange-600 mb-3"
                            size={40}
                          />
                          <p className="text-muted">Đang tạo tài khoản...</p>
                        </div>
                      )}

                      <div className="mb-4 position-relative">
                        <User
                          className="position-absolute top-50 start-3 translate-middle-y text-muted"
                          size={20}
                        />
                        <input
                          type="text"
                          name="name"
                          value={submitData.name}
                          onChange={handleChangeRegiter}
                          className="form-control form-control-lg ps-5 rounded-3 border-0 shadow-sm"
                          placeholder="Họ và tên"
                          required
                        />
                      </div>

                      <div className="mb-4 position-relative">
                        <Mail
                          className="position-absolute top-50 start-3 translate-middle-y text-muted"
                          size={20}
                        />
                        <input
                          type="email"
                          name="email"
                          value={submitData.email}
                          onChange={handleChangeRegiter}
                          className="form-control form-control-lg ps-5 rounded-3 border-0 shadow-sm"
                          placeholder="Email"
                          required
                        />
                      </div>

                      <div className="mb-4 position-relative">
                        <Lock
                          className="position-absolute top-50 start-3 translate-middle-y text-muted"
                          size={20}
                        />
                        <input
                          type="password"
                          name="password"
                          value={submitData.password}
                          onChange={handleChangeRegiter}
                          className="form-control form-control-lg ps-5 rounded-3 border-0 shadow-sm"
                          placeholder="Mật khẩu"
                          required
                        />
                      </div>

                      <div className="mb-4 position-relative">
                        <Lock
                          className="position-absolute top-50 start-3 translate-middle-y text-muted"
                          size={20}
                        />
                        <input
                          type="password"
                          name="repeated_password"
                          value={submitData.repeated_password}
                          onChange={handleChangeRegiter}
                          className="form-control form-control-lg ps-5 rounded-3 border-0 shadow-sm"
                          placeholder="Nhập lại mật khẩu"
                          required
                        />
                      </div>

                      <div className="form-check mb-5">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          required
                        />
                        <label
                          className="form-check-label text-muted small"
                          htmlFor="terms"
                        >
                          Tôi đồng ý với{" "}
                          <a
                            href="#!"
                            className="text-blue-600 text-decoration-none hover:underline"
                          >
                            điều khoản sử dụng
                          </a>{" "}
                          và{" "}
                          <a
                            href="#!"
                            className="text-blue-600 text-decoration-none hover:underline"
                          >
                            chính sách bảo mật
                          </a>
                        </label>
                      </div>

                      <button
                        type="submit"
                        disabled={isPendingRegister}
                        className="btn bg-orange-600 hover:bg-orange-700 text-white btn-lg w-100 rounded-3 shadow-sm d-flex align-items-center justify-content-center gap-2 fw-semibold transition-colors"
                      >
                        {isPendingRegister && (
                          <Loader2 className="animate-spin" size={20} />
                        )}
                        Đăng ký tài khoản
                      </button>
                    </form>
                  )}

                  {/* Switch Link */}
                  <div className="text-center mt-4">
                    <small className="text-muted">
                      {activeTab === "login" ? (
                        <>
                          Chưa có tài khoản?{" "}
                          <button
                            type="button"
                            className="btn btn-link text-orange-600 p-0 fw-medium hover:text-orange-700"
                            onClick={() => setActiveTab("register")}
                          >
                            Đăng ký ngay
                          </button>
                        </>
                      ) : (
                        <>
                          Đã có tài khoản?{" "}
                          <button
                            type="button"
                            className="btn btn-link text-blue-600 p-0 fw-medium hover:text-blue-700"
                            onClick={() => setActiveTab("login")}
                          >
                            Đăng nhập
                          </button>
                        </>
                      )}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
