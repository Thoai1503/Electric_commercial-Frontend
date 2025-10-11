import type { Cart } from "../../../type/Cart";
import { useCartItemMutation } from "../../../module/client/hook/cart_page/useCartItemMutation";

interface Prop {
  item: Cart;
}

const CartItem = ({ item }: Prop) => {
  const { cartItem, handleChange, isPending } = useCartItemMutation(item);

  return (
    <div key={item.id} className="cart-item pb-3 mb-3">
      <div className="row align-items-center">
        <div className="col-lg-2">
          <img
            width={80}
            src={`/uploads/${item?.variant?.product_images?.[0]?.url}`}
            alt={item?.variant?.name}
          />
        </div>
        <div className="col-lg-6">
          <div className="row">
            <p className="cart-item title mb-0 text">{item?.variant?.name}</p>{" "}
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
              {item?.variant?.price!.toLocaleString("vi-VN")}đ
            </strong>
          </span>
        </div>
        <div className="col-lg-2">
          <input
            type="number"
            name="quantity"
            readOnly={isPending}
            value={cartItem.quantity}
            className="form-control"
            style={{ width: "60px" }}
            onChange={handleChange}
          />
        </div>

        <div className="col-lg-1">
          <span className="item-price  d-flex justify-content-end">
            <strong className="text">
              {(item?.variant?.price! * item.quantity!).toLocaleString("vi-VN")}
              đ
            </strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
