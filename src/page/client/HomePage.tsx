import { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";

import "../../scss/style.scss";

import Carousel from "../../components/client/home/Carousel";
import Menu from "../../components/client/home/Menu";

import type { UserDataRespone } from "../../type/User";

import { useHomePage } from "../../module/client/hook/home_page/useHomePage";

import { useGuestOrUserView } from "../../hook/useGuestOrUserView";
import { Link } from "react-router-dom";
import { CToast, CToastBody, CToaster, CToastHeader } from "@coreui/react";
import { getImageUrl } from "../../utils/imageHelper";

const Home = () => {
  const [toast, addToast] = useState<any>();
  const toaster = useRef(null);
  const exampleToast = (message = "default") => (
    <CToast>
      <CToastHeader closeButton>
        <svg
          className="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <div className="fw-bold me-auto">CoreUI for React.js</div>
        <small>7 min ago</small>
      </CToastHeader>
      <CToastBody>
        <div dangerouslySetInnerHTML={{ __html: message }}></div>
      </CToastBody>
    </CToast>
  );
  const user = ((): Partial<UserDataRespone> => {
    try {
      return JSON.parse(localStorage.getItem("user") || "{}");
    } catch {
      return {};
    }
  })();

  const {
    data,
    isPending,
    isPendingList,
    isPendingUpdateCart,
    handleClickChange,
    loading,
    addToCartForAuthenticatedUser,
    pcVariants,
    keyboards,
  } = useHomePage(user?.id || 0, () => {
    addToast(
      exampleToast(
        "Thêm vào giỏ hàng thành công" + ` <a href="/cart">Xem giỏ hàng</a>`,
      ),
    );
  });

  const { product } = useGuestOrUserView(user?.id || 0, data);
  const { product: keyboardsProduct } = useGuestOrUserView(
    user?.id || 0,
    keyboards,
  );
  const { product: pcProduct } = useGuestOrUserView(user?.id || 0, pcVariants);

  const phone = product?.filter(
    (item) => item.product.category.slug == "dien-thoai",
  );
  console.log(phone);

  const isProductLoading = isPending || isPendingList || loading;

  const [activeFilter, setActiveFilter] = useState<string>("*");

  const formatVND = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const filters = ["*", "Apple", "Samsung", "Redmi"];

  return (
    <>
      <style>{`
        .product-card-link {
          text-decoration: none;
          color: inherit;
        }
        .product-card-link:hover {
          text-decoration: none;
          color: inherit;
        }
        .home-shell {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 45%, #f8fafc 100%);
          min-height: 100vh;
        }
        .home-hero {
          background: linear-gradient(135deg, #0f172a 0%, #111827 50%, #0d6efd 135%);
          color: #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
          overflow: hidden;
        }
        .home-section-shell {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
          border-radius: 22px;
          overflow: hidden;
        }
        .home-section-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
        }
        .home-section-title h4,
        .home-section-title h3 {
          margin: 0;
          font-weight: 700;
        }
        .home-section-badge {
                                </Link>
          display: inline-flex;
          align-items: center;
          padding: 0.35rem 0.75rem;
          border-radius: 999px;
          background: rgba(13, 110, 253, 0.1);
          color: #0d6efd;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .home-feature-wrap {
          position: relative;
        }
        .home-feature-wrap::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.55));
          pointer-events: none;
          z-index: 0;
        }
        .home-feature-content {
          position: relative;
          z-index: 1;
        }
        .skeleton-shimmer {
          background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 37%, #e9ecef 63%);
          background-size: 400% 100%;
          animation: skeleton-shimmer 1.4s ease infinite;
        }
        @keyframes skeleton-shimmer {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -100% 0;
          }
        }
        .home-product-card {
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          overflow: hidden;
          background: #fff;
          box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          height: 100%;
          display: flex;
          flex-direction: column;
        }
        .home-product-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(15, 23, 42, 0.1);
        }
        .home-product-image-wrap {
          position: relative;
          width: 100%;
          padding-top: 76%;
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        }
        .home-product-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 0.75rem;
        }
        .home-product-body {
          padding: 0 1rem;
        }
        .home-product-price {
          color: #0d6efd;
          font-weight: 700;
        }
        .product-filter-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .product-filter-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (min-width: 992px) {
          .product-filter-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }
        .home-btn-pill {
          border-radius: 999px;
        }
        .home-browse-more {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 220px;
          border-radius: 999px;
          padding: 0.75rem 1.25rem;
          font-weight: 600;
          background: #fff;
          border: 1px solid #dbe3ef;
          color: #0f172a;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.05);
        }
        .home-browse-more:hover {
          border-color: #0d6efd;
          color: #0d6efd;
        }
        .home-loading-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.25);
          backdrop-filter: blur(2px);
          z-index: 9999;
        }
        .home-product-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #e2e8f0;
        }
        @media (max-width: 991.98px) {
          .home-section-title {
            flex-direction: column;
            align-items: flex-start;
          }
        }
        @media (max-width: 767.98px) {
          .home-hero {
            border-radius: 18px;
          }
          .home-product-title {
            font-size: 1rem;
          }
          .home-browse-more {
            width: 100%;
          }
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
      {isPendingUpdateCart && (
        <div className="home-loading-overlay d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <div
        style={{ opacity: isPending && isPendingList ? 0.3 : 1 }}
        className="home-shell mt-2"
      >
        <div className="container py-3 py-lg-4 mt-3">
          <div className="row justify-content-center g-3 align-items-start ">
            <div className="col-12 col-lg-3">
              <Menu />
            </div>
            <div className="col-12 col-lg-9 mt-3 mt-lg-4">
              <Carousel />
            </div>
          </div>
        </div>

        <div className="row mt-2">
          <section>
            <div
              className="container py-4 py-lg-5 home-section-shell home-feature-wrap"
              style={{
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
              <div className="row home-feature-content">
                <h4
                  className="home-product-title pb-2 mb-0"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.35)" }}
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
                      {isProductLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={`featured-skeleton-${index}`}>
                              <div className="px-1 h-100">
                                <div className="home-product-card">
                                  <div
                                    className="skeleton-shimmer"
                                    style={{
                                      width: "100%",
                                      aspectRatio: "4 / 3",
                                    }}
                                  />
                                  <div className="card-body pb-0">
                                    <div
                                      className="skeleton-shimmer mb-2"
                                      style={{
                                        height: "14px",
                                        borderRadius: "6px",
                                      }}
                                    />
                                    <div
                                      className="skeleton-shimmer"
                                      style={{
                                        height: "14px",
                                        borderRadius: "6px",
                                        width: "75%",
                                      }}
                                    />
                                  </div>
                                  <div className="card-body pb-0">
                                    <div
                                      className="skeleton-shimmer"
                                      style={{
                                        height: "20px",
                                        borderRadius: "6px",
                                        width: "50%",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="card-body"
                                    style={{ marginTop: "auto" }}
                                  >
                                    <div
                                      className="skeleton-shimmer"
                                      style={{
                                        height: "32px",
                                        borderRadius: "6px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))
                        : data &&
                          product?.map((item) => (
                            <SwiperSlide key={item.id}>
                              <div className="px-1 h-100">
                                <div className="home-product-card">
                                  <Link
                                    to={`/product/${item.id}`}
                                    className="product-card-link"
                                  >
                                    <div
                                      className="bg-image hover-overlay ripple ripple-surface ripple-surface-light home-product-image-wrap"
                                      data-mdb-ripple-color="light"
                                    >
                                      <img
                                        src={
                                          item?.product_images?.[0]?.url
                                            ? `${getImageUrl(item.product_images[0].url)}?h=120&fit=crop&auto=format&dpr=2 2x`
                                            : "https://via.placeholder.com/300x225?text=No+Image"
                                        }
                                        className="img-fluid home-product-image"
                                        alt={item.name || "Product"}
                                      />
                                    </div>

                                    <div
                                      className="home-product-body pt-3 pb-0"
                                      style={{ minHeight: "100px" }}
                                    >
                                      <div className="d-flex justify-content-between align-items-start">
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <p
                                            style={{
                                              marginBottom: "0.25rem",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              display: "-webkit-box",
                                              WebkitLineClamp: 2,
                                              WebkitBoxOrient: "vertical",
                                              lineHeight: "1.4",
                                            }}
                                          >
                                            {item.name || "Product Name"}
                                          </p>
                                          <p className="small text-muted">
                                            Laptops
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="home-product-body pb-0"
                                      style={{ minHeight: "70px" }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <p>
                                          <span className="home-product-price">
                                            <strong>
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
                                  </Link>

                                  {/* Action buttons - Moved to right */}
                                  <div className="px-3 pb-3 mt-auto">
                                    <div className="d-flex justify-content-center align-items-center">
                                      {item.inCart && user ? (
                                        <button
                                          className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm home-btn-pill"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <div
                                            className="decrease-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! - 1,
                                              );
                                            }}
                                          >
                                            -
                                          </div>
                                          <div>{item.cart.quantity}</div>
                                          <div
                                            className="increase-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! + 1,
                                              );
                                            }}
                                          >
                                            +
                                          </div>
                                        </button>
                                      ) : item.inCart ? (
                                        <button
                                          className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm home-btn-pill"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <div
                                            className="decrease-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! - 1,
                                              );
                                            }}
                                          >
                                            -
                                          </div>
                                          <div>{item.cart.quantity}</div>
                                          <div
                                            className="increase-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! + 1,
                                              );
                                            }}
                                          >
                                            +
                                          </div>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            //       alert("Thêm vào giỏ hàng thành công");
                                            addToCartForAuthenticatedUser({
                                              id: 0,
                                              user_id: user.id || 0,
                                              variant_id: item.id,
                                              quantity: 1,
                                              unit_price: item.price,
                                              variant: item,
                                            });
                                          }}
                                          type="button"
                                          data-mdb-button-init
                                          data-mdb-ripple-init
                                          className="btn btn-primary btn-sm w-100 home-btn-pill"
                                        >
                                          Thêm vào giỏ
                                        </button>
                                      )}
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

        <section id="special-price" className="mt-5 bg-light">
          <div className="container mt-4 home-section-shell p-3 p-lg-4">
            <div className="home-section-title">
              <h3 className="font-size-20 mb-0">ĐIỆN THOẠI HOT</h3>
              <span className="home-section-badge">Hot deals</span>
            </div>

            <div
              id="filters"
              className="button-group text-end font-size-16 mb-0"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`btn home-btn-pill ${activeFilter === filter ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter === "*" ? "All Brand" : filter}
                </button>
              ))}
            </div>

            <div className="product-filter product-filter-grid">
              {isProductLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={`phone-skeleton-${index}`}
                      className="product-filter-item"
                    >
                      <div className="home-product-card">
                        <div
                          className="skeleton-shimmer"
                          style={{ width: "100%", aspectRatio: "4 / 3" }}
                        />
                        <div
                          className="card-body pb-0"
                          style={{ minHeight: "100px" }}
                        >
                          <div
                            className="skeleton-shimmer mb-2"
                            style={{ height: "14px", borderRadius: "6px" }}
                          />
                          <div
                            className="skeleton-shimmer"
                            style={{
                              height: "14px",
                              borderRadius: "6px",
                              width: "70%",
                            }}
                          />
                        </div>
                        <div
                          className="card-body pb-0"
                          style={{ minHeight: "70px" }}
                        >
                          <div
                            className="skeleton-shimmer"
                            style={{
                              height: "20px",
                              borderRadius: "6px",
                              width: "45%",
                            }}
                          />
                        </div>
                        <div
                          className="card-body"
                          style={{ marginTop: "auto" }}
                        >
                          <div
                            className="skeleton-shimmer"
                            style={{ height: "32px", borderRadius: "6px" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : phone?.slice(0, 4).map((item: any) => {
                    const visible =
                      activeFilter === "*" || item.brand === activeFilter;
                    return (
                      <div
                        key={item.id}
                        className={`product-filter-item ${!visible ? "filter-hidden" : "filter-visible"}`}
                      >
                        <div className="home-product-card">
                          <Link
                            to={`/product/${item.id}`}
                            className="product-card-link"
                          >
                            <div
                              className="bg-image hover-overlay ripple ripple-surface ripple-surface-light home-product-image-wrap"
                              data-mdb-ripple-color="light"
                            >
                              <img
                                src={
                                  item?.product_images?.[0]?.url
                                    ? `${getImageUrl(item.product_images[0].url)}?h=120&fit=crop&auto=format&dpr=2 2x`
                                    : "https://via.placeholder.com/300x225?text=No+Image"
                                }
                                className="img-fluid home-product-image"
                                alt={item.name || "Product"}
                              />
                            </div>

                            <div
                              className="home-product-body pt-3 pb-0"
                              style={{ minHeight: "100px" }}
                            >
                              <div className="d-flex justify-content-between align-items-start">
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <p
                                    style={{
                                      marginBottom: "0.25rem",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      lineHeight: "1.4",
                                    }}
                                  >
                                    {item.name || "Product Name"}
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

                            <div
                              className="home-product-body pb-0"
                              style={{ minHeight: "70px" }}
                            >
                              <div className="d-flex justify-content-between">
                                <h6
                                  className="text-dark"
                                  style={{ color: "rgba(200, 9, 9, 0)" }}
                                >
                                  <strong>{formatVND(item.price || 0)}</strong>
                                </h6>

                                <p className="text-dark"> 8787</p>
                              </div>
                            </div>
                          </Link>

                          <div className="px-3 pb-3 mt-auto">
                            <div className="d-flex justify-content-center align-items-center">
                              {item.inCart && user ? (
                                <button
                                  className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm home-btn-pill"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <div
                                    className="decrease-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleClickChange(
                                        item.cart.id!,
                                        item.cart.quantity! - 1,
                                      );
                                    }}
                                  >
                                    -
                                  </div>
                                  <div>{item.cart.quantity}</div>
                                  <div
                                    className="increase-btn"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleClickChange(
                                        item.cart.id!,
                                        item.cart.quantity! + 1,
                                      );
                                    }}
                                  >
                                    +
                                  </div>
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    addToCartForAuthenticatedUser({
                                      id: 0,
                                      user_id: user.id || 0,
                                      variant_id: item.id,
                                      quantity: 1,
                                      unit_price: item.price,
                                      variant: item,
                                    });
                                  }}
                                  type="button"
                                  data-mdb-button-init
                                  data-mdb-ripple-init
                                  className="btn btn-primary btn-sm w-100 home-btn-pill"
                                >
                                  Thêm vào giỏ
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </section>

        <div className="row mt-2">
          <section>
            <div
              className="container py-4 py-lg-5 home-section-shell"
              style={{
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
              <div className="row home-feature-content">
                <h4
                  className="home-product-title pb-2 mb-0"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.35)" }}
                >
                  BÀN PHÍM HOT
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
                      {isProductLoading
                        ? Array.from({ length: 5 }).map((_, index) => (
                            <SwiperSlide key={`keyboard-skeleton-${index}`}>
                              <div className="px-1 h-100">
                                <div className="home-product-card">
                                  <div
                                    className="skeleton-shimmer"
                                    style={{
                                      width: "100%",
                                      aspectRatio: "4 / 3",
                                    }}
                                  />
                                  <div className="card-body pb-0">
                                    <div
                                      className="skeleton-shimmer mb-2"
                                      style={{
                                        height: "14px",
                                        borderRadius: "6px",
                                      }}
                                    />
                                    <div
                                      className="skeleton-shimmer"
                                      style={{
                                        height: "14px",
                                        borderRadius: "6px",
                                        width: "75%",
                                      }}
                                    />
                                  </div>
                                  <div className="card-body pb-0">
                                    <div
                                      className="skeleton-shimmer"
                                      style={{
                                        height: "20px",
                                        borderRadius: "6px",
                                        width: "50%",
                                      }}
                                    />
                                  </div>
                                  <div
                                    className="card-body"
                                    style={{ marginTop: "auto" }}
                                  >
                                    <div
                                      className="skeleton-shimmer"
                                      style={{
                                        height: "32px",
                                        borderRadius: "6px",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))
                        : keyboards &&
                          keyboardsProduct?.map((item) => (
                            <SwiperSlide key={item.id}>
                              <div className="px-1 h-100">
                                <div className="home-product-card">
                                  <Link
                                    to={`/product/${item.id}`}
                                    className="product-card-link"
                                  >
                                    <div
                                      className="bg-image hover-overlay ripple ripple-surface ripple-surface-light home-product-image-wrap"
                                      data-mdb-ripple-color="light"
                                    >
                                      <img
                                        src={
                                          item?.product_images?.[0]?.url
                                            ? `${getImageUrl(item.product_images[0].url)}?h=120&fit=crop&auto=format&dpr=2 2x`
                                            : "https://via.placeholder.com/300x225?text=No+Image"
                                        }
                                        className="img-fluid home-product-image"
                                        alt={item.name || "Product"}
                                      />
                                    </div>

                                    <div
                                      className="home-product-body pt-3 pb-0"
                                      style={{ minHeight: "100px" }}
                                    >
                                      <div className="d-flex justify-content-between align-items-start">
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                          <p
                                            style={{
                                              marginBottom: "0.25rem",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              display: "-webkit-box",
                                              WebkitLineClamp: 2,
                                              WebkitBoxOrient: "vertical",
                                              lineHeight: "1.4",
                                            }}
                                          >
                                            {item.name || "Product Name"}
                                          </p>
                                          <p className="small text-muted">
                                            Laptops
                                          </p>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="home-product-body pb-0"
                                      style={{ minHeight: "70px" }}
                                    >
                                      <div className="d-flex justify-content-between">
                                        <p>
                                          <span className="home-product-price">
                                            <strong>
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
                                  </Link>

                                  {/* Action buttons - Moved to right */}
                                  <div className="px-3 pb-3 mt-auto">
                                    <div className="d-flex justify-content-center align-items-center">
                                      {item.inCart && user ? (
                                        <button
                                          className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm home-btn-pill"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <div
                                            className="decrease-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! - 1,
                                              );
                                            }}
                                          >
                                            -
                                          </div>
                                          <div>{item.cart.quantity}</div>
                                          <div
                                            className="increase-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! + 1,
                                              );
                                            }}
                                          >
                                            +
                                          </div>
                                        </button>
                                      ) : item.inCart ? (
                                        <button
                                          className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm"
                                          onClick={(e) => e.preventDefault()}
                                        >
                                          <div
                                            className="decrease-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! - 1,
                                              );
                                            }}
                                          >
                                            -
                                          </div>
                                          <div>{item.cart.quantity}</div>
                                          <div
                                            className="increase-btn"
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              handleClickChange(
                                                item.cart.id!,
                                                item.cart.quantity! + 1,
                                              );
                                            }}
                                          >
                                            +
                                          </div>
                                        </button>
                                      ) : (
                                        <button
                                          onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            addToCartForAuthenticatedUser({
                                              id: 0,
                                              user_id: user.id || 0,
                                              variant_id: item.id,
                                              quantity: 1,
                                              unit_price: item.price,
                                              variant: item,
                                            });
                                          }}
                                          type="button"
                                          data-mdb-button-init
                                          data-mdb-ripple-init
                                          className="btn btn-primary btn-sm w-100 home-btn-pill"
                                        >
                                          Thêm vào giỏ
                                        </button>
                                      )}
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

        <div className="mt-5 mb-5" id="may-tinh-ban">
          <div className="container home-section-shell p-3 p-lg-4">
            <div className="home-section-title">
              <h3 className="font-size-20 mb-0">PC MÁY BÀN</h3>
              <span className="home-section-badge">Desktop picks</span>
            </div>
          </div>
          <div className="container mt-3">
            <div className="row g-3">
              {isProductLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div
                      key={`pc-skeleton-${index}`}
                      className="col-6 col-sm-4 col-md-3 col-lg-3 py-3"
                    >
                      <div className="home-product-card">
                        <div
                          className="skeleton-shimmer"
                          style={{ width: "100%", aspectRatio: "4 / 3" }}
                        />
                        <div
                          className="card-body pb-0"
                          style={{ minHeight: "100px" }}
                        >
                          <div
                            className="skeleton-shimmer mb-2"
                            style={{ height: "14px", borderRadius: "6px" }}
                          />
                          <div
                            className="skeleton-shimmer"
                            style={{
                              height: "14px",
                              borderRadius: "6px",
                              width: "70%",
                            }}
                          />
                        </div>
                        <div
                          className="card-body pb-0"
                          style={{ minHeight: "70px" }}
                        >
                          <div
                            className="skeleton-shimmer"
                            style={{
                              height: "20px",
                              borderRadius: "6px",
                              width: "45%",
                            }}
                          />
                        </div>
                        <div
                          className="card-body"
                          style={{ marginTop: "auto" }}
                        >
                          <div
                            className="skeleton-shimmer"
                            style={{ height: "32px", borderRadius: "6px" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                : pcProduct?.slice(0, 8).map((item: any) => (
                    <div
                      key={item.id}
                      className="col-6 col-sm-4 col-md-3 col-lg-3 py-3"
                    >
                      <div className="home-product-card">
                        <Link
                          to={`/product/${item.id}`}
                          className="product-card-link"
                        >
                          <div
                            className="bg-image hover-overlay ripple ripple-surface ripple-surface-light home-product-image-wrap"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={
                                item?.product_images?.[0]?.url
                                  ? `${getImageUrl(item.product_images[0].url)}?h=120&fit=crop&auto=format&dpr=2 2x`
                                  : "https://via.placeholder.com/300x225?text=No+Image"
                              }
                              className="img-fluid home-product-image"
                              alt={item.name || "Product"}
                            />
                          </div>
                          <div
                            className="home-product-body pt-3 pb-0"
                            style={{ minHeight: "100px" }}
                          >
                            <div className="d-flex justify-content-between align-items-start">
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p
                                  style={{
                                    marginBottom: "0.25rem",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    lineHeight: "1.4",
                                  }}
                                >
                                  {item.name || "Product Name"}
                                </p>
                                <p className="small text-muted">Laptops</p>
                              </div>
                            </div>
                          </div>
                          <div
                            className="home-product-body pb-0"
                            style={{ minHeight: "70px" }}
                          >
                            <div className="d-flex justify-content-between">
                              <h6
                                className="text-dark"
                                style={{ color: "rgba(200, 9, 9, 0)" }}
                              >
                                <strong>{formatVND(item.price || 0)}</strong>
                              </h6>

                              <p className="text-dark"> 8787</p>
                            </div>
                          </div>
                        </Link>
                        {/* Action buttons - Moved to right */}
                        <div className="px-3 pb-3 mt-auto">
                          <div className="d-flex justify-content-center align-items-center">
                            {item.inCart && user ? (
                              <button
                                className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm home-btn-pill"
                                onClick={(e) => e.preventDefault()}
                              >
                                <div
                                  className="decrease-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClickChange(
                                      item.cart.id!,
                                      item.cart.quantity! - 1,
                                    );
                                  }}
                                >
                                  -
                                </div>
                                <div>{item.cart.quantity}</div>
                                <div
                                  className="increase-btn"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleClickChange(
                                      item.cart.id!,
                                      item.cart.quantity! + 1,
                                    );
                                  }}
                                >
                                  +
                                </div>
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  addToCartForAuthenticatedUser({
                                    id: 0,
                                    user_id: user.id || 0,
                                    variant_id: item.id,
                                    quantity: 1,
                                    unit_price: item.price,
                                    variant: item,
                                  });
                                }}
                                type="button"
                                data-mdb-button-init
                                data-mdb-ripple-init
                                className="btn btn-primary btn-sm w-100 home-btn-pill"
                              >
                                Thêm vào giỏ
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              <div className="d-flex justify-content-center mt-4">
                <button
                  onClick={() => {
                    // if (page < totalPage) {
                    //   setPage(page + 1);
                    // }
                  }}
                  className="home-browse-more"
                >
                  Xem thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </>
  );
};

export default Home;
