import {
  ArrowRight,
  ChevronDown,
  FileText,
  FolderTree,
  Tag,
} from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";

import { useProductDetailPage } from "../../../module/admin/hook/product_detail_page";
import type { Brand } from "../../../type/Brand";
import { useEffect, useState } from "react";

interface Prop {
  id: number;
}

const GeneralInfoSection = ({ id }: Prop) => {
  const {
    nextTab,
    editorRef,
    brandDropdownOpen,
    categoryDropdownOpen,
    brands,
    categories,
    data,
    productName,
    selectedBrand,
    selectedCategory,
    handleProductNameChange,
    setContent,
    setSelectedBrand,
    setSelectedCategory,
    setBrandDropdownOpen,
    setCategoryDropdownOpen,
  } = useProductDetailPage(id);

  const [initialContent, setInitialContent] = useState("<p>Loading...</p>");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/product/${id}/content`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }

        const result = await response.json();
        setInitialContent(result.html || "<p>No content available</p>");
      } catch (error: any) {
        alert(error?.message || "Unable to load content");
        setInitialContent("<p>Error loading content</p>");
      }
    };

    fetchContent();
  }, [id]);

  const handleTemporarySave = async () => {
    try {
      const htmlContent = editorRef.current?.getContent?.() ?? "";
      const name = productName?.trim() || data?.name || "";

      if (!name) {
        throw new Error("Product name is required");
      }

      if (!selectedBrand.id || !selectedCategory.id) {
        throw new Error("Brand and category are required");
      }

      const token = localStorage.getItem("accessToken") || "";
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const [contentResponse, productResponse] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}/content`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            html: htmlContent,
            locale: "vi",
            change_note: "Save from admin editor",
          }),
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`, {
          method: "POST",
          headers,
          body: JSON.stringify({
            name,
            brand_id: selectedBrand.id,
            category_id: selectedCategory.id,
          }),
        }),
      ]).catch((error) => {
        throw new Error(
          "Failed to save content or update product: " + error.message,
        );
      });

      if (!contentResponse.ok || !productResponse.ok) {
        const messages: string[] = [];
        if (!contentResponse.ok) {
          messages.push("Failed to save content");
        }
        if (!productResponse.ok) {
          messages.push("Failed to update product");
        }
        throw new Error(messages.join(". "));
      }

      const result = await contentResponse.json();
      if (!result.is_new_version_created) {
        alert(
          "Saved product info. Content is unchanged from published version, so no new content version was created.",
        );
        return;
      }

      alert(
        `Saved successfully. Content version: ${result.version_number}, Draft ID: ${result.draft_version_id}`,
      );
    } catch (error: any) {
      alert(error?.message || "Unable to save content");
    }
  };

  return (
    <>
      <div className="d-flex align-items-center gap-2 text-dark fw-bold mb-3">
        <FileText size={18} className="text-primary" />
        Thong tin co ban
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12">
          <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
            Ten san pham
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={productName || data?.name || ""}
            onChange={handleProductNameChange}
            placeholder="Nhap ten san pham"
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-lg-6">
          <label className="form-label text-muted small fw-semibold text-uppercase mb-2 d-flex align-items-center gap-2">
            <Tag size={14} className="text-primary" />
            Thuong hieu
          </label>
          <div className="position-relative">
            <button
              className="btn btn-light border w-100 text-start d-flex justify-content-between align-items-center"
              type="button"
              onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
              style={{ minHeight: "48px", color: "#334155" }}
            >
              <span>{selectedBrand.name}</span>
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
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                    >
                      <button
                        className="btn btn-link text-decoration-none p-0 w-100 text-start text-dark"
                        onClick={() => {
                          setSelectedBrand({ id: brand.id, name: brand.name });
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
          <label className="form-label text-muted small fw-semibold text-uppercase mb-2 d-flex align-items-center gap-2">
            <FolderTree size={14} className="text-primary" />
            Danh muc
          </label>
          <div className="position-relative flex-grow-1">
            <button
              className="btn btn-light border w-100 text-start d-flex justify-content-between align-items-center"
              type="button"
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              style={{ minHeight: "48px", color: "#334155" }}
            >
              <span>{selectedCategory.name}</span>
              <ChevronDown size={16} />
            </button>
            {categoryDropdownOpen && (
              <div
                className="position-absolute w-100 mt-1"
                style={{ zIndex: 1050 }}
              >
                <ul className="list-group shadow">
                  {categories?.map((category: any) => (
                    <li
                      key={category.id}
                      className="list-group-item list-group-item-action"
                      style={{ cursor: "pointer" }}
                    >
                      <button
                        className="btn btn-link text-decoration-none p-0 w-100 text-start text-dark"
                        onClick={() => {
                          setSelectedCategory({
                            id: category.id,
                            name: category.text,
                          });
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
            <small className="text-muted mt-2 d-inline-block">
              Du lieu lay tu cay danh muc hien co.
            </small>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="form-label text-muted small fw-semibold text-uppercase mb-2">
          Mo ta san pham
        </label>
        <div className="border rounded-3 overflow-hidden">
          <Editor
            apiKey="opbl478qvvrtoorhvqc4f7zei61txljv0gkj67k1ogzky57n"
            initialValue={initialContent}
            onInit={(_evt, editor) => {
              editorRef.current = editor;
            }}
            init={{
              height: 460,
              menubar: true,
              plugins: "image media link code",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | image media link code",
              images_upload_url: `http://localhost:3000/api/product/${id}/content/upload`,
              images_upload_handler: async (blobInfo: any) => {
                const formData = new FormData();
                formData.append("file", blobInfo.blob(), blobInfo.filename());

                const response = await fetch(
                  `${import.meta.env.VITE_API_URL}/api/product/${id}/content/upload`,
                  { method: "POST", body: formData },
                );

                if (!response.ok) throw new Error("Upload failed");

                const json = await response.json();
                return json.url;
              },
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-outline-primary px-4 fw-semibold"
          onClick={handleTemporarySave}
        >
          Luu
        </button>
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2 px-4 fw-semibold"
          onClick={nextTab}
        >
          <span>Tiep tuc</span>
          <ArrowRight size={16} />
          <span>Thuoc tinh</span>
        </button>
      </div>
    </>
  );
};

export default GeneralInfoSection;
