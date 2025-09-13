import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategoryAttributeService,
  updateCategoryAttributeService,
} from "../../service/categoryAttribute";
import type { CategoryAttribute } from "../../../../type/CategoryAttribute";
import { useCallback, useState } from "react";

export const useCategoryAttributeMutation = (
  categoryAttribute: CategoryAttribute[]
) => {
  const queryClient = useQueryClient();

  const [id, setId] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (id = 0) => {
    setShow(true);
    setId(id);
  };

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

  const deleting = async (id: number) => {
    // alert(id);
    return await deleteCategoryAttributeService(id);
  };

  const { isPending: isPendingUpdate, mutate: updateCategoryAttribute } =
    useMutation({
      mutationFn: update,
      onSuccess: (data) => {
        alert("Update successfully" + JSON.stringify(data));

        queryClient.invalidateQueries({ queryKey: ["category-attributes"] });
        alert("Update successfully" + JSON.stringify(data));
      },
      onError: (err: unknown) => alert("Error: " + err),
    });

  const { isPending: isPendingDelete, mutate: deleteCategoryAttribute } =
    useMutation({
      mutationFn: deleting,
      onSuccess: (data) => {
        alert("Delete successfully: " + JSON.stringify(data));
        queryClient.invalidateQueries({ queryKey: ["category-attributes"] });
        queryClient.invalidateQueries({
          queryKey: ["selected-by-category", id],
        });
      },
      onError: (err: unknown) => alert("Lỗi khi xoá: " + err),
    });

  const { isPending, mutate } = useMutation({
    mutationFn: (): Promise<boolean> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const success = Math.random() > 0.5; // 50% chance
          if (success) {
            console.log("✅ Success case");
            resolve(true);
          } else {
            console.log("❌ Error case");
            reject(new Error("Something went wrong!"));
          }
        }, 900);
      });
    },
    onSuccess: () => {
      console.log("Mutation success!");
    },
    onError: (err: unknown) => alert("Error: " + err),
  });

  return {
    isPendingUpdate,
    handleChangeMutation,
    id,
    show,
    handleClose,
    handleShow,
    isPendingDelete,

    deleteCategoryAttribute,
    isPending,
    mutate,
  };
};
