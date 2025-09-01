import { useMutation } from "@tanstack/react-query";
import type { UpdatedCategory } from "../../../type/Category";
import { updateCategory } from "../service/category";

export const useCategoryMutation = (
  id: number,
  cate: UpdatedCategory | null,
  onSuccessCallback: () => void
) => {
  const update = async () => {
    return await updateCategory(id, cate);
  };

  const { isPending, mutate: updateProcess } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: () => {
      alert("Error");
    },
  });
  return {
    isPending,
    updateProcess,
  };
};
