import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVariantAttributeList } from "../../service/variantAttribute";
import type { VariantAttribute } from "../../../../type/VariantAttribute";
import { deleteProductVariant } from "../../service/productVariant";

export const useVariantAttributeMutation = () => {
  const queryClient = useQueryClient();
  const { isPending, mutate: update } = useMutation({
    mutationFn: (list: VariantAttribute[]) => updateVariantAttributeList(list),
    onSuccess: (data) => {
      if (!data) alert("Cập nhật chưa thành công");
      alert("Cập nhật thành công");
    },
    onError: (error) => {
      alert("Lỗi: " + error.message);
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
        queryKey: [],
      });
    },
    onError: (er) => {
      alert("Error: " + er.message);
    },
  });

  return { isPending, update, handleDelete, isPendingDelete };
};
