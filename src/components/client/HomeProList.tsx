import { useState } from "react";
import type { Product } from "../../type/Product";

import "./style.css";

const HomeProList = () => {
  const [activeFilter, setActiveFilter] = useState<string>("*");

  const products: Product[] = [
    {
      id: 1,
      brand: "Apple",
      name: "Apple iPhone 10",
      price: 152,
      img: "https://ltp.crfnetwork.com/mobile-shop-backend/assets/products/7.png",
    },
    {
      id: 2,
      brand: "Samsung",
      name: "Samsung Galaxy 10",
      price: 152,
      img: "https://ltp.crfnetwork.com/mobile-shop-backend/assets/products/9.png",
    },
    {
      id: 3,
      brand: "Redmi",
      name: "Redmi Note 7 Pro",
      price: 152,
      img: "https://ltp.crfnetwork.com/mobile-shop-backend/assets/products/9.png",
    },
    {
      id: 4,
      brand: "Apple",
      name: "Apple iPhone 12",
      price: 252,
      img: "https://ltp.crfnetwork.com/mobile-shop-backend/assets/products/2.png",
    },
  ];

  const filters = ["*", "Apple", "Samsung", "Redmi"];
  return (
    <>
      <div className="row mt-5">
        <section>
          <div
            className="container py-5"
            style={{ backgroundColor: "#ffffffff" }}
          >
            <div className="row">
              <div className="col-md-12">
                <div className="row justify-content-center">
                  <div
                    className="col-md-3 col-lg-6 col-xl-4"
                    style={{ margin: "2px", width: "250px" }}
                  >
                    <div className="card" style={{ borderRadius: "5px" }}>
                      <div
                        className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
                          style={{
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                          }}
                          className="img-fluid"
                          alt="Laptop"
                        />
                        <a href="#!">
                          <div className="mask"></div>
                        </a>
                      </div>
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <a href="#!" className="text-dark">
                                Dell Xtreme 270
                              </a>
                            </p>
                            <p className="small text-muted">Laptops</p>
                          </div>
                          <div>
                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <p className="small text-muted">Rated 4.0/5</p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <p>
                            <a href="#!" className="text-dark">
                              $3,999
                            </a>
                          </p>
                          <p className="text-dark">#### 8787</p>
                        </div>
                        <p className="small text-muted">VISA Platinum</p>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                          <a href="#!" className="text-dark fw-bold">
                            Cancel
                          </a>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-primary"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-3 col-lg-6 col-xl-4"
                    style={{ margin: "2px", width: "250px" }}
                  >
                    <div className="card" style={{ borderRadius: "5px" }}>
                      <div
                        className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
                          style={{
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                          }}
                          className="img-fluid"
                          alt="Laptop"
                        />
                        <a href="#!">
                          <div className="mask"></div>
                        </a>
                      </div>
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <a href="#!" className="text-dark">
                                Dell Xtreme 270
                              </a>
                            </p>
                            <p className="small text-muted">Laptops</p>
                          </div>
                          <div>
                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <p className="small text-muted">Rated 4.0/5</p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <p>
                            <a href="#!" className="text-dark">
                              $3,999
                            </a>
                          </p>
                          <p className="text-dark">#### 8787</p>
                        </div>
                        <p className="small text-muted">VISA Platinum</p>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                          <a href="#!" className="text-dark fw-bold">
                            Cancel
                          </a>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-primary"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-3 col-lg-6 col-xl-4"
                    style={{ margin: "2px", width: "250px" }}
                  >
                    <div className="card" style={{ borderRadius: "5px" }}>
                      <div
                        className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
                          style={{
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                          }}
                          className="img-fluid"
                          alt="Laptop"
                        />
                        <a href="#!">
                          <div className="mask"></div>
                        </a>
                      </div>
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <a href="#!" className="text-dark">
                                Dell Xtreme 270
                              </a>
                            </p>
                            <p className="small text-muted">Laptops</p>
                          </div>
                          <div>
                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <p className="small text-muted">Rated 4.0/5</p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <p>
                            <a href="#!" className="text-dark">
                              $3,999
                            </a>
                          </p>
                          <p className="text-dark">#### 8787</p>
                        </div>
                        <p className="small text-muted">VISA Platinum</p>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                          <a href="#!" className="text-dark fw-bold">
                            Cancel
                          </a>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-primary"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="col-md-3 col-lg-6 col-xl-4"
                    style={{ margin: "2px", width: "250px" }}
                  >
                    <div className="card" style={{ borderRadius: "5px" }}>
                      <div
                        className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                        data-mdb-ripple-color="light"
                      >
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/12.webp"
                          style={{
                            borderTopLeftRadius: "15px",
                            borderTopRightRadius: "15px",
                          }}
                          className="img-fluid"
                          alt="Laptop"
                        />
                        <a href="#!">
                          <div className="mask"></div>
                        </a>
                      </div>
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <div>
                            <p>
                              <a href="#!" className="text-dark">
                                Dell Xtreme 270
                              </a>
                            </p>
                            <p className="small text-muted">Laptops</p>
                          </div>
                          <div>
                            <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                              <i className="fas fa-star"></i>
                            </div>
                            <p className="small text-muted">Rated 4.0/5</p>
                          </div>
                        </div>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body pb-0">
                        <div className="d-flex justify-content-between">
                          <p>
                            <a href="#!" className="text-dark">
                              $3,999
                            </a>
                          </p>
                          <p className="text-dark">#### 8787</p>
                        </div>
                        <p className="small text-muted">VISA Platinum</p>
                      </div>
                      <hr className="my-0" />
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                          <a href="#!" className="text-dark fw-bold">
                            Cancel
                          </a>
                          <button
                            type="button"
                            data-mdb-button-init
                            data-mdb-ripple-init
                            className="btn btn-outline-primary"
                          >
                            Buy now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <TopSaleCarousel /> */}
      </div>
      <section id="special-price">
        <div className="container">
          <h4 className="font-size-20">Special Price</h4>

          {/* Filter Buttons */}
          <div id="filters" className="button-group text-end font-size-16 mb-4">
            {filters.map((filter) => (
              <button
                key={filter}
                className={`btn ${activeFilter === filter ? "is-checked" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === "*" ? "All Brand" : filter}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="product-filter row">
            {products.map((product) => {
              const visible =
                activeFilter === "*" || product.brand === activeFilter;
              return (
                <div
                  key={product.id}
                  className={`col-md-3 product-filter-item border ${!visible ? "hidden" : ""}`}
                >
                  <div className="product text-center p-3">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="img-fluid"
                    />
                    <h6 className="mt-2">{product.name}</h6>
                    <div className="price py-2">${product.price}</div>
                    <button
                      type="button"
                      className="btn btn-outline-primary font-size-12"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeProList;
