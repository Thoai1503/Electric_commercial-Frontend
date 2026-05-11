import { useMemo, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  ImagePlus,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

import brandQueries from "../../module/admin/query/brand";
import categoriesTreeQuery from "../../module/admin/query/category";
import type { Brand } from "../../type/Brand";

const ProductForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("Chọn thương hiệu");
  const [selectedCategory, setSelectedCategory] = useState("Chọn danh mục");

  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [description, setDescription] = useState("");

  const { data: brands } = useQuery(brandQueries.list);
  const { data: categories } = useQuery(categoriesTreeQuery.list);

  const tabs = useMemo(
    () => [
      { id: 0, title: "Thông tin chung" },
      { id: 1, title: "Thuộc tính" },
      { id: 2, title: "Biến thể" },
      { id: 3, title: "Ảnh" },
    ],
    [],
  );

  const variants = [
    { sku: "IP15P-8-128-BLACK", ram: "8", storage: "128", color: "Black", price: "25,990" },
    { sku: "IP15P-8-256-SILVER", ram: "8", storage: "256", color: "Silver", price: "28,990" },
  ];

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .trim();

  const nextTab = () => {
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  const prevTab = () => {
    if (activeTab > 0) setActiveTab(activeTab - 1);
  };

  const renderContent = () => {
    if (activeTab === 0) {
      return (
        <>
          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-6">
              <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                Tên sản phẩm
              </label>
              <input
                className="form-control form-control-lg"
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                  setSlug(generateSlug(e.target.value));
                }}
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            <div className="col-12 col-lg-6">
              <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                Slug
              </label>
              <input
                className="form-control form-control-lg"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="slug-san-pham"
              />
            </div>
          </div>

          <div className="row g-4 mb-4">
            <div className="col-12 col-lg-6">
              <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                Thương hiệu
              </label>
              <div className="position-relative">
                <button
                  type="button"
                  className="btn btn-light border w-100 text-start d-flex justify-content-between align-items-center"
                  style={{ minHeight: "48px", color: "#334155" }}
                  onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
                >
                  <span>{selectedBrand}</span>
                  <ChevronDown size={16} />
                </button>
                {brandDropdownOpen && (
                  <div className="position-absolute w-100 mt-1" style={{ zIndex: 1050 }}>
                    <ul className="list-group shadow">
                      {brands?.map((brand: Brand) => (
                        <li key={brand.id} className="list-group-item list-group-item-action">
                          <button
                            type="button"
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

            <div className="col-12 col-lg-6">
              <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
                Danh mục
              </label>
              <div className="position-relative">
                <button
                  type="button"
                  className="btn btn-light border w-100 text-start d-flex justify-content-between align-items-center"
                  style={{ minHeight: "48px", color: "#334155" }}
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                >
                  <span>{selectedCategory}</span>
                  <ChevronDown size={16} />
                </button>
                {categoryDropdownOpen && (
                  <div className="position-absolute w-100 mt-1" style={{ zIndex: 1050 }}>
                    <ul className="list-group shadow">
                      {categories?.map((category) => (
                        <li key={category.id} className="list-group-item list-group-item-action">
                          <button
                            type="button"
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
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
              Mô tả sản phẩm
            </label>
            <div className="border rounded-3 overflow-hidden">
              <Editor
                apiKey="opbl478qvvrtoorhvqc4f7zei61txljv0gkj67k1ogzky57n"
                initialValue="<p>Mô tả chi tiết sản phẩm...</p>"
                init={{
                  height: 420,
                  menubar: true,
                  plugins: "image media link code",
                  toolbar:
                    "undo redo | bold italic | alignleft aligncenter alignright | image media link code",
                }}
                onEditorChange={(v) => setDescription(v)}
              />
            </div>
            <div className="small text-muted mt-2">
              Nội dung hiện tại: {description ? "Đã nhập" : "Chưa nhập"}
            </div>
          </div>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-primary d-flex align-items-center gap-2 px-4 fw-semibold" onClick={nextTab}>
              <span>Tiếp tục</span>
              <ArrowRight size={16} />
              <span>Thuộc tính</span>
            </button>
          </div>
        </>
      );
    }

    if (activeTab === 1) {
      return (
        <>
          <div className="d-flex align-items-center gap-2 text-dark fw-bold mb-3">
            <SlidersHorizontal size={18} className="text-primary" />
            Thuộc tính sản phẩm
          </div>
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4 text-muted">Màn hình, chip, pin... (khu vực cấu hình thuộc tính)</div>
          </div>
          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={prevTab}>
              <ArrowLeft size={16} className="me-1" /> Quay lại
            </button>
            <button type="button" className="btn btn-primary d-flex align-items-center gap-2 px-4 fw-semibold" onClick={nextTab}>
              <span>Tiếp tục</span>
              <ArrowRight size={16} />
              <span>Biến thể</span>
            </button>
          </div>
        </>
      );
    }

    if (activeTab === 2) {
      return (
        <>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div className="d-flex align-items-center gap-2 text-dark fw-bold">
              <Boxes size={18} className="text-primary" />
              Danh sách biến thể
            </div>
            <button className="btn btn-sm btn-primary d-inline-flex align-items-center gap-1">
              <Plus size={14} /> Thêm biến thể
            </button>
          </div>

          <div className="table-responsive rounded-4 overflow-hidden mb-4" style={{ border: "1px solid #e2e8f0" }}>
            <table className="table align-middle mb-0 bg-white">
              <thead style={{ background: "#111827" }}>
                <tr>
                  <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>SKU</th>
                  <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>RAM</th>
                  <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Storage</th>
                  <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Color</th>
                  <th className="border-0 px-4 py-3 small text-uppercase fw-semibold" style={{ color: "#94a3b8" }}>Price</th>
                </tr>
              </thead>
              <tbody>
                {variants.map((variant) => (
                  <tr key={variant.sku}>
                    <td className="px-4 py-3">{variant.sku}</td>
                    <td className="px-4 py-3">{variant.ram} GB</td>
                    <td className="px-4 py-3">{variant.storage} GB</td>
                    <td className="px-4 py-3">{variant.color}</td>
                    <td className="px-4 py-3">{variant.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={prevTab}>
              <ArrowLeft size={16} className="me-1" /> Quay lại
            </button>
            <button type="button" className="btn btn-primary d-flex align-items-center gap-2 px-4 fw-semibold" onClick={nextTab}>
              <span>Tiếp tục</span>
              <ArrowRight size={16} />
              <span>Ảnh</span>
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="d-flex align-items-center gap-2 text-dark fw-bold mb-3">
          <ImagePlus size={18} className="text-primary" />
          Hình ảnh sản phẩm
        </div>
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            <div className="rounded-4 border p-4 text-center" style={{ background: "#f8fafc", borderColor: "#e2e8f0" }}>
              <button className="btn btn-outline-primary d-inline-flex align-items-center gap-2">
                <ImagePlus size={16} /> Upload ảnh
              </button>
              <p className="text-muted mt-2 mb-0">Kéo thả để sắp xếp thứ tự hiển thị ảnh</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-outline-secondary d-flex align-items-center" onClick={prevTab}>
            <ArrowLeft size={16} className="me-1" /> Quay lại
          </button>
          <button type="button" className="btn btn-primary d-flex align-items-center gap-2 px-4 fw-semibold">
            <Check size={16} /> Lưu sản phẩm
          </button>
        </div>
      </>
    );
  };

  return (
    <div className="col-12 px-0">
      <div className="mt-4 mb-5">
        <div
          className="card border-0 shadow mb-4"
          style={{ background: "linear-gradient(135deg, #111827 0%, #1e293b 100%)" }}
        >
          <div className="card-body p-4 p-lg-5">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-4 align-items-lg-center">
              <div>
                <div
                  className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill border border-primary text-primary small fw-semibold"
                  style={{ background: "rgba(13,110,253,0.15)" }}
                >
                  <Boxes size={16} />
                  Khởi tạo sản phẩm
                </div>
                <h2 className="mt-3 mb-2 fw-bold text-white">Thêm sản phẩm mới</h2>
                <p className="mb-0" style={{ color: "#94a3b8", maxWidth: 700 }}>
                  Luồng biểu mẫu 4 bước theo phong cách quản trị thống nhất.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="p-3 p-md-4 border-bottom">
              <div className="d-flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={`btn btn-sm rounded-pill px-3 d-inline-flex align-items-center gap-2 ${
                      activeTab === tab.id
                        ? "btn-primary"
                        : "btn-light border border-primary-subtle text-primary"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
