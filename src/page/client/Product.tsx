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

const Product = () => {
  const [toast, addToast] = useState<any>();
  const toaster = useRef(null);
  const [columnCounts, setColumnCounts] = useState<Record<number, number>>({});
  const measureRefs = useRef<
    Record<number, Record<number, HTMLSpanElement | null>>
  >({});

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
    categoryAttributeQuery.category_slug(category || "")
  );
  const { data } = useQuery(categoryBrandQuery.category_slug(category!));

  const dispatch = useDispatch<AppDispatch>();
  const ProductList = useSelector(
    (state: RootState) => state.filterProduct.variant
  );
  const count = useSelector(
    (state: RootState) => state.filterProduct.current_length
  );
  const c = useSelector((state: RootState) => state.filterProduct.count);
  const isLoading = useSelector(
    (state: RootState) => state.filterProduct.loading
  );
  const filterState = useSelector(
    (state: RootState) => state.filterProduct.filter_state
  );

  console.log("count: " + c);
  const { product } = useGuestOrUserView(user?.id || 0, ProductList);
  const { handleChangeFilter } = useFilterPage(category || "");
  const {
    handleClickChange,
    isPendingUpdateCart,
    addToCartForAuthenticatedUser,
  } = useHomePage(user?.id || 0, () => {
    addToast(
      exampleToast(
        "Thêm vào giỏ hàng thành công" + ` <a href="/cart">Xem giỏ hàng</a>`
      )
    );
  });

  // Calculate optimal column layout based on text width
  const calculateColumns = (values: any[], attrId: number) => {
    if (!measureRefs.current[attrId]) return 2;

    const maxTextWidth = Math.max(
      ...values.map((v) => {
        const span = measureRefs.current[attrId]?.[v.id];
        return span ? span.offsetWidth : 0;
      })
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
      })
    );
  }, [dispatch]);

  // Calculate column counts after data loads
  useEffect(() => {
    if (categoryAttribute) {
      const newColumnCounts: Record<number, number> = {};
      categoryAttribute.forEach((attr) => {
        newColumnCounts[attr.id] = calculateColumns(
          attr.attribute.attribute_values || [],
          attr.id
        );
      });
      setColumnCounts(newColumnCounts);
    }
  }, [categoryAttribute]);

  return (
    <>
      <div className="container mt-5 mb-5">
        {(isLoading || isPendingUpdateCart) && (
          <div
            className="spinner-border text-primary"
            role="status"
            style={{
              opacity: 1,
              width: "3rem",
              height: "3rem",
              position: "relative",
              top: "50%",
              left: "50%",
              zIndex: 1000,
            }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <Breadcrumbs />

        <div className="content row">
          <div className="col-lg-2 py-2">
            <div className="bg-white rounded p-3">
              <strong>
                <p className="text">Bộ lọc tìm kiếm</p>
              </strong>
              <div className="selected-tag mb-3">
                <span
                  className="text px-2"
                  style={{
                    border: "1px solid lightgray",
                    borderRadius: "10px",
                  }}
                >
                  RAM 64-GB
                </span>
              </div>
              <p className="text text-danger ">Xoá bộ lọc</p>
              <div>
                <hr />
                <strong>
                  <p className="text">Thương hiệu</p>
                </strong>
                <div className="row g-2 mb-3">
                  {data?.map((item) => (
                    <div key={item.brand_id} className="col-lg-6">
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
                    <strong>
                      <p className="text">{attr.attribute.name}</p>
                    </strong>

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
                              style={{ fontSize: "0.9rem", cursor: "pointer" }}
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
                              <span className="text-break">{value.value}</span>
                            </label>
                          </div>
                        ))}
                    </div>
                    <hr />
                  </div>
                ))}
            </div>
          </div>

          <div className="col-lg-9">
            <div className="p-3 bg-white rounded mb-2">
              <h4>Laptop ({c} sản phẩm)</h4>
            </div>
            <div className="p-3 bg-white rounded mb-1">
              <div className="head d-flex">
                <div>Sắp xếp theo:</div>
                <button
                  className="position-relative mx-2 rounded p-2 text filter-btn"
                  style={{
                    border:
                      filterState?.title == "Giá tăng dần"
                        ? "1px solid #06b6d4"
                        : "1px solid lightgray",
                    backgroundColor: "white",
                  }}
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
                      })
                    )
                  }
                >
                  Giá tăng dần
                  {filterState?.title == "Giá tăng dần" && (
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
                  )}
                </button>
                <button
                  className="position-relative mx-2 rounded p-2 text filter-btn"
                  style={{
                    border:
                      filterState?.title == "Giá giảm dần"
                        ? "1px solid #06b6d4"
                        : "1px solid lightgray",
                    backgroundColor: "white",
                  }}
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
                      })
                    )
                  }
                >
                  Giá giảm dần
                  {filterState?.title == "Giá giảm dần" && (
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
                  )}
                </button>
                <button
                  className="position-relative mx-2 rounded p-2 text"
                  style={{
                    border:
                      filterState?.title == "Mới nhất"
                        ? "1px solid #06b6d4"
                        : "1px solid lightgray",
                    backgroundColor: "white",
                  }}
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
                      })
                    )
                  }
                >
                  Mới nhất
                  {filterState?.title == "Mới nhất" && (
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
                  )}
                </button>
                <button
                  className="position-relative mx-2 rounded p-2 text filter-btn"
                  style={{
                    border:
                      filterState?.title == "Bán chạy nhất"
                        ? "1px solid #06b6d4"
                        : "1px solid lightgray",
                    backgroundColor: "white",
                  }}
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
                      })
                    )
                  }
                >
                  Bán chạy nhất
                  {filterState?.title == "Bán chạy nhất" && (
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
                  )}
                </button>
              </div>
            </div>
            <div
              className="bg-white"
              style={{ opacity: isLoading || isPendingUpdateCart ? 0.4 : 1 }}
            >
              <div className="row mx-0">
                {product &&
                  product?.length > 0 &&
                  product?.map((item) => (
                    <div
                      className="col-lg-3 pb-3 m"
                      style={{
                        marginRight: "0px",
                        padding: "3px",
                        width: "240px",
                      }}
                      key={item.id}
                    >
                      <div
                        className="card h-100"
                        style={{ borderRadius: "0px" }}
                      >
                        <img
                          src={
                            item.product_images &&
                            item.product_images.length > 0
                              ? `/uploads/${item.product_images[0].url}`
                              : "/images/asus-vivobook-go-15-e1504fa-r5-nj630w-glr-14-750x500.jpg?h=120&fit=crop&auto=format&dpr=2 2x"
                          }
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                          }}
                          alt={item.name}
                        />
                        <div
                          className="card-body pb-0"
                          style={{ minHeight: "100px" }}
                        >
                          <div>
                            <p className="text">{item.name}</p>
                            <p className="small text-muted">Laptops</p>
                          </div>
                        </div>
                        <div className="card-body pb-0">
                          <div className="d-flex justify-content-between">
                            <p>
                              <span style={{ color: "#1a96e2ff" }}>
                                <strong>
                                  {item.price.toLocaleString()} vnđ
                                </strong>
                              </span>
                            </p>
                            <p className="text-dark"> 8787</p>
                          </div>
                          <p className="small text-muted">VISA Platinum</p>
                        </div>
                        <div
                          className="card-body"
                          style={{ marginTop: "auto" }}
                        >
                          <div className="d-flex justify-content-center align-items-center pb-2 mb-1">
                            {item.inCart && user ? (
                              <button className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm">
                                <div
                                  className="decrease-btn"
                                  onClick={() =>
                                    handleClickChange(
                                      item.cart.id!,
                                      item.cart.quantity! - 1
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
                                      item.cart.quantity! + 1
                                    )
                                  }
                                >
                                  +
                                </div>
                              </button>
                            ) : item.inCart ? (
                              <button className="w-100 d-flex justify-content-between btn btn-outline-primary btn-sm">
                                <div
                                  className="decrease-btn"
                                  onClick={() =>
                                    handleClickChange(
                                      item.cart.id!,
                                      item.cart.quantity! - 1
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
                                      item.cart.quantity! + 1
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
                                className="btn btn-outline-primary btn-sm w-100"
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
            <div className="d-flex justify-content-center">
              <div
                className="text bg-white p-1 px-5 mt-3"
                style={{ cursor: "pointer", opacity: isLoading ? 0.5 : 1 }}
                onClick={() =>
                  dispatch(
                    fetchProductVariant({
                      skip: count,
                      take: 8,
                      sortBy: filterState?.sortBy,
                      order: filterState?.order,
                      category: category,
                      filters: filterState?.filters,
                    })
                  )
                }
              >
                Xem thêm sản phẩm
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
