import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import { clearCart, removeFromCart } from "../../reducers/cartReducer";
import axios from "axios";
import useCartPage from "../../module/client/hook/cart_page/useCartPage";
import CartItem from "../../components/client/cart/CartItem";
import Breadcrumbs from "../../components/client/breadcrumbs/BreadCrumbs";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { getImageUrl } from "../../utils/imageHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeCartItem } from "../../module/client/service/cart";
import {
  CreditCard,
  ReceiptText,
  ShieldCheck,
  ShoppingCart,
  Trash2,
} from "lucide-react";

const CartPage = () => {
  const user = JSON.parse(localStorage.getItem("user")!);
  const { CartList, totalPrice, handleChange } = useCartPage(user?.id);
  const isLoggedIn = !!user;
  const [removingId, setRemovingId] = useState<number | null>(null);

  const cartList = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const totalGuestPrice = useMemo(
    () =>
      cartList.reduce(
        (sum, item) => sum + item.unit_price! * item.quantity!,
        0,
      ),
    [cartList],
  );

  const cartPageStyles = `
    .cart-surface {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
    }
    .cart-summary {
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
      border: 1px solid #e2e8f0;
      box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
    }
    .cart-title {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0;
      color: #0f172a;
    }
    .cart-clear-btn {
      border: none;
      background: transparent;
      color: #0d6efd;
      font-size: 0.85rem;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      padding: 0;
    }
    .cart-clear-btn:hover {
      color: #1d4ed8;
    }
    .summary-title {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #0f172a;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
      color: #334155;
    }
    .summary-row.total {
      color: #0d6efd;
      font-weight: 700;
      margin-top: 0.5rem;
    }
    .vat-note {
      font-size: 0.84rem;
      color: #64748b;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
    }
    .checkout-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      width: 100%;
      margin-top: 0.85rem;
      font-weight: 600;
    }
    .item-remove-btn {
      border: none;
      background: transparent;
      color: #ef4444;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.82rem;
      font-weight: 600;
      padding: 0;
    }
    .item-remove-btn:hover {
      color: #dc2626;
    }
  `;

  const { mutate: removeServerItem } = useMutation({
    mutationFn: (id: number) => removeCartItem(id),
    onMutate: (id) => {
      setRemovingId(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart", user?.id] });
    },
    onSettled: () => {
      setRemovingId(null);
    },
  });

  const checkOut = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Vui lòng đăng nhập để thanh toán");
      window.location.href = "/login";
      return;
    }

    const result = await axios.post(
      "http://localhost:5000/api/v1/momo-payment/create_payment",
    );
    alert("Url: " + result.data.url);
    const url = result.data.url;
    window.location.href = url;
  };

  if (!isLoggedIn) {
    return (
      <div className="container mt-3 mt-lg-5 mb-5">
        <style>{cartPageStyles}</style>
        <Breadcrumbs />
        <div className="row mt-4">
          <div className="col-12 col-lg-8 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="cart-title">
                <ShoppingCart size={20} className="text-primary" />
                <strong>Giỏ hàng ({cartList.length})</strong>
              </h5>
              <button
                className="cart-clear-btn"
                onClick={() => dispatch(clearCart())}
              >
                <Trash2 size={15} />
                Xoá tất cả
              </button>
            </div>
            <div className="cart-surface p-3 p-lg-4 rounded-4">
              {/* Header - Desktop only */}
              <div
                className="row mb-3 d-none d-lg-flex"
                style={{ borderBottom: "1px solid lightgray" }}
              >
                <div className="col-lg-6 text">
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
                <div className="col-lg-1 text-end">
                  <strong>Xoá</strong>
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
                          src={getImageUrl(
                            item?.variant?.product_images?.[0]?.url,
                          )}
                          alt={item?.variant?.name}
                        />
                      </div>
                      <div className="col-lg-4">
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
                      <div className="col-lg-2 d-flex justify-content-center">
                        {/* {create a d-flex div with 2 change quantity button and the quantity that not input} */}
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              handleChange({
                                target: {
                                  id: item.variant_id!.toString(),
                                  value: (item.quantity! - 1).toString(),
                                },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                            disabled={item.quantity! <= 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() =>
                              handleChange({
                                target: {
                                  id: item.variant_id!.toString(),
                                  value: (item.quantity! + 1).toString(),
                                },
                              } as React.ChangeEvent<HTMLInputElement>)
                            }
                          >
                            +
                          </button>
                        </div>
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
                      <div className="col-lg-1 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => dispatch(removeFromCart(item.id!))}
                          title="Xoá sản phẩm"
                        >
                          Xoá
                        </button>
                      </div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="d-lg-none">
                      <div className="d-flex gap-3 mb-2">
                        <img
                          width={80}
                          height={80}
                          style={{ objectFit: "contain" }}
                          src={getImageUrl(
                            item?.variant?.product_images?.[0]?.url,
                          )}
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
                      <div className="d-flex justify-content-end mt-2">
                        <button
                          type="button"
                          className="item-remove-btn"
                          onClick={() => dispatch(removeFromCart(item.id!))}
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="cart-summary p-3 p-lg-4 rounded-4">
              <p className="summary-title">
                <ReceiptText size={18} className="text-primary" />
                Thanh toán
              </p>
              <div className="summary-row">
                <h6 className="mb-0">Tạm tính:</h6>
                <p className="mb-0">
                  {totalGuestPrice.toLocaleString("vi-VN")}đ
                </p>
              </div>
              <div className="summary-row total">
                <h6 className="mb-0 d-inline-flex align-items-center gap-1">
                  <CreditCard size={16} /> Thành tiền:
                </h6>
                <h6 className="mb-0">
                  {totalGuestPrice.toLocaleString("vi-VN")}đ
                </h6>
              </div>

              <hr />
              <p className="vat-note mb-0">
                <ShieldCheck size={16} className="text-success" />
                Giá đã bao gồm VAT (nếu có)
              </p>

              <button
                onClick={checkOut}
                className="btn btn-primary checkout-btn"
              >
                <CreditCard size={16} />
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
      <style>{cartPageStyles}</style>
      <Breadcrumbs />
      <div className="row mt-4">
        <div className="col-12 col-lg-8 mb-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="cart-title">
              <ShoppingCart size={20} className="text-primary" />
              <strong>Giỏ hàng ({CartList?.length})</strong>
            </h5>
            <button
              className="cart-clear-btn"
              onClick={() => dispatch(clearCart())}
            >
              <Trash2 size={15} />
              Xoá tất cả
            </button>
          </div>
          <div className="cart-surface p-3 p-lg-4 rounded-4">
            {/* Header - Desktop only */}
            <div
              className="row mb-3 d-none d-lg-flex"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <div className="col-lg-6 text">
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
              <div className="col-lg-1 text-end">
                <strong>Xoá</strong>
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
                        src={getImageUrl(
                          item?.variant?.product_images?.[0]?.url,
                        )}
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
                    <div className="d-flex justify-content-end mt-2">
                      <button
                        type="button"
                        className="item-remove-btn"
                        onClick={() => item.id && removeServerItem(item.id)}
                        disabled={removingId === item.id}
                      >
                        {removingId === item.id ? "Đang xoá..." : "Xoá"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <div className="cart-summary p-3 p-lg-4 rounded-4">
            <p className="summary-title">
              <ReceiptText size={18} className="text-primary" />
              Thanh toán
            </p>
            <div className="summary-row">
              <h6 className="mb-0">Tạm tính:</h6>
              <p className="mb-0">
                {totalPrice?.toLocaleString("vi-VN") || 0}đ
              </p>
            </div>
            <div className="summary-row total">
              <h6 className="mb-0 d-inline-flex align-items-center gap-1">
                <CreditCard size={16} /> Thành tiền:
              </h6>
              <h6 className="mb-0">{totalPrice?.toLocaleString("vi-VN")}đ</h6>
            </div>
            <hr />
            <p className="vat-note mb-0">
              <ShieldCheck size={16} className="text-success" />
              Giá đã bao gồm VAT (nếu có)
            </p>

            <Link to="/checkout" className="btn btn-primary checkout-btn">
              <CreditCard size={16} />
              Thanh toán
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
