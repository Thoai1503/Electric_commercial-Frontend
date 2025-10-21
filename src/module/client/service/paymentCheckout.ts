import { Request } from "../../../api/http";

export const createPayment = async (paymentInfo: any) => {
  return await Request.post("/api/v1/payment/create_payment_test", paymentInfo)
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};
