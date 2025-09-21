import { ArrowRight, ChevronDown } from "lucide-react";

import type { Brand } from "../../../type/Brand";

import { Editor } from "@tinymce/tinymce-react";

import { useProductDetailPage } from "../../../module/admin/hook/product_detail_page";
import { useEffect } from "react";
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

    content,
    handleProductNameChange,
    logContent,

    setContent,
    setSelectedBrand,
    setSelectedCategory,
    setBrandDropdownOpen,
    setCategoryDropdownOpen,
  } = useProductDetailPage(id);

  useEffect(() => {
    console.log("Content: " + content);
  }, [content]);

  return (
    <>
      {/* Product Name */}
      <div className="row mb-4 align-items-center">
        <div className="col-2">
          <label className="form-label mb-0 fw-normal">Tên sản phẩm:</label>
        </div>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            value={data?.name}
            onChange={handleProductNameChange}
            placeholder=""
          />
        </div>
      </div>

      {/* Slug */}

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
                      className="list-group-item list-group-item-action border-0"
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
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                style={{ backgroundColor: "white", color: "#6c757d" }}
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
                        className="list-group-item list-group-item-action border-0"
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
            </div>
            <span className="ms-2 text-muted small">(tree select)</span>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="row mb-4">
        <div className="col-2">
          <label className="form-label mb-0 fw-normal">Mô tả sản phẩm:</label>
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
                    // giả sử backend trả về { url: "http://localhost:5000/uploads/abc.png" }
                    const imageUrl = json.url;

                    // TinyMCE yêu cầu success(URL string)
                    success(imageUrl);

                    // Nếu muốn tự động chèn vào content luôn:
                    editorRef.current?.insertContent(
                      `<img src="${imageUrl}" alt="${blobInfo.filename()}" />`
                    );
                  } catch (err: any) {
                    failure("Upload thất bại: " + err.message);
                  }
                },
              }}
              onEditorChange={(newContent) => setContent(newContent)}
            />

            <button onClick={() => logContent()}>Lấy nội dung</button>
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
};
export default GeneralInfoSection;
