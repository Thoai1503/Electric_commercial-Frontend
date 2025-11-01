import Breadcrumbs from "../../components/client/breadcrumbs/BreadCrumbs";

const Product = () => {
  return (
    <div className="container mt-0">
      <Breadcrumbs />

      <div className="content row">
        <div className="col-lg-2  py-2">
          <div className="bg-white rounded p-3">
            {" "}
            <strong>
              {" "}
              <p className="text">Bộ lọc tìm kiếm</p>
            </strong>
            <div className="selected-tag mb-3">
              <span
                className="text px-2"
                style={{ border: "1px solid lightgray", borderRadius: "10px" }}
              >
                RAM 64-GB
              </span>
            </div>
            <p className="text text-danger ">Xoá bộ lọc</p>
            <hr />
            <strong>
              {" "}
              <p className="text">Thương hiệu</p>
            </strong>
            <div className="row mb-3">
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Samsung
              </span>
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Acer
              </span>
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Asus
              </span>
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Dell
              </span>
            </div>
            <hr />
            <strong>
              {" "}
              <p className="text">CPU</p>
            </strong>
            <div className="row  mb-3">
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Core i5
              </span>
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Core i7
              </span>
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Core Ultra 5
              </span>
              <span className="text col-lg-6">
                {" "}
                <input type="checkbox" /> Core Ultra 7
              </span>
            </div>
          </div>
        </div>

        <div className="col-lg-9  ">
          <div className="p-3 bg-white rounded mb-2">
            {" "}
            <h4>Laptop (26 sản phẩm)</h4>
          </div>
          <div className="p-3 bg-white rounded mb-1">
            <div className="head d-flex">
              <div>Sắp xếp theo:</div>
              <div
                className="position-relative mx-2 rounded p-2 text"
                style={{
                  border: "1px solid #06b6d4",
                }}
              >
                Giá tăng dần
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "0",
                    height: "0",
                    borderTop: "25px solid #06b6d4",
                    borderLeft: "25px solid transparent",
                    borderTopRightRadius: "0.375rem",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="11"
                    height="11"
                    fill="white"
                    viewBox="0 0 16 16"
                    style={{
                      position: "absolute",
                      top: "-22px",
                      right: "4px",
                    }}
                  >
                    <path d="M13.485 1.929a.75.75 0 0 1 .09 1.06l-7 8a.75.75 0 0 1-1.08.04l-3-3a.75.75 0 0 1 1.06-1.06l2.47 2.47 6.47-7.41a.75.75 0 0 1 1.06-.1z" />
                  </svg>
                </div>
              </div>
              <div
                className="mx-2 rounded p-2 text"
                style={{
                  border: "1px solid lightgray",
                }}
              >
                Giá giảm dần
              </div>
              <div
                className="mx-2 rounded p-2 text"
                style={{
                  border: "1px solid lightgray",
                }}
              >
                Mới nhất
              </div>
              <div
                className="mx-2 rounded p-2 text"
                style={{
                  border: "1px solid lightgray",
                }}
              >
                Bán chạy nhất
              </div>
            </div>
          </div>
          <div className=" bg-white ">
            <div className="row mx-0">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  className="col-lg-3 pb-3 m"
                  style={{ marginRight: "0px", padding: "3px", width: "240px" }}
                >
                  <div className="card h-100" style={{ borderRadius: "0px" }}>
                    <img
                      src="/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                      alt="df"
                    />
                    <div
                      className="card-body pb-0"
                      style={{ minHeight: "100px" }}
                    >
                      <div>
                        <p className="text">
                          Asus Vivobook Go 15 E1504FA R5 - NJ630W
                        </p>
                        <p className="small text-muted">Laptops</p>
                      </div>
                    </div>
                    <div className="card-body pb-0">
                      <div className="d-flex justify-content-between">
                        <p>
                          <span style={{ color: "#1a96e2ff" }}>
                            <strong> 1.000.000 vnđ</strong>
                          </span>
                        </p>
                        <p className="text-dark"> 8787</p>
                      </div>
                      <p className="small text-muted">VISA Platinum</p>
                    </div>
                    <div className="card-body" style={{ marginTop: "auto" }}>
                      <button
                        type="button"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-outline-primary btn-sm w-100"
                      >
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* <div className="col-lg-3 ">
                <div className="card h-100">
                  <img
                    src="/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    alt="df"
                  />
                  <div
                    className="card-body pb-0"
                    style={{ minHeight: "100px" }}
                  >
                    <div>
                      <p className="text">Laptop Asus</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 ">
                <div className="card h-100">
                  <img
                    src="/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    alt="df"
                  />
                  <div
                    className="card-body pb-0"
                    style={{ minHeight: "100px" }}
                  >
                    <div>
                      <p className="text">Laptop Asus</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 " style={{ borderRadius: "0px" }}>
                <div className="card h-100" style={{ borderRadius: "0px" }}>
                  <img
                    src="/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      borderRadius: "0px",
                    }}
                    alt="df"
                  />
                  <div
                    className="card-body pb-0"
                    style={{ minHeight: "100px" }}
                  >
                    <div>
                      <p className="text">Laptop Asus</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 ">
                <div className="card h-100">
                  <img
                    src="/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    alt="df"
                  />
                  <div
                    className="card-body pb-0"
                    style={{ minHeight: "100px" }}
                  >
                    <div>
                      <p className="text">Laptop Asus</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
