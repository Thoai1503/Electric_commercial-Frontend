import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import productImageQuery from "../../query/productImage";
import { useState } from "react";
import { deleteImage } from "../../service/productImage";

export const useAddImageModals = (
  product_id: number,
  variant_id: number,
  setVisible: React.Dispatch<React.SetStateAction<boolean>>,
  onSuccessCallback: () => void
) => {
  const queryClient = useQueryClient();
  const { data: images, isPending } = useQuery(
    productImageQuery.get_by_variant_id(variant_id)
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleDelete = (id: number) => {
    deletingImage(id);
  };

  const { mutate: deletingImage } = useMutation({
    mutationFn: (id: number) => deleteImage(id),
    onSuccess: (data) => {
      if (!data) {
        alert("Xoá ảnh không thành công");
        return;
      }
      queryClient.invalidateQueries({
        queryKey: productImageQuery.get_by_variant_id(variant_id).queryKey,
      });
      onSuccessCallback();
    },
    onError: (error) => {
      alert("Lỗi khi xoá ảnh:" + error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // lưu file để submit
      setSelectedFiles((prev) => [...prev, ...files]);

      // tạo preview
      const filesArray = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ảnh!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("product_id", String(product_id));
    formData.append("variant_id", String(variant_id));
    try {
      const response = await fetch(
        `/api/catalog/productimage/variant/${variant_id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("✅ Upload thành công:", result);

      // reset
      setSelectedFiles([]);
      setSelectedImages([]);
      setVisible(false);
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload thất bại!");
    }
  };

  return {
    images,
    isPending,
    handleFileChange,
    handleSubmit,
    selectedImages,
    handleDelete,
  };
};
