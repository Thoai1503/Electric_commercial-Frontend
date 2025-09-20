import React, { useCallback, useState } from "react";
import type { Category } from "../../../../type/Category";
import { addCategoryService } from "../../service/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCategoryPage = () => {
  const queryClient = useQueryClient();

  const [cate, setCate] = useState<Partial<Category>>({
    id: 0,
    name: "",
    parent_id: 0,
  });
  const [toggleSection, setToggleSection] = useState(true);

  const {
    isPending: isP,
    isSuccess,
    mutate: addNew,
  } = useMutation<Partial<Category>, Error, Partial<Category>>({
    mutationFn: (cate: Partial<Category>) => addCategoryService(cate),
    onSuccess: (newCategory: Partial<Category>) => {
      console.log("Success:" + JSON.stringify(newCategory));
      alert("Thêm mục " + newCategory.name + " thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log("Lỗi :" + error.message);
    },
  });

  const handleSubmit = () => {
    if (cate.name == "") {
      alert("Vui lòng nhập tên thư mục");
      setCate({ id: 0, name: "", parent_id: 0 });
      return;
    }
    console.log("Submited");
    setCate({ id: 0, name: "", parent_id: 0 });
    addNew(cate);
  };

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.preventDefault();
      const { name, value } = e.target;

      setCate((pre) => ({ ...pre, [name]: value }));
      console.log("Input result:" + cate.name);
      console.log("Cate :" + JSON.stringify(cate));
    },
    [cate]
  );
  return {
    handleChange,
    handleSubmit,
    setCate,
    setToggleSection,
    isP,
    isSuccess,
    cate,
    toggleSection,
  };
};
