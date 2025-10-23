import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { updateAddress } from "../../service/useraddress";
import type { UserAddress } from "../../../../type/UserAddress";
import { useEffect, useMemo, useState } from "react";
import cartQuery from "../../query/cart";
import { createPayment } from "../../service/paymentCheckout";
import type { Cart } from "../../../../type/Cart";

interface PaymentInfo {
  amount: number;
  orderId: number;
  method: string;
  bankCode?: string;
  orderInfo: string;
}

export const useCheckoutPage = (user_id: number) => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData([
    "user_address",
    user_id,
  ]) as UserAddress[];
  const cartItems = queryClient.getQueryData(["cart", user_id]) as Cart[];

  const current_address = useMemo(
    () => data?.filter((item) => item.is_default == true) || [],
    [data]
  );
  //  alert(JSON.stringify(current_address.length));
  const { data: cartList } = useQuery(cartQuery.getByUser(user_id));

  const totalPrice = useMemo(() => {
    if (!cartList) return 0;
    return cartList.reduce(
      (sum, item) => sum + (item?.variant?.price || 0) * (item.quantity || 0),
      0
    );
  }, [cartList]);

  useEffect(() => {
    if (!cartList || cartList.length === 0 || current_address.length === 0) {
      return;
    }
    setPaymentInfo((prev) => ({
      ...prev,
      amount: totalPrice,
      orderInfo: JSON.stringify({ user_id, address_id: current_address[0].id }),
    }));
  }, [totalPrice, current_address]);

  const paymentList = [
    {
      head: "Thanh toán VNPAYQR (chưa hỗ trợ cho môi trường test)",
      title: "Thanh toán bằng mã QR VNPAY  ",
      method: "NCB",
      code: "vnpay",
    },
    {
      head: "ATM nội địa (test được)",
      title: "Thanh toán qua thẻ ATM nội địa",
      method: "VNBANK",
      code: "vnpay",
    },
    {
      head: "Thanh toán MOMO",
      title: "Thanh toán qua ứng dụng MOMO",
      method: "momo",
      code: "momo",
    },
  ];
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    amount: totalPrice,
    orderId: Date.now(),
    method: "",
    orderInfo: "",
  });
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  interface UpdatedProp {
    id: number;
    data: Partial<UserAddress>;
  }
  const handleSelectPaymentMethod = (method: string) => {
    switch (method) {
      case "momo":
        delete paymentInfo.bankCode;
        setPaymentInfo((pre) => ({ ...pre, method: method.trim() }));
        setSelectedMethod("momo");
        return;
      case "NCB":
        setPaymentInfo((pre) => ({
          ...pre,
          method: "vnpay",
          bankCode: "NCB",
        }));
        setSelectedMethod("NCB");
        return;
      case "VNBANK":
        setPaymentInfo((pre) => ({
          ...pre,
          method: "vnpay",
          bankCode: "VNBANK",
        }));
        setSelectedMethod("VNBANK");
        return;
      default:
        setPaymentInfo({
          amount: totalPrice,
          orderId: Date.now(),
          method: "",
          orderInfo: "",
        });
    }
  };
  const handleCheckout = () => {
    alert(JSON.stringify(paymentInfo));
    checkout(paymentInfo);
  };

  const { isPending: isPendingCheckout, mutate: checkout } = useMutation({
    mutationFn: (paymentInf: typeof paymentInfo) => createPayment(paymentInf),
    onSuccess: (data) => {
      if (data.success) {
        //    alert(data.success + data.url);
        window.location.href = data.url;
      } else {
        alert(data.success);
      }
    },
    onError: (err) => alert(err),
  });

  const handleUpdate = (id: number, data: Partial<UserAddress>) => {
    update({ id: id, data: data });
  };

  const { isPending, mutate: update } = useMutation({
    mutationFn: ({ id, data }: UpdatedProp) => updateAddress(id, data),
    onSuccess: (data) => {
      if (data)
        queryClient.invalidateQueries({ queryKey: ["user_address", user_id] });
    },
    onError: (error) => {
      alert(error);
    },
  });
  return {
    handleUpdate,
    selectedMethod,
    handleSelectPaymentMethod,
    paymentList,
    handleCheckout,
    isPendingCheckout,
    isPending,
    cartItems,
  };
};
