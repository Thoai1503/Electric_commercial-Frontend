// ...existing code...
import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../../service/category";
import type { UpdatedCategory } from "../../../../type/Category";
// ...existing imports...

export const useCategoryMutation = (
  id: number,
  cate: UpdatedCategory | null,
  onSuccessCallback: () => void
) => {
  const update = useCallback(async () => {
    return await updateCategory(id, cate);
  }, [id, cate]);

  const { isPending, mutate: updateProcess } = useMutation({
    mutationFn: update,
    onSuccess: onSuccessCallback,
    onError: (err: unknown) => alert("Error: " + err),
  });

  return { isPending, updateProcess };
};
// ...existing code...
