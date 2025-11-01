import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import { clearCart } from "../../reducers/cartReducer";
import axios from "axios";
import useCartPage from "../../module/client/hook/cart_page/useCartPage";
import CartItem from "../../components/client/cart/CartItem";
import Breadcrumbs from "../../components/client/breadcrumbs/BreadCrumbs";
import { Link } from "react-router-dom";

const CartPage = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { CartList, totalPrice } = useCartPage(user?.id);
  const isLoggedIn = !!user;

  const cartList = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const checkOut = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Vui lòng đăng nhập để thanh toán");
      window.location.href = "/login";
      return;
    }

    const result = await axios.post(
      "http://localhost:5000/api/v1/momo-payment/create_payment"
    );
    alert("Url: " + result.data.url);
    const url = result.data.url;
    window.location.href = url;
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <Breadcrumbs />
        <div className="row mt-4">
          <div className="col-12 col-lg-8 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>
                <strong>Giỏ hàng ({cartList.length})</strong>
              </h5>
              <p
                style={{
                  fontSize: "13px",
                  cursor: "pointer",
                  color: "#63b6c5ff",
                }}
                onClick={() => dispatch(clearCart())}
              >
                Xoá tất cả
              </p>
            </div>
            <div className="bg-white p-3 rounded">
              {/* Header - Desktop only */}
              <div
                className="row mb-3 d-none d-lg-flex"
                style={{ borderBottom: "1px solid lightgray" }}
              >
                <div className="col-lg-7 text">
                  <strong>Tên sản phẩm</strong>
                </div>
                <div className="col-lg-2 text">
                  <strong>Đơn giá</strong>
                </div>
                <div className="col-lg-2 text">
                  <strong>Số lượng</strong>
                </div>
                <div className="col-lg-1 text">
                  <strong>Thành tiền</strong>
                </div>
              </div>

              <div>
                {cartList.map((item) => (
                  <div key={item.id} className="cart-item pb-3 mb-3">
                    {/* Desktop Layout */}
                    <div className="row align-items-center d-none d-lg-flex">
                      <div className="col-lg-2">
                        <img
                          width={80}
                          src={`/uploads/${item?.variant?.product_images?.[0]?.url}`}
                          alt={item?.variant?.name}
                        />
                      </div>
                      <div className="col-lg-5">
                        <div className="row">
                          <p className="cart-item title mb-0 text">
                            {item?.variant?.name}
                          </p>
                          <span
                            className="sku text"
                            style={{
                              fontSize: "14px",
                            }}
                          >
                            SKU: 123456
                          </span>
                          <div className="variant">
                            <span
                              className="p-1 text"
                              style={{
                                backgroundColor: "#f3f3f3ff",
                                fontSize: "13px",
                                borderRadius: "3px",
                              }}
                            >
                              Màu bạc + 64 GB
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2">
                        <span className="item-price d-flex justify-content-end">
                          <strong className="text">
                            {item.unit_price!.toLocaleString("vi-VN")}đ
                          </strong>
                        </span>
                      </div>
                      <div className="col-lg-2">
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="form-control"
                          style={{ width: "50px" }}
                          onChange={(e) => e}
                        />
                      </div>
                      <div className="col-lg-1">
                        <span className="item-price d-flex justify-content-end">
                          <strong className="text">
                            {(
                              item.unit_price! * (item.quantity || 1)
                            ).toLocaleString("vi-VN")}
                            đ
                          </strong>
                        </span>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="d-lg-none">
                      <div className="d-flex gap-3 mb-2">
                        <img
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          src={`/uploads/${item?.variant?.product_images?.[0]?.url}`}
                          alt={item?.variant?.name}
                        />
                        <div className="flex-grow-1">
                          <p className="mb-1">
                            <strong>{item?.variant?.name}</strong>
                          </p>
                          <p
                            className="text-muted mb-1"
                            style={{ fontSize: "12px" }}
                          >
                            SKU: 123456
                          </p>
                          <span
                            className="p-1"
                            style={{
                              backgroundColor: "#f3f3f3ff",
                              fontSize: "12px",
                              borderRadius: "3px",
                            }}
                          >
                            Màu bạc + 64 GB
                          </span>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div>
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            Đơn giá:
                          </p>
                          <strong>
                            {item.unit_price!.toLocaleString("vi-VN")}đ
                          </strong>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          <span style={{ fontSize: "14px" }}>SL:</span>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            className="form-control"
                            style={{ width: "60px" }}
                            onChange={(e) => e}
                          />
                        </div>
                        <div className="text-end">
                          <p className="mb-0" style={{ fontSize: "14px" }}>
                            Thành tiền:
                          </p>
                          <strong style={{ color: "#1586ddff" }}>
                            {(
                              item.unit_price! * (item.quantity || 1)
                            ).toLocaleString("vi-VN")}
                            đ
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="p-3 bg-white rounded">
              <p>
                <strong>Thanh toán</strong>
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Thành tiền:</h6>
                <h6 style={{ color: "#1586ddff" }}>
                  {totalPrice?.toLocaleString("vi-VN")}đ
                </h6>
              </div>
              <hr />
              <p style={{ fontSize: "14px", color: "gray" }}>
                Giá đã bao gồm VAT (nếu có)
              </p>

              <button
                onClick={checkOut}
                className="btn btn-outline-primary w-100 mt-3"
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-3 mt-lg-5 mb-5">
      <Breadcrumbs />
      <div className="row mt-4">
        <div className="col-12 col-lg-8 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5>
              <strong>Giỏ hàng ({CartList?.length})</strong>
            </h5>
            <p
              style={{
                fontSize: "13px",
                cursor: "pointer",
                color: "#63b6c5ff",
              }}
              onClick={() => dispatch(clearCart())}
            >
              Xoá tất cả
            </p>
          </div>
          <div className="bg-white p-3 rounded">
            {/* Header - Desktop only */}
            <div
              className="row mb-3 d-none d-lg-flex"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <div className="col-lg-7 text">
                <strong>Tên sản phẩm</strong>
              </div>
              <div className="col-lg-2 text">
                <strong>Đơn giá</strong>
              </div>
              <div className="col-lg-2 text">
                <strong>Số lượng</strong>
              </div>
              <div className="col-lg-1 text">
                <strong>Thành tiền</strong>
              </div>
            </div>

            <div>
              {CartList?.map((item) => (
                <div key={item.id}>
                  {/* Desktop view */}
                  <div className="d-none d-lg-block">
                    <CartItem item={item} />
                  </div>

                  {/* Mobile view */}
                  <div className="d-lg-none cart-item pb-3 mb-3">
                    <div className="d-flex gap-3 mb-2">
                      <img
                        width={80}
                        height={80}
                        style={{ objectFit: "contain" }}
                        src={`/uploads/${item?.variant?.product_images?.[0]?.url}`}
                        alt={item?.variant?.name}
                      />
                      <div className="flex-grow-1">
                        <p className="mb-1">
                          <strong>{item?.variant?.name}</strong>
                        </p>
                        <p
                          className="text-muted mb-1"
                          style={{ fontSize: "12px" }}
                        >
                          SKU: 123456
                        </p>
                        <span
                          className="p-1"
                          style={{
                            backgroundColor: "#f3f3f3ff",
                            fontSize: "12px",
                            borderRadius: "3px",
                          }}
                        >
                          Màu bạc + 64 GB
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <div>
                        <p className="mb-0" style={{ fontSize: "14px" }}>
                          Đơn giá:
                        </p>
                        <strong>
                          {/* {item.unit_price!.toLocaleString("vi-VN")}đ */}
                        </strong>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span style={{ fontSize: "14px" }}>SL:</span>
                        <input
                          type="number"
                          value={item.quantity}
                          min="1"
                          className="form-control"
                          style={{ width: "60px" }}
                          readOnly
                        />
                      </div>
                      <div className="text-end">
                        <p className="mb-0" style={{ fontSize: "14px" }}>
                          Thành tiền:
                        </p>
                        <strong style={{ color: "#1586ddff" }}>
                          {(
                            item.unit_price! * (item.quantity || 1)
                          ).toLocaleString("vi-VN")}
                          đ
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="p-3 bg-white rounded">
            <p>
              <strong>Thanh toán</strong>
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <h6>Tạm tính:</h6>
              <p>{totalPrice?.toLocaleString("vi-VN") || 0}đ</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <h6>Thành tiền:</h6>
              <h6 style={{ color: "#1586ddff" }}>
                {totalPrice?.toLocaleString("vi-VN")}đ
              </h6>
            </div>
            <hr />
            <p style={{ fontSize: "14px", color: "gray" }}>
              Giá đã bao gồm VAT (nếu có)
            </p>

            <Link to="/checkout" className="btn btn-outline-primary w-100 mt-3">
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
