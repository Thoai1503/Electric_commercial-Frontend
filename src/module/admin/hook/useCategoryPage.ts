import React, { useState } from "react";
import type { Category } from "../../../type/Category";

export const userCategoryPage = () => {
  const [cate, setCate] = useState<Category>({
    name: "",
    parent_id: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCate((pre) => ({ ...pre, [name]: value }));
  };
  return {
    handleChange,
    cate,
  };
};
