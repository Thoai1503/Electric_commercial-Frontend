import React, { useRef, useState } from "react";
import {
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Plus,
  Upload,
  Check,
} from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "@tanstack/react-query";
import brandQueries from "../../module/admin/query/brand";
import type { Brand } from "../../type/Brand";
import categoriesTreeQuery from "../../module/admin/query/category";

const ProductForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("iphone-15-pro");
  const [selectedBrand, setSelectedBrand] = useState("Apple");
  const [selectedCategory, setSelectedCategory] = useState("Điện thoại");

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [content, setContent] = useState("");
  // Attributes data
  const [attributes, setAttributes] = useState({
    screen: "6.1",
    chip: "Apple A17 Pro",
    battery: "3274",
  });

  // Variants data
  const [selectedVariantAttributes, setSelectedVariantAttributes] = useState({
    ram: true,
    storage: true,
    color: true,
  });
  const editorRef = useRef(null) as any;

  const logContent = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const variants = useState([
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
  ]) as any;

  const { data: brands } = useQuery(brandQueries.list);
  const { data: categories } = useQuery(categoriesTreeQuery.list);
  // const category = ["Điện thoại", "Laptop", "Tablet", "Phụ kiện"];

  const tabs = [
    { id: 0, title: "Thông tin chung" },
    { id: 1, title: "Thuộc tính" },
    { id: 2, title: "Biến thể" },
    { id: 3, title: "Ảnh" },
  ];

  const generateSlug = (name: any) => {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleProductNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.value;
    setProductName(name);
    if (name) {
      setSlug(generateSlug(name));
    }
  };

  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <>
            {/* Product Name */}
            <div className="row mb-4 align-items-center">
              <div className="col-2">
                <label className="form-label mb-0 fw-normal">
                  Tên sản phẩm:
                </label>
              </div>
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  value={productName}
                  onChange={handleProductNameChange}
                  placeholder=""
                />
              </div>
            </div>

            {/* Slug */}
            <div className="row mb-4 align-items-center">
              <div className="col-2">
                <label className="form-label mb-0 fw-normal">Slug:</label>
              </div>
              <div className="col-10">
                <div className="d-flex align-items-center">
                  <input
                    type="text"
                    className="form-control"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                  <span className="ms-2 text-muted small">(auto)</span>
                </div>
              </div>
            </div>

            {/* Brand */}
            <div className="row mb-4 align-items-center">
              <div className="col-2">
                <label className="form-label mb-0 fw-normal">Brand:</label>
              </div>
              <div className="col-10">
                <div className="position-relative">
                  <button
                    className="btn btn-outline-light border w-100 text-start d-flex justify-content-between align-items-center"
                    type="button"
                    onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                    style={{ backgroundColor: "white", color: "#6c757d" }}
                  >
                    <span>{selectedBrand}</span>
                    <ChevronDown size={16} />
                  </button>
                  {brandDropdownOpen && (
                    <div
                      className="position-absolute w-100 mt-1"
                      style={{ zIndex: 1050 }}
                    >
                      <ul className="list-group shadow">
                        {brands?.map((brand: Brand) => (
                          <li
                            key={brand.id}
                            className="list-group-item list-group-item-action border-0"
                            style={{ cursor: "pointer" }}
                          >
                            <button
                              className="btn btn-link text-decoration-none p-0 w-100 text-start text-dark"
                              onClick={() => {
                                setSelectedBrand(brand.name);
                                setBrandDropdownOpen(false);
                              }}
                            >
                              {brand.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="row mb-4 align-items-center">
              <div className="col-2">
                <label className="form-label mb-0 fw-normal">Category:</label>
              </div>
              <div className="col-10">
                <div className="d-flex align-items-center">
                  <div className="position-relative flex-grow-1">
                    <button
                      className="btn btn-outline-light border w-100 text-start d-flex justify-content-between align-items-center"
                      type="button"
                      onClick={() =>
                        setCategoryDropdownOpen(!categoryDropdownOpen)
                      }
                      style={{ backgroundColor: "white", color: "#6c757d" }}
                    >
                      <span>{selectedCategory}</span>
                      <ChevronDown size={16} />
                    </button>
                    {categoryDropdownOpen && (
                      <div
                        className="position-absolute w-100 mt-1"
                        style={{ zIndex: 1050 }}
                      >
                        <ul className="list-group shadow">
                          {categories?.map((category) => (
                            <li
                              key={category.id}
                              className="list-group-item list-group-item-action border-0"
                              style={{ cursor: "pointer" }}
                            >
                              <button
                                className="btn btn-link text-decoration-none p-0 w-100 text-start text-dark"
                                onClick={() => {
                                  setSelectedCategory(category.text);
                                  setCategoryDropdownOpen(false);
                                }}
                              >
                                {category.text}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <span className="ms-2 text-muted small">(tree select)</span>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="row mb-4">
              <div className="col-2">
                <label className="form-label mb-0 fw-normal">
                  Mô tả sản phẩm:
                </label>
              </div>
              <div className="col-10">
                <div>
                  <Editor
                    apiKey="opbl478qvvrtoorhvqc4f7zei61txljv0gkj67k1ogzky57n" // có thể để trống khi test local
                    initialValue="<p>Soạn thảo với upload ảnh...</p>"
                    init={{
                      height: 500,
                      menubar: true,
                      plugins: "image media link code",
                      toolbar:
                        "undo redo | bold italic | alignleft aligncenter alignright | image media link code",

                      // URL API backend để nhận file upload
                      images_upload_url: "http://localhost:5000/upload",

                      // Custom handler nếu muốn tự điều khiển upload
                      images_upload_handler: async (
                        blobInfo: any,
                        success: any,
                        failure: any
                      ) => {
                        try {
                          const formData = new FormData();
                          formData.append(
                            "file",
                            blobInfo.blob(),
                            blobInfo.filename()
                          );

                          console.log("form data: " + JSON.stringify(formData));
                          const response = await fetch(
                            "http://localhost:5000/upload",
                            {
                              method: "POST",
                              body: formData,
                            }
                          );

                          const json = await response.json();

                          // backend trả về link ảnh
                          success(json);
                          alert(json);
                        } catch (err: any) {
                          failure("Upload thất bại: " + err.message);
                        }
                      },
                    }}
                    onEditorChange={(newContent) => setContent(newContent)}
                  />

                  <button onClick={logContent}>Lấy nội dung</button>
                  <h3 className="mt-4">Xem trước nội dung:</h3>
                  <div
                    style={{ border: "1px solid #ddd", padding: "10px" }}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-2"></div>
              <div className="col-10">
                <button
                  type="button"
                  className="btn d-flex align-items-center"
                  style={{ backgroundColor: "#6f42c1", color: "white" }}
                  onClick={nextTab}
                >
                  <span className="me-2">Tiếp tục</span>
                  <ArrowRight size={16} className="me-1" />
                  <span>Thuộc tính</span>
                </button>
              </div>
            </div>
          </>
        );

      case 1:
        return (
          <>
            <div className="mb-4">
              <h6 className="mb-3">📌 Thuộc tính sản phẩm chung:</h6>

              <div className="row mb-3 align-items-center">
                <div className="col-2">
                  <label className="form-label mb-0">Màn hình (inch):</label>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    value={attributes.screen}
                    onChange={(e) =>
                      setAttributes({ ...attributes, screen: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-3 align-items-center">
                <div className="col-2">
                  <label className="form-label mb-0">Chip:</label>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    value={attributes.chip}
                    onChange={(e) =>
                      setAttributes({ ...attributes, chip: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="row mb-4 align-items-center">
                <div className="col-2">
                  <label className="form-label mb-0">Pin (mAh):</label>
                </div>
                <div className="col-4">
                  <input
                    type="text"
                    className="form-control"
                    value={attributes.battery}
                    onChange={(e) =>
                      setAttributes({ ...attributes, battery: e.target.value })
                    }
                  />
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
                <span>Biến thể</span>
              </button>
            </div>
          </>
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
                    {variants.map((variant: any, index: number) => (
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
                {variants.map((variant: any, index: number) => (
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

export default ProductForm;
