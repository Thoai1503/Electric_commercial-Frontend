const SuccessfulCheckout = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h2> Your payment was successful </h2>
            <p>
              {" "}
              Thank you for your payment. we will <br />
              be in contact with more details shortly{" "}
            </p>
            <button
              className="btn btn-primary w-70 mt-3"
              onClick={() => {
                window.location.href = "/order-history";
              }}
            >
              Go to your order histories
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfulCheckout;
