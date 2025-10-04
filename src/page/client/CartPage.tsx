import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../store/store";
import { clearCart, removeFromCart } from "../../reducers/cartReducer";

const CartPage = () => {
  const cartList = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  // const handleQuantityChange = (id: number, newQty: number) => {
  //   setCart((prevCart) =>
  //     prevCart.map((item) =>
  //       item.id === id ? { ...item, qty: newQty > 0 ? newQty : 1 } : item
  //     )
  //   );
  // };

  const totalPrice = cartList.reduce(
    (sum, item) => sum + item.price! * item.quantity!,
    0
  );

  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-4">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p>
              <strong>Giỏ hàng ({cartList.length})</strong>
            </p>
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

          {cartList.map((item) => (
            <div
              key={item.id}
              className="cart-item pb-3 mb-3"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <div className="row align-items-center">
                <div className="col-lg-2">
                  <img
                    width={80}
                    src={`/uploads/${item?.product_images?.[0]?.url}`}
                    alt={item.name}
                  />
                </div>
                <div className="col-lg-7">
                  <h6 className="cart-item title">{item.name}</h6>
                  <span
                    className="sku"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    SKU: 123456
                  </span>
                  <div className="variant">
                    <span
                      className="p-1"
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
                {/* <div className="col-lg-2">
                  <input
                    type="number"
                    value={item.qty}
                    min="1"
                    className="form-control"
                    style={{ width: "50px", borderRadius: "0px" }}
                    onChange={(e) =>
                      handleQuantityChange(item.id, parseInt(e.target.value))
                    }
                  />
                </div> */}
                <div className="col-lg-3">
                  <span className="item-price  d-flex justify-content-end">
                    <strong>
                      {(item.price! * (item.quantity || 1)).toLocaleString(
                        "vi-VN"
                      )}
                      đ
                    </strong>
                  </span>
                </div>
                <div className="col-lg-1 text-end"></div>
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => dispatch(removeFromCart(item.id!))}
                >
                  Xoá
                </span>
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
            </div>
          ))}
          <div className="row">
            <h6 className="col-lg-6">Tạm tính (3 sản phẩm):</h6>
            <p className="d-flex justify-content-end">{totalPrice}</p>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="col-lg-4">
          <div className="p-3 border rounded shadow-sm">
            <h5>Tổng tiền</h5>
            <h4
              style={{
                color: "#48d6f0ff",
              }}
            >
              {totalPrice.toLocaleString("vi-VN")}đ
            </h4>
            <button className="btn btn-outline-primary w-100 mt-3">
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
