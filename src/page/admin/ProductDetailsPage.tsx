import { useState } from "react";
import { ArrowRight, ArrowLeft, Plus, Upload, Check } from "lucide-react";

import GeneralInfoSection from "../../components/admin/product_details_page/GeneralInfoSection";
import { useParams } from "react-router-dom";
import { useProductDetailPage } from "../../module/admin/hook/product_detail_page";
import AttributeConfigSestion from "../../components/admin/product_details_page/AttributeConfigSestion";

const ProductDetails = () => {
  const { id } = useParams();
  const { tabs, nextTab, prevTab, activeTab, setActiveTab } =
    useProductDetailPage(parseInt(id ?? "0"));

  // Attributes data

  // Variants data
  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState({
    ram: true,
    storage: true,
    color: true,
  });

  const [variants] = useState([
    {
      sku: "IP15P-8-128-BLACK",
      ram: "8",
      storage: "128",
      color: "Black",
      price: "25,990",
    },
    {
      sku: "IP15P-8-256-SILVER",
      ram: "8",
      storage: "256",
      color: "Silver",
      price: "28,990",
    },
    {
      sku: "IP15P-12-512-GOLD",
      ram: "12",
      storage: "512",
      color: "Gold",
      price: "32,990",
    },
  ]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <GeneralInfoSection id={parseInt(id ?? "0")} />;

      case 1:
        return (
          <AttributeConfigSestion
            id={parseInt(id ?? "0")}
            nextTab={nextTab}
            prevTab={prevTab}
          />
        );

      case 2:
        return (
          <>
            <div className="mb-4">
              <h6 className="mb-3">📌 Chọn thuộc tính cho biến thể:</h6>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedVariantAttributes.ram}
                    onChange={(e) =>
                      setSelectedVariantAttributes({
                        ...selectedVariantAttributes,
                        ram: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label">
                    RAM (8GB, 12GB, 16GB)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedVariantAttributes.storage}
                    onChange={(e) =>
                      setSelectedVariantAttributes({
                        ...selectedVariantAttributes,
                        storage: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label">
                    Storage (128GB, 256GB, 512GB)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedVariantAttributes.color}
                    onChange={(e) =>
                      setSelectedVariantAttributes({
                        ...selectedVariantAttributes,
                        color: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label">
                    Màu sắc (Black, Silver, Gold)
                  </label>
                </div>
              </div>

              <div className="table-responsive mb-3">
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>SKU</th>
                      <th>RAM</th>
                      <th>Storage</th>
                      <th>Color</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variants.map((variant, index) => (
                      <tr key={index}>
                        <td>{variant.sku}</td>
                        <td>{variant.ram}</td>
                        <td>{variant.storage}</td>
                        <td>{variant.color}</td>
                        <td>{variant.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-4">
                <span className="me-2">👉 Action:</span>
                <div className="btn-group">
                  <button className="btn btn-outline-primary btn-sm">
                    <Plus size={14} className="me-1" />
                    Add Variant
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    Bulk Edit Price
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    Import CSV
                  </button>
                </div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary d-flex align-items-center"
                onClick={prevTab}
              >
                <ArrowLeft size={16} className="me-1" />
                <span>Quay lại</span>
              </button>
              <button
                type="button"
                className="btn d-flex align-items-center"
                style={{ backgroundColor: "#6f42c1", color: "white" }}
                onClick={nextTab}
              >
                <span className="me-2">Tiếp tục</span>
                <ArrowRight size={16} className="me-1" />
                <span>Ảnh</span>
              </button>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="mb-4">
              <h6 className="mb-3">📌 Ảnh chung cho sản phẩm:</h6>
              <div
                className="border rounded p-4 text-center mb-4"
                style={{ backgroundColor: "#f8f9fa" }}
              >
                <button className="btn btn-outline-primary">
                  <Plus size={16} className="me-1" />
                  Upload Image
                </button>
                <p className="text-muted mt-2 mb-0">
                  Drag & Drop để sắp xếp thứ tự hiển thị
                </p>
              </div>

              <h6 className="mb-3">📌 Ảnh cho từng biến thể:</h6>
              <div className="mb-3">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-between border-bottom py-2"
                  >
                    <span>- {variant.sku}</span>
                    <button className="btn btn-outline-secondary btn-sm">
                      <Upload size={14} className="me-1" />
                      Upload
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-outline-secondary d-flex align-items-center"
                onClick={prevTab}
              >
                <ArrowLeft size={16} className="me-1" />
                <span>Quay lại</span>
              </button>
              <button
                type="button"
                className="btn btn-success d-flex align-items-center"
              >
                <Check size={16} className="me-1" />
                <span>Lưu sản phẩm</span>
              </button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb" className="mb-4">
        <a
          href="#"
          className="text-decoration-none"
          style={{ color: "#6f42c1" }}
        >
          Home
        </a>
      </nav>

      {/* Main Form Card */}
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          {/* Tabs Navigation */}
          <div className="border-bottom">
            <ul className="nav nav-tabs border-0 px-4">
              {tabs.map((tab) => (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      border: "none",
                      borderBottom:
                        activeTab === tab.id
                          ? "2px solid #6f42c1"
                          : "2px solid transparent",
                      backgroundColor: "transparent",
                    }}
                  >
                    {tab.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Tab Content */}
          <div className="p-4">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
