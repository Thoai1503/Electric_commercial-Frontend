import { useDispatch, useSelector } from "react-redux";
import Breadcrumbs from "../../components/client/breadcrumbs/BreadCrumbs";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect, useRef, useState } from "react";
import { fetchProductVariant } from "../../reducers/filterReducer";
import { useFilterPage } from "../../module/client/hook/filter_page/useFilterPage";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { categoryAttributeQuery } from "../../module/client/query/categoryAttribute";
import type { UserDataRespone } from "../../type/User";
import { useGuestOrUserView } from "../../hook/useGuestOrUserView";
import { useHomePage } from "../../module/client/hook/home_page/useHomePage";
import { categoryBrandQuery } from "../../module/client/query/categoryBrand";
import { CToast, CToastBody, CToastHeader, CToaster } from "@coreui/react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { getImageUrl } from "../../utils/imageHelper";

const Product = () => {
  const [priceRange, setPriceRange] = useState<{
    minPrice: number;
    maxPrice: number;
  }>({
    minPrice: 0,
    maxPrice: 50000000,
  });
  const [toast, addToast] = useState<any>();
  const toaster = useRef(null);
  const [columnCounts, setColumnCounts] = useState<Record<number, number>>({});
  const measureRefs = useRef<
    Record<number, Record<number, HTMLSpanElement | null>>
  >({});

  const productPageStyles = `
    .product-page-shell {
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 45%, #f8fafc 100%);
      min-height: 100vh;
    }
    .product-page-hero {
      background: linear-gradient(135deg, #0f172a 0%, #111827 45%, #0d6efd 140%);
      color: #e2e8f0;
      border-radius: 24px;
      padding: 1.25rem 1.5rem;
      box-shadow: 0 18px 40px rgba(15, 23, 42, 0.14);
    }
    .product-panel,
    .product-toolbar,
    .product-grid-shell {
      background: #ffffff;
      border: 1px solid #e2e8f0;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
    }
    .product-panel {
      position: sticky;
      top: 88px;
    }
    .section-title {
      color: #0f172a;
      font-weight: 700;
      margin-bottom: 0.75rem;
    }
    .filter-label {
      color: #334155;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    .filter-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      border: 1px solid #cbd5e1;
      border-radius: 999px;
      padding: 0.35rem 0.75rem;
      background: #f8fafc;
      color: #0f172a;
      font-size: 0.85rem;
    }
    .sort-toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }
    .sort-pill {
      position: relative;
      border-radius: 999px;
      padding: 0.55rem 0.9rem;
      font-size: 0.88rem;
      font-weight: 600;
      background: #fff;
      border: 1px solid #dbe3ef;
      color: #334155;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .sort-pill:hover {
      border-color: #0d6efd;
      color: #0d6efd;
      transform: translateY(-1px);
    }
    .sort-pill.is-active {
      border-color: #0d6efd;
      color: #0d6efd;
      background: rgba(13, 110, 253, 0.06);
      box-shadow: 0 8px 20px rgba(13, 110, 253, 0.08);
    }
    .sort-check {
      position: absolute;
      top: 0;
      right: 0;
      width: 0;
      height: 0;
      border-top: 22px solid #0d6efd;
      border-left: 22px solid transparent;
      border-top-right-radius: 999px;
    }
    .sort-check svg {
      position: absolute;
      top: -20px;
      right: 4px;
    }
    .product-grid-card {
      border: 1px solid #e2e8f0;
      border-radius: 18px;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 10px 28px rgba(15, 23, 42, 0.05);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      height: 100%;
    }
    .product-grid-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 16px 34px rgba(15, 23, 42, 0.1);
    }
    .product-image-wrap {
      position: relative;
      width: 100%;
      padding-top: 76%;
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    }
    .product-grid-image {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      padding: 0.75rem;
    }
    .product-card-body {
      padding: 1rem 1rem 0;
    }
    .product-price {
      color: #0d6efd;
      font-weight: 700;
    }
    .load-more-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 220px;
      border-radius: 999px;
      padding: 0.75rem 1.25rem;
      font-weight: 600;
    }
    .loading-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.25);
      backdrop-filter: blur(2px);
      z-index: 1000;
    }
    @media (max-width: 991.98px) {
      .product-panel {
        position: static;
      }
    }
    @media (max-width: 767.98px) {
      .product-page-hero {
        border-radius: 18px;
        padding: 1rem;
      }
      .sort-toolbar {
        overflow-x: auto;
        padding-bottom: 0.25rem;
      }
      .sort-pill {
        flex: 0 0 auto;
      }
      .load-more-btn {
        width: 100%;
      }
    }
  `;

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

  const { category } = useParams();
  const { data: categoryAttribute } = useQuery(
    categoryAttributeQuery.category_slug(category || ""),
  );
  const { data } = useQuery(categoryBrandQuery.category_slug(category!));

  const dispatch = useDispatch<AppDispatch>();
  const ProductList = useSelector(
    (state: RootState) => state.filterProduct.variant,
  );
  const count = useSelector(
    (state: RootState) => state.filterProduct.current_length,
  );
  const c = useSelector((state: RootState) => state.filterProduct.count);
  const isLoading = useSelector(
    (state: RootState) => state.filterProduct.loading,
  );
  const filterState = useSelector(
    (state: RootState) => state.filterProduct.filter_state,
  );
  function valuetext(value: number) {
    return `${value}°C`;
  }

  const [value, setValue] = useState<number[]>([20, 10000000]);

  const handleChange = (event: Event, newValue: number[]) => {
    setValue(newValue);
    console.log(event, newValue);

    dispatch(
      fetchProductVariant({
        skip: 0,
        take: 8,
        sortBy: filterState?.sortBy,
        order: filterState?.order,
        category: category,
        minPrice: newValue[0],
        maxPrice: newValue[1],
        filters: {
          ...filterState?.filters,
          //  price: [newValue[0], newValue[1]],
        },
      }),
    );
    setPriceRange({ minPrice: newValue[0], maxPrice: newValue[1] });
  };

  console.log("count: " + c);
  const { product } = useGuestOrUserView(user?.id || 0, ProductList);
  const { handleChangeFilter } = useFilterPage(
    category || "",
    priceRange.maxPrice,
    priceRange.minPrice,
  );
  const {
    handleClickChange,
    isPendingUpdateCart,
    addToCartForAuthenticatedUser,
  } = useHomePage(user?.id || 0, () => {
    addToast(
      exampleToast(
        "Thêm vào giỏ hàng thành công" + ` <a href="/cart">Xem giỏ hàng</a>`,
      ),
    );
  });

  // Calculate optimal column layout based on text width
  const calculateColumns = (values: any[], attrId: number) => {
    if (!measureRefs.current[attrId]) return 2;

    const maxTextWidth = Math.max(
      ...values.map((v) => {
        const span = measureRefs.current[attrId]?.[v.id];
        return span ? span.offsetWidth : 0;
      }),
    );

    // Determine columns based on text length
    if (maxTextWidth < 60) return 3; // Short text: 3 columns
    if (maxTextWidth < 100) return 2; // Medium text: 2 columns
    return 1; // Long text: 1 column
  };

  const getColumnClass = (attrId: number) => {
    const cols = columnCounts[attrId] || 2;
    if (cols === 3) return "col-4";
    if (cols === 2) return "col-6";
    return "col-12";
  };

  useEffect(() => {
    dispatch(
      fetchProductVariant({
        skip: 0,
        take: 8,
        title: filterState?.title,
        sortBy: filterState?.sortBy,
        order: filterState?.order,
        category: category,
      }),
    );
  }, [dispatch]);

  // Calculate column counts after data loads
  useEffect(() => {
    if (categoryAttribute) {
      const newColumnCounts: Record<number, number> = {};
      categoryAttribute.forEach((attr) => {
        newColumnCounts[attr.id] = calculateColumns(
          attr.attribute.attribute_values || [],
          attr.id,
        );
      });
      setColumnCounts(newColumnCounts);
    }
  }, [categoryAttribute]);

  return (
    <>
      <style>{productPageStyles}</style>
      <div className="product-page-shell">
        <div className="container py-4 py-lg-5">
          {(isLoading || isPendingUpdateCart) && (
            <div className="loading-overlay d-flex align-items-center justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          <Breadcrumbs />

          <div className="product-page-hero mb-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-end">
              <div>
                <div
                  className="small text-uppercase fw-semibold"
                  style={{ color: "#93c5fd" }}
                >
                  Danh mục sản phẩm
                </div>
                <h2 className="mb-1 fw-bold text-white">
                  {category || "Sản phẩm"}
                </h2>
                <p className="mb-0" style={{ maxWidth: 720, color: "#cbd5e1" }}>
                  Lọc nhanh theo giá, thương hiệu và thuộc tính để tìm đúng sản
                  phẩm bạn cần.
                </p>
              </div>
              <div className="d-inline-flex align-items-center gap-2 text-white-50">
                <span
                  className="px-3 py-2 rounded-pill"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  {c} sản phẩm
                </span>
              </div>
            </div>
          </div>

          <div className="content row g-4 align-items-start">
            <div className="col-12 col-lg-3 col-xl-3">
              <div className="product-panel rounded-4 p-3 p-lg-4">
                <div className="section-title">Bộ lọc tìm kiếm</div>
                <div className="selected-tag mb-3">
                  <span className="filter-chip">RAM 64-GB</span>
                </div>
                <button
                  type="button"
                  className="btn btn-link p-0 text-danger text-decoration-none fw-semibold"
                >
                  Xoá bộ lọc
                </button>
                <div>
                  <hr />
                  <div className="filter-label">Khoảng giá</div>
                  <div className="row g-2 mb-3">
                    <Box sx={{ width: "100%" }}>
                      <Slider
                        getAriaLabel={() => "Temperature range"}
                        value={value}
                        max={80000000}
                        size="small"
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                      />
                    </Box>
                  </div>
                </div>
                <div>
                  <hr />
                  <div className="filter-label">Thương hiệu</div>
                  <div className="row g-2 mb-3">
                    {data?.map((item) => (
                      <div key={item.brand_id} className="col-6 col-lg-6">
                        <label
                          className="d-flex align-items-start w-100"
                          style={{ fontSize: "0.9rem", cursor: "pointer" }}
                        >
                          <input
                            type="checkbox"
                            name="0"
                            value={item.brand_id}
                            onChange={handleChangeFilter}
                            className="me-2 mt-1"
                            style={{ flexShrink: 0 }}
                          />
                          <span className="text-break">{item.brand.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <hr />
                {categoryAttribute &&
                  categoryAttribute?.map((attr) => (
                    <div key={attr.id}>
                      <div className="filter-label">{attr.attribute.name}</div>

                      {/* Hidden measurement spans */}
                      <div
                        style={{
                          position: "absolute",
                          visibility: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {attr.attribute.attribute_values?.map((value) => (
                          <span
                            key={value.id}
                            ref={(el) => {
                              if (!measureRefs.current[attr.id]) {
                                measureRefs.current[attr.id] = {};
                              }
                              measureRefs.current[attr.id][value.id] = el;
                            }}
                            style={{ fontSize: "0.9rem" }}
                          >
                            {value.value}
                          </span>
                        ))}
                      </div>

                      {/* Actual filter checkboxes with dynamic columns */}
                      <div className="row g-2 mb-3">
                        {attr.attribute.attribute_values &&
                          attr.attribute.attribute_values.map((value) => (
                            <div
                              className={getColumnClass(attr.id)}
                              key={value.id}
                            >
                              <label
                                className="d-flex align-items-start w-100"
                                style={{
                                  fontSize: "0.9rem",
                                  cursor: "pointer",
                                }}
                              >
                                <input
                                  id={attr.id.toString()}
                                  name={attr.attribute.id.toString()}
                                  type="checkbox"
                                  value={value.id}
                                  onChange={handleChangeFilter}
                                  className="me-2 mt-1"
                                  style={{ flexShrink: 0 }}
                                />
                                <span className="text-break">
                                  {value.value}
                                </span>
                              </label>
                            </div>
                          ))}
                      </div>
                      <hr />
                    </div>
                  ))}
              </div>
            </div>

            <div className="col-12 col-lg-9 col-xl-9">
              <div className="product-toolbar rounded-4 p-3 p-lg-4 mb-3">
                <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 align-items-lg-center">
                  <div>
                    <h4 className="mb-1">
                      {category} ({c} sản phẩm)
                    </h4>
                    <div className="text-muted small">
                      Sắp xếp và duyệt sản phẩm theo nhu cầu mua sắm.
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-toolbar rounded-4 p-3 p-lg-4 mb-3">
                <div className="d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">
                  <div className="fw-semibold text-dark">Sắp xếp theo:</div>
                  <div className="sort-toolbar">
                    <button
                      className={`sort-pill ${filterState?.title == "Giá tăng dần" ? "is-active" : ""}`}
                      disabled={filterState?.title == "Giá tăng dần"}
                      onClick={() =>
                        dispatch(
                          fetchProductVariant({
                            skip: 0,
                            take: 8,
                            title: "Giá tăng dần",
                            sortBy: "price",
                            order: "asc",
                            category: category,
                            filters: filterState?.filters,
                          }),
                        )
                      }
                    >
                      Giá tăng dần
                      {filterState?.title == "Giá tăng dần" && (
                        <div className="sort-check">
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
                      )}
                    </button>
                    <button
                      className={`sort-pill ${filterState?.title == "Giá giảm dần" ? "is-active" : ""}`}
                      disabled={filterState?.title == "Giá giảm dần"}
                      onClick={() =>
                        dispatch(
                          fetchProductVariant({
                            skip: 0,
                            take: 8,
                            title: "Giá giảm dần",
                            sortBy: "price",
                            order: "desc",
                            category: category,
                            filters: filterState?.filters,
                          }),
                        )
                      }
                    >
                      Giá giảm dần
                      {filterState?.title == "Giá giảm dần" && (
                        <div className="sort-check">
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
                      )}
                    </button>
                    <button
                      className={`sort-pill ${filterState?.title == "Mới nhất" ? "is-active" : ""}`}
                      onClick={() =>
                        dispatch(
                          fetchProductVariant({
                            skip: 0,
                            take: 8,
                            title: "Mới nhất",
                            sortBy: "created_at",
                            order: "desc",
                            category: category,
                            filters: filterState?.filters,
                          }),
                        )
                      }
                    >
                      Mới nhất
                      {filterState?.title == "Mới nhất" && (
                        <div className="sort-check">
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
                      )}
                    </button>
                    <button
                      className={`sort-pill ${filterState?.title == "Bán chạy nhất" ? "is-active" : ""}`}
                      disabled={filterState?.title == "Bán chạy nhất"}
                      onClick={() =>
                        dispatch(
                          fetchProductVariant({
                            skip: 0,
                            take: 8,
                            title: "Bán chạy nhất",
                            sortBy: "sold",
                            order: "desc",
                            category: category,
                            filters: filterState?.filters,
                          }),
                        )
                      }
                    >
                      Bán chạy nhất
                      {filterState?.title == "Bán chạy nhất" && (
                        <div className="sort-check">
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
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="product-grid-shell rounded-4 p-3 p-lg-4"
                style={{ opacity: isLoading || isPendingUpdateCart ? 0.55 : 1 }}
              >
                <div className="row g-3 mx-0">
                  {product &&
                    product?.length > 0 &&
                    product?.map((item) => (
                      <div className="col-6 col-md-4 col-xl-3" key={item.id}>
                        <div className="product-grid-card d-flex flex-column">
                          <div className="product-image-wrap">
                            <img
                              src={
                                item.product_images &&
                                item.product_images.length > 0
                                  ? getImageUrl(item.product_images[0].url)
                                  : "/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                              }
                              className="product-grid-image"
                              alt={item.name}
                            />
                          </div>
                          <div className="product-card-body">
                            <p
                              className="mb-1 text-dark fw-semibold"
                              style={{ minHeight: "2.7rem" }}
                            >
                              {item.name}
                            </p>
                            <p className="small text-muted mb-2">Laptops</p>
                          </div>
                          <div className="product-card-body pt-0">
                            <div className="d-flex justify-content-between align-items-start gap-2">
                              <div>
                                <div className="product-price">
                                  {item.price.toLocaleString()} vnđ
                                </div>
                                <div className="small text-muted">
                                  VISA Platinum
                                </div>
                              </div>
                              <div className="text-muted small">8787</div>
                            </div>
                          </div>
                          <div className="px-3 pb-3 mt-auto">
                            <div className="d-flex justify-content-center align-items-center">
                              {item.inCart && user ? (
                                <button className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm rounded-pill">
                                  <div
                                    className="decrease-btn"
                                    onClick={() =>
                                      handleClickChange(
                                        item.cart.id!,
                                        item.cart.quantity! - 1,
                                      )
                                    }
                                  >
                                    -
                                  </div>
                                  <div>{item.cart.quantity}</div>
                                  <div
                                    className="increase-btn"
                                    onClick={() =>
                                      handleClickChange(
                                        item.cart.id!,
                                        item.cart.quantity! + 1,
                                      )
                                    }
                                  >
                                    +
                                  </div>
                                </button>
                              ) : item.inCart ? (
                                <button className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm rounded-pill">
                                  <div
                                    className="decrease-btn"
                                    onClick={() =>
                                      handleClickChange(
                                        item.cart.id!,
                                        item.cart.quantity! - 1,
                                      )
                                    }
                                  >
                                    -
                                  </div>
                                  <div>{item.cart.quantity}</div>
                                  <div
                                    className="increase-btn"
                                    onClick={() =>
                                      handleClickChange(
                                        item.cart.id!,
                                        item.cart.quantity! + 1,
                                      )
                                    }
                                  >
                                    +
                                  </div>
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    addToCartForAuthenticatedUser({
                                      id: 0,
                                      user_id: user.id || 0,
                                      variant_id: item.id,
                                      quantity: 1,
                                      unit_price: item.price,
                                      variant: item,
                                    })
                                  }
                                  type="button"
                                  data-mdb-button-init
                                  data-mdb-ripple-init
                                  className="btn btn-primary btn-sm w-100 rounded-pill"
                                >
                                  Thêm vào giỏ
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div
                  className="load-more-btn bg-white"
                  style={{ cursor: "pointer", opacity: isLoading ? 0.65 : 1 }}
                  onClick={() =>
                    dispatch(
                      fetchProductVariant({
                        skip: count,
                        take: 8,
                        sortBy: filterState?.sortBy,
                        order: filterState?.order,
                        category: category,
                        minPrice: priceRange.minPrice,
                        maxPrice: priceRange.maxPrice,
                        filters: filterState?.filters,
                      }),
                    )
                  }
                >
                  Xem thêm sản phẩm
                </div>
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

export default Product;
