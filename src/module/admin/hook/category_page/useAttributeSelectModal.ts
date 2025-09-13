import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { createAttributeForCategory } from "../../service/categoryAttribute";

export const useAttributeSelectModal = (
  category_id: number,
  onSuccessCallback: () => void
) => {
  const [selectedList, setSelectedList] = useState<number[]>([]);
  console.log(category_id);
  const queryClient = useQueryClient();
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      const { checked } = e.target;

      setSelectedList((prevList) => {
        if (checked) {
          // Add to list if not already present (prevent duplicates)
          return prevList.includes(id) ? prevList : [...prevList, id];
        } else {
          // Remove from list
          return prevList.filter((item) => item !== id);
        }
      });
    },
    []
  );
  const handleSubmit = useCallback(() => {
    if (selectedList.length == 0) {
      alert("Vui lòng chọn thuộc tính :");
      return;
    }
    create({ id: category_id, idList: selectedList });
  }, [selectedList]);

  const { isPending: isPendingCreate, mutate: create } = useMutation({
    mutationFn: ({ id, idList }: { id: number; idList: number[] }) =>
      createAttributeForCategory(id, idList),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["category-attributes"] });
      queryClient.invalidateQueries({
        queryKey: ["selected-by-category", category_id],
      });
      onSuccessCallback();
      alert(data ?? "Thêm thuộc tính thành công !");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  console.log("Number list: " + JSON.stringify(selectedList));
  return { setSelectedList, handleChange, handleSubmit, isPendingCreate };
};
