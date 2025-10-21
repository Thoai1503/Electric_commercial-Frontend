import { useState } from "react";
import AddAddressModal from "../../components/client/checkout/AddAddressModal";
import { userAddressQuery } from "../../module/client/query/userAddress";
import { useQuery } from "@tanstack/react-query";
import { useCheckoutPage } from "../../module/client/hook/checkout_page/useCheckoutPage";

const CheckOut = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const {
    data: address,
    isPending: isPendingAddress,
    isRefetching,
  } = useQuery(userAddressQuery.get_by_user_id(user.id));
  const {
    handleUpdate,
    selectedMethod,
    handleSelectPaymentMethod,
    paymentList,
    handleCheckout,
    isPendingCheckout,
    isPending,
  } = useCheckoutPage(user.id);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div
      className={
        isPendingCheckout || isPending || isRefetching || isPendingAddress
          ? "mt-5 loading"
          : "mt-5"
      }
    >
      {(isPendingCheckout || isPending || isRefetching || isPendingAddress) && (
        <div
          className="spinner-border text-primary"
          role="status"
          style={{
            opacity: 1,
            width: "3rem",
            height: "3rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            // transform: "translate(-50%, -50%)",
            zIndex: 1000,
          }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      )}
      <div className="row">
        <div className="col-lg-8">
          <div className="adress-info bg-white p-3 rounded">
            <div className="head">
              <h6>Thông tin địa chỉ</h6>
            </div>
            <hr />
            <div className="container">
              <p className="text">Thông tin nhận hàng</p>
              <div className="container row ">
                {address?.map((item) => (
                  <div
                    key={item.id}
                    className="method-item col-lg-6 py-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      handleUpdate(item.id, { ...item, is_default: true })
                    }
                  >
                    <div className="position-relative h-100">
                      <div
                        className="p-2 px-3 rounded h-100"
                        style={{
                          border: item.is_default
                            ? "1px solid #06b6d4"
                            : "1px solid lightgray",
                          overflow: "hidden",
                        }}
                      >
                        <h6 className="text">
                          <strong>{item.full_name}</strong>
                        </h6>
                        <p className="text mb-0">{item.phone}</p>
                        <p className="text">
                          {item.address_detail} , {item.wards.name},{" "}
                          {item.districts.name}, TPHCM
                        </p>
                      </div>
                      {/* Icon checkmark moved outside padding div */}
                      {item.is_default && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "0",
                            height: "0",
                            borderTop: "35px solid #06b6d4",
                            borderLeft: "35px solid transparent",
                            borderTopRightRadius: "0.375rem",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="white"
                            viewBox="0 0 16 16"
                            style={{
                              position: "absolute",
                              top: "-28px",
                              right: "4px",
                            }}
                          >
                            <path d="M13.485 1.929a.75.75 0 0 1 .09 1.06l-7 8a.75.75 0 0 1-1.08.04l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47 6.47-7.41a.75.75 0 0 1 1.06-.1z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                <div className="col-lg-6 method-item py-2">
                  <div
                    className="p-3 rounded h-100 d-flex justify-content-center align-items-center border"
                    style={{ borderColor: "lightgray", cursor: "pointer" }}
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    <div className="text-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="27"
                        height="27"
                        fill="currentColor"
                        className="bi bi-plus mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                      </svg>
                      <p className="mb-0 text   ">Thêm địa chỉ</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="adress-info bg-white p-3 rounded mt-3">
            <div className="head">
              <h5>
                <strong>Phương thức thanh toán</strong>
              </h5>
              <p className="text">
                Chọn phương thức thanh toán phù hợp với bạn
              </p>
              <div className="row container">
                {paymentList.map((item) => (
                  <div className="col-lg-6 method-item py-2">
                    <div className="position-relative h-100">
                      <div
                        className="p-3 rounded h-100"
                        style={{
                          border:
                            selectedMethod == item.method
                              ? "1px solid  #06b6d4"
                              : "1px solid  lightgray",
                          overflow: "hidden",
                        }}
                        onClick={() => handleSelectPaymentMethod(item.method)}
                      >
                        <div className="d-flex">
                          <img
                            width={20}
                            src="/paylogo/0oxhzjmxbksr1686814746087.png"
                          ></img>
                          <h5 className="text mb-1">{item.head}</h5>
                        </div>
                        <p className="text mb-0">{item.title}</p>
                      </div>
                      {/* Icon checkmark for VNPAY */}
                      {selectedMethod === item.method && (
                        <div
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            width: "0",
                            height: "0",
                            borderTop: "35px solid #06b6d4",
                            borderLeft: "35px solid transparent",
                            borderTopRightRadius: "0.375rem",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            fill="white"
                            viewBox="0 0 16 16"
                            style={{
                              position: "absolute",
                              top: "-28px",
                              right: "4px",
                            }}
                          >
                            <path d="M13.485 1.929a.75.75 0 0 1 .09 1.06l-7 8a.75.75 0 0 1-1.08.04l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47 6.47-7.41a.75.75 0 0 1 1.06-.1z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="adress-info bg-white p-3 rounded">
            <div className="head">
              <h6>
                <strong>Thông tin đơn hàng</strong>
              </h6>
            </div>
            <hr />

            {/* Danh sách sản phẩm */}
            <div className="order-items">
              {/* Sản phẩm 1 */}
              <div className="d-flex mb-3">
                <div
                  className="position-relative"
                  style={{ width: "80px", height: "80px", flexShrink: 0 }}
                >
                  <img
                    src="http://localhost:5173/uploads/6bc0d1b4-d459-4ace-9a70-9d4e61a2b232_asus-vivobook-go-15-e1504fa-r5-nj630w-glr-2-1-750x500.jpg?h=120&fit=crop&auto=format&dpr=2%202x?w=400&h=400&fit=crop"
                    alt="Product"
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="ms-3 flex-grow-1">
                  <p className="text mb-1" style={{ fontSize: "14px" }}>
                    Tai nghe Bluetooth Sony WH-1000XM5
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                    Màu: Đen
                  </p>
                  <p className="text mb-0" style={{ fontSize: "14px" }}>
                    <strong>5.990.000đ</strong>
                  </p>
                </div>
              </div>

              {/* Sản phẩm 2 */}
              <div className="d-flex mb-3">
                <div
                  className="position-relative"
                  style={{ width: "80px", height: "80px", flexShrink: 0 }}
                >
                  <img
                    src="http://localhost:5173/uploads/bd4185f4-80d7-4f3f-a488-f5d61f752097_iphone-17-pro-max-xanh-duong-thumb-600x600.jpg?h=120&fit=crop&auto=format&dpr=2%202x?w=400&h=400&fit=crop"
                    alt="Product"
                    className="rounded"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="ms-3 flex-grow-1">
                  <p className="text mb-1" style={{ fontSize: "14px" }}>
                    Đồng hồ thông minh Apple Watch Series 9
                  </p>
                  <p className="text-muted mb-0" style={{ fontSize: "13px" }}>
                    Màu: Xanh dương
                  </p>
                  <p className="text mb-0" style={{ fontSize: "14px" }}>
                    <strong>9.990.000đ</strong>
                  </p>
                </div>
              </div>
            </div>

            <hr />

            {/* Mã giảm giá */}
            <div className="mb-3">
              <div className="d-flex align-items-center">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Nhập mã giảm giá"
                  style={{ flex: 1, marginRight: "8px" }}
                />
                <button
                  className="btn btn-sm text-white"
                  style={{ backgroundColor: "#06b6d4" }}
                >
                  Áp dụng
                </button>
              </div>
            </div>

            <hr />

            {/* Tổng tiền */}
            <div className="order-summary">
              <div className="d-flex justify-content-between mb-2">
                <span className="text" style={{ fontSize: "14px" }}>
                  Tạm tính
                </span>
                <span className="text" style={{ fontSize: "14px" }}>
                  21.970.000đ
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text" style={{ fontSize: "14px" }}>
                  Phí vận chuyển
                </span>
                <span className="text" style={{ fontSize: "14px" }}>
                  30.000đ
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span
                  className="text"
                  style={{ fontSize: "14px", color: "#06b6d4" }}
                >
                  Giảm giá
                </span>
                <span
                  className="text"
                  style={{ fontSize: "14px", color: "#06b6d4" }}
                >
                  -500.000đ
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-3">
                <span style={{ fontSize: "16px" }}>
                  <strong>Tổng cộng</strong>
                </span>
                <span style={{ fontSize: "18px", color: "#06b6d4" }}>
                  <strong>21.500.000đ</strong>
                </span>
              </div>

              <button
                className="btn w-100 text-white"
                style={{ backgroundColor: "#06b6d4" }}
                onClick={handleCheckout}
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddAddressModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        user_id={user.id}
      />
    </div>
  );
};

export default CheckOut;
