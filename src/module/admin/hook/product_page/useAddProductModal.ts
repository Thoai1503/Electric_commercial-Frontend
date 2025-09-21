import { useMutation, useQuery } from "@tanstack/react-query";
import brandQueries from "../../query/brand";
import categoriesTreeQuery from "../../query/category";
import { useState } from "react";
import type { Product } from "../../../../type/Product";

import { createProduct } from "../../service/product";

export const useAddProductModal = () => {
  const { data: brands } = useQuery(brandQueries.list);
  const { data: categories } = useQuery(categoriesTreeQuery.list);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    brand_id: 0,
    category_id: 0,
  });
  const [visible, setVisible] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log("data: " + JSON.stringify(formData));
    // Tự động tạo slug từ tên sản phẩm
    if (name === "name") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      setFormData((prev) => ({
        ...prev,
        slug: slug,
      }));
    }
  };

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!validTypes.includes(file.type)) {
        alert("Vui lòng chọn file ảnh hợp lệ (JPEG, JPG, PNG, GIF, WEBP)");
        e.target.value = "";
        return;
      }

      // Validate file size (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("Kích thước file không được vượt quá 5MB");
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleClose = () => {
    setVisible(false);
    setFormData({
      name: "",

      brand_id: 0,
      category_id: 0,
    });
    setImagePreview("");
  };
  const removeImage = () => {
    setFormData((prev) => ({
      ...prev,
    }));
    setImagePreview("");
    // Clear file input
    const fileInput = document.getElementById("image") as any;
    if (fileInput) fileInput.value = "";
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Validate form
    if (!formData.name?.trim()) {
      alert("Vui lòng nhập tên sản phẩm");
      return;
    }

    if (!formData.brand_id) {
      alert("Vui lòng chọn thương hiệu");
      return;
    }

    if (!formData.category_id) {
      alert("Vui lòng chọn danh mục");
      return;
    }

    // Xử lý lưu dữ liệu ở đây
    console.log("Form data:", formData);
    create(formData);

    // Đóng modal và reset form

    // alert("Thêm sản phẩm thành công!");
  };

  const { isPending, mutate: create } = useMutation({
    mutationFn: (product: Partial<Product>) => createProduct(product),
    onSuccess: (data) => {
      alert(data);
      setVisible(false);
      setFormData({
        name: "",

        brand_id: 0,
        category_id: 0,
      });
      setImagePreview("");
    },
    onError: (error) => {
      alert("Lỗi: " + error);
    },
  });

  return {
    brands,
    categories,
    removeImage,
    handleInputChange,
    handleImageChange,
    handleClose,
    handleSubmit,
    setVisible,
    visible,
    imagePreview,
    formData,
    isPending,
  };
};
