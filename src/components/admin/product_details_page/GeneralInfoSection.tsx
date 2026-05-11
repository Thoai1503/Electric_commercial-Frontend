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
    selectedBrand,
    selectedCategory,
    handleProductNameChange,
    setContent,
    setSelectedBrand,
    setSelectedCategory,
    setBrandDropdownOpen,
    setCategoryDropdownOpen,
  } = useProductDetailPage(id);

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
            value={data?.name}
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
            initialValue="<p>Soan thao voi upload anh...</p>"
            init={{
              height: 460,
              menubar: true,
              plugins: "image media link code",
              toolbar:
                "undo redo | bold italic | alignleft aligncenter alignright | image media link code",
              images_upload_url: "http://localhost:5000/upload",
              images_upload_handler: async (
                blobInfo: any,
                success: any,
                failure: any,
              ) => {
                try {
                  const formData = new FormData();
                  formData.append("file", blobInfo.blob(), blobInfo.filename());

                  const response = await fetch("http://localhost:5000/upload", {
                    method: "POST",
                    body: formData,
                  });

                  const json = await response.json();
                  const imageUrl = json.url;

                  success(imageUrl);
                  editorRef.current?.insertContent(
                    `<img src="${imageUrl}" alt="${blobInfo.filename()}" />`,
                  );
                } catch (err: any) {
                  failure("Upload that bai: " + err.message);
                }
              },
            }}
            onEditorChange={(newContent) => setContent(newContent)}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end">
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
