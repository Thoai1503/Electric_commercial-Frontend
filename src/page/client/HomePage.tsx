import { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";

import "../../scss/style.scss";
import { useQuery } from "@tanstack/react-query";
import { productVariantQuery } from "../../module/client/query/productVariant";
import Carousel from "../../components/client/home/Carousel";
import Menu from "../../components/client/home/Menu";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { addToCartAsync } from "../../reducers/cartReducer";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.cart.loading);
  const [activeFilter, setActiveFilter] = useState<string>("*");

  const { data } = useQuery(productVariantQuery.list);
  const formatVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
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
      id: 6,
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
    {
      id: 5,
      brand: "Apple",
      name: "Apple iPhone 12",
      price: 252,
      img: "https://ltp.crfnetwork.com/mobile-shop-backend/assets/products/2.png",
    },
  ];

  const filters = ["*", "Apple", "Samsung", "Redmi"];

  return (
    <>
      <div className="d-flex row justify-content-center">
        <div className="d-flex col-md-3">
          <Menu />
        </div>
        <div className="d-flex col-md-9 mt-5">
          <Carousel />
        </div>
      </div>
      {data && (
        <div className="row mt-2">
          <section>
            <div
              className="container py-5 "
              style={{
                backgroundColor: "black",
                backgroundImage:
                  "url('/images/7510236c-c858-4cab-a779-c3aaf12a5643.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                minHeight: "70vh",
                height: "auto",
                width: "100%",
              }}
            >
              <div className="row">
                <h4
                  style={{
                    color: "#48d6f0ff",
                    borderBottom: "1px solid #48d6f0ff",
                  }}
                >
                  SẢN PHẨM NỔI BẬT
                </h4>{" "}
                <div className="col-md-12 mt-4">
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
                      breakpoints={{
                        80: {
                          slidesPerView: 1,
                          spaceBetween: 10,
                        },
                        480: {
                          slidesPerView: 2,
                          spaceBetween: 10,
                        },
                        640: {
                          slidesPerView: 3,
                          spaceBetween: 12,
                        },
                        768: {
                          slidesPerView: 3,
                          spaceBetween: 15,
                        },
                        1024: {
                          slidesPerView: 4,
                          spaceBetween: 15,
                        },
                        1280: {
                          slidesPerView: 5,
                          spaceBetween: 15,
                        },
                      }}
                    >
                      {loading && (
                        <div
                          className="spinner-border text-primary"
                          role="status"
                          style={{
                            width: "3rem",
                            height: "3rem",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            // transform: "translate(-50%, -50%)",
                            zIndex: 1000,
                          }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                      {data?.map((item) => (
                        <SwiperSlide key={item.id}>
                          <div style={{ padding: "0 5px" }}>
                            <div
                              className="card"
                              style={{
                                borderRadius: "0px",
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                              }}
                            >
                              <div
                                className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                                data-mdb-ripple-color="light"
                                style={{
                                  position: "relative",
                                  width: "100%",
                                  paddingTop: "75%",
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
                                      <p className="">
                                        {item.name || "Product Name"}
                                      </p>
                                    </p>
                                    <p className="small text-muted">Laptops</p>
                                  </div>
                                </div>
                              </div>

                              {/* <hr className="my-0" /> */}

                              <div
                                className="card-body pb-0"
                                style={{ minHeight: "70px" }}
                              >
                                <div className="d-flex justify-content-between">
                                  <p>
                                    <span style={{ color: "#1a96e2ff" }}>
                                      <strong>
                                        {" "}
                                        {formatVND(item.price || 0)}
                                      </strong>
                                    </span>
                                  </p>
                                  <p className="text-dark"> 8787</p>
                                </div>
                                <p className="small text-muted">
                                  VISA Platinum
                                </p>
                              </div>
                              {/* 
                            <hr className="my-0" /> */}

                              {/* Action buttons - Moved to right */}
                              <div
                                className="card-body"
                                style={{ marginTop: "auto" }}
                              >
                                <div className="d-flex justify-content-end align-items-center pb-2 mb-1">
                                  <button
                                    onClick={() =>
                                      dispatch(addToCartAsync(item))
                                    }
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
      )}

      <section id="special-price" className="mt-5">
        <div className="container mt-5">
          <h3 className="font-size-20 mb-0">ĐIỆN THOẠI HOT</h3>

          {/* Filter Buttons */}
          <div id="filters" className="button-group text-end font-size-16 mb-0">
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
          <div className="product-filter row">
            {data?.map((item: any) => {
              const visible =
                activeFilter === "*" || item.brand === activeFilter;
              return (
                <div
                  key={item.id}
                  className={`col-6 col-sm-4 col-md-3 col-lg-2 py-3 product-filter-item   ${!visible ? "filter-hidden" : "filter-visible"}`}
                  style={{ borderRadius: "8px", width: "300px" }}
                >
                  <div
                    className="card h-100 "
                    style={{
                      borderRadius: "12px",
                    }}
                  >
                    <div
                      className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
                      data-mdb-ripple-color="light"
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "75%",
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

                    <div
                      className="card-body pb-0"
                      style={{ minHeight: "70px" }}
                    >
                      <div className="d-flex justify-content-between">
                        <h5
                          className="text-dark"
                          style={{ color: "rgba(200, 9, 9, 0)" }}
                        >
                          <strong> {formatVND(item.price || 0)}</strong>
                        </h5>

                        <p className="text-dark"> 8787</p>
                      </div>
                    </div>

                    <hr className="my-0" />

                    {/* Action buttons - Moved to right */}
                    <div className="card-body" style={{ marginTop: "auto" }}>
                      <div className="d-flex justify-content-end align-items-center pb-2 mb-1">
                        <button
                          type="button"
                          data-mdb-button-init
                          data-mdb-ripple-init
                          className="btn btn-outline-primary btn-sm"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-cart2"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l1.25 5h8.22l1.25-5zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                          </svg>
                          {"    "}
                          Buy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="product-filter row">
            {products.map((product: any) => {
              const visible =
                activeFilter === "*" || product.brand === activeFilter;
              return (
                <div
                  key={product.id}
                  className={`col-md-3 product-filter-item border ${!visible ? "filter-hidden" : "filter-visible"}`}
                >
                  <div className="product text-center p-3">
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        paddingTop: "100%",
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

export default Home;
