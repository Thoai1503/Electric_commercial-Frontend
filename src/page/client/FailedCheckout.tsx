const FailedCheckout = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success _failed">
            <i className="fa fa-times-circle" aria-hidden="true"></i>
            <h2> Your payment failed </h2>
            <p> Đơn đặt hàng đã huỷ, vì bạn đã huỷ thanh toán </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailedCheckout;
