import React, { useState } from "react";
import type { Category } from "../../../type/Category";
import { addCategoryService } from "../service/category";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export const useCategoryPage = () => {
  const queryClient = useQueryClient();

  const [cate, setCate] = useState<Category>({
    id: 0,
    name: "",
    parent_id: 0,
  });

  const {
    isPending: isP,
    isSuccess,
    mutate: addNew,
  } = useMutation<Category, Error, Category>({
    mutationFn: (cate: Category) => addCategoryService(cate),
    onSuccess: (newCategory: Category) => {
      console.log("Success:" + JSON.stringify(newCategory));
      alert("Thêm mục " + newCategory.name + " thành công");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.log("Lỗi :" + error.message);
    },
  });

  console.log("pending: " + isP);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;

    setCate((pre) => ({ ...pre, [name]: value }));
    console.log("Input result:" + cate.name);
    console.log("Cate :" + JSON.stringify(cate));
  };
  return {
    handleChange,
    handleSubmit,
    setCate,
    isP,
    isSuccess,
    cate,
  };
};
