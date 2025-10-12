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
  // alert("User in cart page: " + JSON.stringify(list));
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
      <div className="container mt-5 mb-5 ">
        <Breadcrumbs />
        <div className="row mt-4 ">
          <div className="col-lg-8 mb-4  ">
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
              <div
                className=" row mb-3"
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
              <div style={{}}>
                {cartList.map((item) => (
                  <div key={item.id} className="cart-item pb-3 mb-3">
                    <div className="row align-items-center">
                      <div className="col-lg-2">
                        <img
                          width={80}
                          src={`/uploads/${item?.product_images?.[0]?.url}`}
                          alt={item.name}
                        />
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <p className="cart-item title mb-0 text">
                            {item.name}
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
                      <div className="col-lg-1">
                        <span className="item-price  d-flex justify-content-end">
                          <strong className="text">
                            {item.price!.toLocaleString("vi-VN")}đ
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
                          onChange={
                            (e) => e
                            //    handleQuantityChange(item.id!, parseInt(e.target.value))
                          }
                        />
                      </div>

                      <div className="col-lg-1">
                        <span className="item-price  d-flex justify-content-end">
                          <strong className="text">
                            {(
                              item.price! * (item.quantity || 1)
                            ).toLocaleString("vi-VN")}
                            đ
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="row">
            <h6 className="col-lg-6">Tạm tính (3 sản phẩm):</h6>
            <p className="d-flex justify-content-end">{totalPrice}</p>
          </div> */}
          </div>

          {/* Cart Summary */}
          <div className="col-lg-4 pt-5">
            <div className="p-3 bg-white p-3 rounded">
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
              {/* <button
              onClick={checkOutVNPay}
              className="btn btn-outline-primary w-100 mt-3"
            >
              Thanh toán VNPay
            </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-5 mb-5 ">
      <Breadcrumbs />
      <div className="row mt-4 ">
        <div className="col-lg-8 mb-4  ">
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
            <div
              className=" row mb-3"
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
            <div style={{}}>
              {CartList?.map((item) => (
                <CartItem item={item} />
              ))}
            </div>
          </div>
          {/* <div className="row">
            <h6 className="col-lg-6">Tạm tính (3 sản phẩm):</h6>
            <p className="d-flex justify-content-end">{totalPrice}</p>
          </div> */}
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4 pt-5">
          <div className="p-3 bg-white p-3 rounded">
            <p>
              <strong>Thanh toán</strong>
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <h6>Tạm tính:</h6>
              <p>{totalPrice?.toLocaleString("vi-VN")}đ</p>
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
            {/* <button
              onClick={checkOutVNPay}
              className="btn btn-outline-primary w-100 mt-3"
            >
              Thanh toán VNPay
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
