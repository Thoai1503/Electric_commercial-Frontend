import { useEffect, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@tanstack/react-query";
import { productVariantQuery } from "../../module/client/query/productVariant";
import { productContentQuery } from "../../module/client/query/productContent";
import { useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/imageHelper";

const ProductDetail = () => {
  const { id } = useParams();
  // const [selectedColor, setSelectedColor] = useState("midnight");
  const [selectedStorage, setSelectedStorage] = useState("128GB");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading } = useQuery(productVariantQuery.detail(Number(id)));
  const product_id = useMemo(() => data?.product_id, [data]);
  console.log("product_id", product_id);
  const { data: variantData, isLoading: isVariantLoading } = useQuery(
    productVariantQuery.by_product_id(Number(product_id)),
  );
  const numericProductId = Number(product_id);
  const hasValidProductId =
    Number.isFinite(numericProductId) && numericProductId > 0;
  const { data: publishedContent } = useQuery({
    ...productContentQuery.published(numericProductId),
    enabled: hasValidProductId,
  });
  console.log("variantData", variantData?.length);
  const variant_attributes = useMemo(() => data?.variant_attributes, [data]);

  const product = useMemo(
    () => ({
      name: data?.product?.product_variant?.[0]?.name,
      brand: "Samsung",
      rating: 4.5,
      reviews: 1243,
      colors: [
        { id: "midnight", name: "Midnight Black", hex: "#1a1a1a" },
        { id: "titanium", name: "Titanium Gray", hex: "#6b7280" },
        { id: "violet", name: "Violet", hex: "#8b5cf6" },
        { id: "cream", name: "Cream", hex: "#f5f5dc" },
      ],
      storage: [
        { size: "128GB", price: 999 },
        { size: "256GB", price: 1099 },
        { size: "512GB", price: 1299 },
        { size: "1TB", price: 1499 },
      ],
      images: [
        ...(data?.product_images?.map((item) => getImageUrl(item.url)) ?? []),
      ],
      specs: {
        display: '6.8" Dynamic AMOLED 2X',
        processor: "Snapdragon 8 Gen 3",
        camera: "200MP + 50MP + 12MP + 10MP",
        battery: "5000mAh",
        os: "Android 14",
      },
      features: [
        "S Pen included",
        "5G connectivity",
        "IP68 water resistance",
        "Wireless charging",
        "AI-powered camera",
        "Titanium frame",
      ],
    }),
    [data],
  );

  const currentPrice = useMemo(() => data?.price, [data]);
  //  product.storage.find((s) => s.size === selectedStorage)?.price || 999;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

  // Kiểm tra nếu không có hình ảnh
  const hasImages = product.images && product.images.length > 0;

  return (
    <div className="container py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">
              Trang chủ
            </a>
          </li>
          {data?.product?.category && (
            <li className="breadcrumb-item">
              <a
                href={`/category/${data.product.category.id}`}
                className="text-decoration-none"
              >
                {data.product.category.name}
              </a>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {isLoading ? (
              <div
                className="skeleton-shimmer"
                style={{ width: 150, height: 16, borderRadius: 4 }}
              />
            ) : (
              product.name || "Sản phẩm"
            )}
          </li>
        </ol>
      </nav>

      {/* Product Main Section */}
      <div className="row g-4 align-items-start mb-5">
        {/* Left: Image Gallery & Specs */}
        <div className="col-lg-7 col-md-6">
          {isLoading ? (
            <div
              className="card border-0 shadow-sm p-4"
              style={{ minHeight: 520 }}
            >
              <div
                className="skeleton-shimmer w-100 mb-3"
                style={{ height: 400, borderRadius: 16 }}
              />
              <div className="row g-2 mt-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div className="col-3" key={idx}>
                    <div
                      className="skeleton-shimmer w-100"
                      style={{ height: 80, borderRadius: 8 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : hasImages ? (
            <>
              <div className="card border-0 shadow-sm">
                <img
                  src={product.images[selectedImage]}
                  className="card-img-top"
                  alt={product.name}
                  style={{
                    height: "500px",
                    objectFit: "contain",
                    backgroundColor: "#f8f9fa",
                    padding: "20px",
                  }}
                />
              </div>
              <div className="row mt-3 g-2">
                {product.images.map((img, idx) => (
                  <div className="col-3" key={idx}>
                    <img
                      src={img}
                      className={`img-thumbnail ${selectedImage === idx ? "border-primary border-3" : ""}`}
                      alt={`View ${idx + 1}`}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        cursor: "pointer",
                        height: "100px",
                        objectFit: "contain",
                        width: "100%",
                        backgroundColor: "#f8f9fa",
                        padding: "5px",
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card border-0 shadow-sm">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{
                  height: "500px",
                  backgroundColor: "#f8f9fa",
                }}
              >
                <div className="text-center text-muted">
                  <i className="bi bi-image" style={{ fontSize: "4rem" }}></i>
                  <p className="mt-2">No images available</p>
                </div>
              </div>
            </div>
          )}

          {/* Specs Card - in left column */}
          {!isLoading && (
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-white border-bottom">
                <h5 className="card-title fw-bold mb-0">Thông số kỹ thuật</h5>
              </div>
              <div className="card-body">
                <table className="table table-sm  mb-0">
                  <tbody>
                    {variant_attributes?.map((attr) => (
                      <tr key={attr.attribute.id}>
                        <th
                          className="text-capitalize"
                          style={{ width: "30%" }}
                        >
                          {attr.attribute.name} :
                        </th>
                        <td>{attr.attribute_value?.value}</td>
                      </tr>
                    )) || null}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="col-lg-5 col-md-6">
          {isLoading ? (
            <div className="card border-0 shadow-sm p-4">
              <div
                className="skeleton-shimmer mb-3"
                style={{ width: 180, height: 24, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-2"
                style={{ width: 120, height: 18, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-4"
                style={{ width: 100, height: 32, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-3"
                style={{ width: 100, height: 18, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-4"
                style={{ width: 220, height: 40, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-2"
                style={{ width: 100, height: 18, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-2"
                style={{ width: 100, height: 18, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-2"
                style={{ width: 100, height: 18, borderRadius: 8 }}
              />
              <div
                className="skeleton-shimmer mb-2"
                style={{ width: 100, height: 18, borderRadius: 8 }}
              />
            </div>
          ) : (
            <>
              {/* Product Title & Basic Info */}
              <div className="mb-3">
                <h1 className="h4 fw-bold mb-2">{product.name}</h1>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div>
                    <span className="text-warning">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span className="ms-2 text-muted small">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* SKU Info */}
                <div className="text-muted small mb-2">
                  SKU: {data?.sku || "N/A"}
                </div>
              </div>

              {/* Price & Deal Banner */}
              <div className="mb-3">
                <h2 className="h3 text-primary fw-bold mb-2">
                  {currentPrice?.toLocaleString()} VND
                </h2>
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 60'%3E%3Crect fill='%23FF6B00' width='200' height='60'/%3E%3Ctext x='100' y='35' font-size='20' font-weight='bold' fill='white' text-anchor='middle'%3EDEAL SIÊU HỌC%3C/text%3E%3C/svg%3E"
                  alt="Deal siêu hót"
                  style={{ height: "50px", objectFit: "contain" }}
                  className="mb-3"
                />
              </div>

              {/* Quick Info */}
              <div className="card bg-light border-0 mb-3">
                <div className="card-body p-3">
                  <div className="row g-2">
                    <div className="col-6">
                      <small className="text-muted">Bộ nhớ</small>
                      <div className="small fw-semibold">
                        {data?.name || "N/A"}
                      </div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Tình trạng</small>
                      <div className="small fw-semibold text-success">
                        Có sẵn
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Storage Variants */}
              <div className="mb-3">
                <label className="form-label small fw-semibold">
                  Chọn cấu hình
                </label>
                <div className="d-flex flex-wrap gap-2">
                  {isVariantLoading
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <div
                          key={idx}
                          className="skeleton-shimmer"
                          style={{
                            width: 100,
                            height: 50,
                            borderRadius: 8,
                          }}
                        />
                      ))
                    : variantData?.slice(0, 3).map((variant) => (
                        <a
                          key={variant.id}
                          href={`/product/${variant.id}`}
                          className={`btn btn-sm ${
                            selectedStorage === variant?.id?.toString()
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          onClick={() =>
                            setSelectedStorage(variant?.id?.toString() || "")
                          }
                        >
                          <div className="small fw-semibold">{variant.id}</div>
                          <div className="small text-muted">
                            ${variant.price}
                          </div>
                        </a>
                      )) || null}
                </div>
              </div>

              {/* Quantity & Buy Button */}
              <div className="mb-4">
                <div className="row g-2">
                  <div className="col-auto">
                    <label className="form-label small fw-semibold">
                      Số lượng
                    </label>
                    <div className="input-group" style={{ maxWidth: "120px" }}>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        −
                      </button>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="row g-2 mb-4">
                <div className="col-12">
                  <button className="btn btn-primary w-100 fw-semibold py-2">
                    <i className="bi bi-cart-plus me-2"></i>MUA NGAY
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100 btn-sm">
                    <i className="bi bi-heart"></i> Yêu thích
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-outline-secondary w-100 btn-sm">
                    <i className="bi bi-share"></i> Chia sẻ
                  </button>
                </div>
              </div>

              {/* Policy Info */}
              <div className="border-top pt-3">
                <div className="row g-3 mb-3">
                  <div className="col-12">
                    <div className="small">
                      <strong className="text-dark">
                        Chính sách bảo hành:
                      </strong>
                      <span className="text-muted ms-2">
                        12 tháng bảo hành chính hãng
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="small">
                      <strong className="text-dark">Hỗ trợ trả góp:</strong>
                      <span className="text-muted ms-2">0% lãi suất</span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="small">
                      <strong className="text-dark">Giao hàng:</strong>
                      <span className="text-muted ms-2">
                        Miễn phí toàn TP.HCM
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Product Details Sections */}
      <div className="row g-4 mb-5">
        <div className="col-7">
          {/* Description from CMS */}
          {publishedContent?.html && (
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-header bg-white border-bottom">
                <h5 className="card-title fw-bold mb-0">Chi tiết sản phẩm</h5>
              </div>
              <div className="card-body">
                <div className="product-description-content">
                  {publishedContent && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: publishedContent.html,
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Skeleton shimmer style */}
      <style>{`
        .skeleton-shimmer {
          background: linear-gradient(90deg, #e9ecef 25%, #f8f9fa 37%, #e9ecef 63%);
          background-size: 400% 100%;
          animation: skeleton-shimmer 1.4s ease infinite;
        }
        
        .product-description-content {
          font-size: 14px;
          line-height: 1.6;
          color: #333;
        }
        
        .product-description-content img {
          max-width: 100%;
          height: auto;
          margin: 16px 0;
          border-radius: 4px;
        }
        
        .product-description-content p {
          margin-bottom: 12px;
        }
        
        .product-description-content h1,
        .product-description-content h2,
        .product-description-content h3,
        .product-description-content h4,
        .product-description-content h5,
        .product-description-content h6 {
          margin-top: 16px;
          margin-bottom: 8px;
          font-weight: 600;
        }
        
        .product-description-content ul,
        .product-description-content ol {
          margin-left: 24px;
          margin-bottom: 12px;
        }
        
        .product-description-content li {
          margin-bottom: 6px;
        }
        
        .product-description-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 16px 0;
        }
        
        .product-description-content table thead {
          background-color: #f8f9fa;
        }
        
        .product-description-content table th,
        .product-description-content table td {
          border: 1px solid #dee2e6;
          padding: 12px;
          text-align: left;
        }
        
        .product-description-content blockquote {
          border-left: 4px solid #007bff;
          padding-left: 16px;
          margin-left: 0;
          color: #666;
          font-style: italic;
        }
        
        @keyframes skeleton-shimmer {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
