import { useMutation } from "@tanstack/react-query";
import { updateVariantAttributeList } from "../../service/variantAttribute";
import type { VariantAttribute } from "../../../../type/VariantAttribute";

export const useVariantAttributeMutation = () => {
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
  return { isPending, update };
};
