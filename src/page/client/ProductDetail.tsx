import { useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useQuery } from "@tanstack/react-query";
import { productVariantQuery } from "../../module/client/query/productVariant";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("midnight");
  const [selectedStorage, setSelectedStorage] = useState("128GB");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data } = useQuery(productVariantQuery.detail(Number(id)));

  const product = useMemo(
    () => ({
      name: data?.name,
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
        ...(data?.product_images?.map(
          (item) => `http://localhost:5173/uploads/${item.url}`
        ) ?? []),
        "https://images.unsplash.com/photo-1592286927505-c0d0eb5e76cc?w=500",
        "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
        "https://images.unsplash.com/photo-1591122947157-26bad3a117d2?w=500",
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=500",
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
    [data]
  );

  const currentPrice =
    product.storage.find((s) => s.size === selectedStorage)?.price || 999;

  return (
    <div className="container py-5">
      <div className="row">
        {/* Image Gallery */}
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow-sm">
            <img
              src={product.images[selectedImage]}
              className="card-img-top"
              alt={product.name}
              style={{ height: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="row mt-3 g-2">
            {product.images.map((img, idx) => (
              <div className="col-3" key={idx}>
                <img
                  src={img}
                  className={`img-thumbnail cursor-pointer ${selectedImage === idx ? "border-primary" : ""}`}
                  alt={`View ${idx + 1}`}
                  onClick={() => setSelectedImage(idx)}
                  style={{
                    cursor: "pointer",
                    height: "100px",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#" className="text-decoration-none">
                  Home
                </a>
              </li>
              <li className="breadcrumb-item">
                <a href="#" className="text-decoration-none">
                  Smartphones
                </a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.brand}
              </li>
            </ol>
          </nav>

          <h1 className="h2 fw-bold mb-2">
            {product.brand} {product.name}
          </h1>

          <div className="d-flex align-items-center mb-3">
            <div className="text-warning me-2">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-muted">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <h2 className="h3 text-primary fw-bold mb-4">
            ${currentPrice.toLocaleString()}
          </h2>

          {/* Color Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold">
              Color:{" "}
              <span className="fw-normal">
                {product.colors.find((c) => c.id === selectedColor)?.name}
              </span>
            </label>
            <div className="d-flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color.id}
                  className={`btn btn-outline-secondary rounded-circle p-0 ${selectedColor === color.id ? "border-primary border-3" : ""}`}
                  onClick={() => setSelectedColor(color.id)}
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: color.hex,
                    border:
                      selectedColor === color.id
                        ? "3px solid"
                        : "2px solid #dee2e6",
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Storage Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Storage</label>
            <div className="btn-group w-100" role="group">
              {product.storage.map((option) => (
                <button
                  key={option.size}
                  type="button"
                  className={`btn ${selectedStorage === option.size ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setSelectedStorage(option.size)}
                >
                  {option.size}
                  <div className="small">${option.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-4">
            <label className="form-label fw-semibold">Quantity</label>
            <div className="input-group" style={{ maxWidth: "150px" }}>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <input
                type="text"
                className="form-control text-center"
                value={quantity}
                readOnly
              />
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="d-grid gap-2 mb-4">
            <button className="btn btn-primary btn-lg">
              <i className="bi bi-cart-plus"></i> Add to Cart
            </button>
            <button className="btn btn-outline-secondary">
              <i className="bi bi-heart"></i> Add to Wishlist
            </button>
          </div>

          {/* Key Features */}
          <div className="card bg-light border-0 mb-4">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-3">Key Features</h5>
              <div className="row g-2">
                {product.features.map((feature, idx) => (
                  <div className="col-6" key={idx}>
                    <small className="d-flex align-items-center">
                      <span className="text-success me-2">✓</span>
                      {feature}
                    </small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title fw-semibold mb-3">Specifications</h5>
              <table className="table table-sm">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <th className="text-capitalize" style={{ width: "40%" }}>
                        {key}
                      </th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
