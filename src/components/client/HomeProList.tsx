import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";

import "./style.css";
import { useQuery } from "@tanstack/react-query";
import { productVariantQuery } from "../../module/client/query/productVariant";

const HomeProList = ({ match }: any) => {
  const [activeFilter, setActiveFilter] = useState<string>("*");
  const id = match?.params.id;
  console.log("Id: " + id);
  const { data } = useQuery(productVariantQuery.list);
  const products = [
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
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    spaceBetween={15}
                    slidesPerView={5}
                    loop={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                  >
                    {data?.map((item) => (
                      <SwiperSlide key={item.id}>
                        <div style={{ padding: "0 5px" }}>
                          <div
                            className="card"
                            style={{
                              borderRadius: "15px",
                              height: "100%",
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            {/* Container ảnh với tỉ lệ cố định */}
                            <div
                              className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                              data-mdb-ripple-color="light"
                              style={{
                                position: "relative",
                                width: "100%",
                                paddingTop: "75%", // Tỉ lệ 4:3
                                overflow: "hidden",
                                borderTopLeftRadius: "15px",
                                borderTopRightRadius: "15px",
                                backgroundColor: "#f8f9fa",
                              }}
                            >
                              <img
                                src={
                                  item?.product_images?.[0]?.url
                                    ? `/uploads/${item.product_images[0].url}?h=120&fit=crop&auto=format&dpr=2 2x`
                                    : "https://via.placeholder.com/300x225?text=No+Image"
                                }
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                  padding: "10px",
                                }}
                                className="img-fluid"
                                alt={item.name || "Product"}
                              />
                              <a href="#!">
                                <div className="mask"></div>
                              </a>
                            </div>

                            {/* Card body với chiều cao cố định */}
                            <div
                              className="card-body pb-0"
                              style={{ minHeight: "100px" }}
                            >
                              <div className="d-flex justify-content-between align-items-start">
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p
                                    style={{
                                      marginBottom: "0.25rem",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    <a href="#!" className="text-dark">
                                      {item.name || "Product Name"}
                                    </a>
                                  </p>
                                  <p className="small text-muted">Laptops</p>
                                </div>
                                <div style={{ marginLeft: "10px" }}>
                                  <div className="d-flex flex-row justify-content-end mt-1 mb-2 text-danger">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                  </div>
                                  <p
                                    className="small text-muted"
                                    style={{ fontSize: "0.7rem" }}
                                  >
                                    Rated 4.0/5
                                  </p>
                                </div>
                              </div>
                            </div>

                            <hr className="my-0" />

                            {/* Price section */}
                            <div
                              className="card-body pb-0"
                              style={{ minHeight: "70px" }}
                            >
                              <div className="d-flex justify-content-between">
                                <p>
                                  <a href="#!" className="text-dark">
                                    ${item.price || "N/A"}
                                  </a>
                                </p>
                                <p className="text-dark">#### 8787</p>
                              </div>
                              <p className="small text-muted">VISA Platinum</p>
                            </div>

                            <hr className="my-0" />

                            {/* Action buttons */}
                            <div
                              className="card-body"
                              style={{ marginTop: "auto" }}
                            >
                              <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                                <a href="#!" className="text-dark fw-bold">
                                  Cancel
                                </a>
                                <button
                                  type="button"
                                  data-mdb-button-init
                                  data-mdb-ripple-init
                                  className="btn btn-outline-primary btn-sm"
                                >
                                  Buy now
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </section>
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
            {products.map((product: any) => {
              const visible =
                activeFilter === "*" || product.brand === activeFilter;
              return (
                <div
                  key={product.id}
                  className={`col-md-3 product-filter-item border ${!visible ? "hidden" : ""}`}
                >
                  <div className="product text-center p-3">
                    {/* Container ảnh với tỉ lệ cố định cho grid */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "100%", // Tỉ lệ 1:1
                        overflow: "hidden",
                        backgroundColor: "#f8f9fa",
                        marginBottom: "1rem",
                      }}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          padding: "10px",
                        }}
                      />
                    </div>
                    <h6
                      className="mt-2"
                      style={{
                        minHeight: "2.5rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.name}
                    </h6>
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
