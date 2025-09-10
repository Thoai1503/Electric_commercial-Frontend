import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCategoryAttributeService } from "../service/categoryAttribute";
import type { CategoryAttribute } from "../../../type/CategoryAttribute";
import { useCallback } from "react";

export const useCategoryAttributeMutation = (
  categoryAttribute: CategoryAttribute[]
) => {
  const queryClient = useQueryClient();

  const handleChangeMutation = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const { name, checked } = e.target;
      const item = categoryAttribute?.find(
        (attr: CategoryAttribute) => attr.id === id
      );
      if (!item) {
        console.error("Attribute item not found for id:", id);
        return;
      }
      const updatedAttr: CategoryAttribute = {
        ...item,
        [name]: !!checked, // ensure boolean
      };
      updateCategoryAttribute({ id, en: updatedAttr });
    },
    [categoryAttribute]
  );

  const update = async ({ id, en }: { id: number; en: CategoryAttribute }) => {
    return await updateCategoryAttributeService(id, en);
  };

  const { isPending, mutate: updateCategoryAttribute } = useMutation({
    mutationFn: update,
    onSuccess: (data) => {
      console.log("Update successfully" + JSON.stringify(data));

      queryClient.invalidateQueries({ queryKey: ["category-attributes"] });
      alert("Update successfully" + JSON.stringify(data));
    },
    onError: (err: unknown) => alert("Error: " + err),
  });

  return { isPending, handleChangeMutation };
};
