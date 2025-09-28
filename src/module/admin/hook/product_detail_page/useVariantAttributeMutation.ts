import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVariantAttributeList } from "../../service/variantAttribute";
import type { VariantAttribute } from "../../../../type/VariantAttribute";
import {
  deleteProductVariant,
  updateProductVariant,
} from "../../service/productVariant";
import { useState } from "react";
import type { ProductVariant } from "../../../../type/productVariant";
import productVariantQuery from "../../query/productVariant";

export const useVariantAttributeMutation = (variant_id: number) => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const { isPending, mutate: update } = useMutation({
    mutationFn: (list: VariantAttribute[]) => updateVariantAttributeList(list),
    onSuccess: (data) => {
      if (!data) alert("Cập nhật chưa thành công");
      alert("Cập nhật thành công");
      setIsEdit(!isEdit);
      queryClient.invalidateQueries({
        queryKey: [
          productVariantQuery.detail_by_product_id(variant_id).queryKey,
        ],
      });
    },
    onError: (error) => {
      alert("Lỗi cập nhật Attri: " + error.message);
    },
  });

  const handleDelete = (id: number) => {
    deleteVariant(id);
  };

  const { isPending: isPendingDelete, mutate: deleteVariant } = useMutation({
    mutationFn: (id: number) => deleteProductVariant(id),
    onSuccess: (data) => {
      console.log(data);
      alert("Xoá biến thể thành công");
      queryClient.invalidateQueries({
        queryKey: [
          productVariantQuery.detail_by_product_id(variant_id).queryKey,
        ],
      });
    },
    onError: (er) => {
      alert("Error: " + er.message);
    },
  });

  const { mutate: updateVariant } = useMutation({
    mutationFn: (en: Partial<ProductVariant>) => updateProductVariant(en),
    onSuccess: (data) => {
      if (!data) alert("Cập nhật không thành công");
      queryClient.invalidateQueries();
    },
    onError: (error) => alert("Lỗi: " + error.message),
  });

  return {
    isPending,
    update,
    handleDelete,
    isPendingDelete,
    isEdit,
    setIsEdit,
    updateVariant,
  };
};
