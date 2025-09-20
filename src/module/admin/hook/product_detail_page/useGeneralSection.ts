import { useQuery } from "@tanstack/react-query";
import type { Product } from "../../../../type/Product";
import brandQueries from "../../query/brand";
import categoriesTreeQuery from "../../query/category";
import { useEffect, useRef, useState } from "react";

export const useGeneralSection = (
  data: Product | undefined,
  nextTab: () => void
) => {
  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("iphone-15-pro");
  const [content, setContent] = useState("");
  const [selectedBrand, setSelectedBrand] = useState({
    name: data?.brand.name.toString(),
    id: data?.brand.id,
  });
  const [selectedCategory, setSelectedCategory] = useState({
    name: data?.category.name.toString(),
    id: data?.category.id,
  });
  const editorRef = useRef(null) as any;
  const { data: brands } = useQuery(brandQueries.list);
  const { data: categories } = useQuery(categoriesTreeQuery.list);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);

  useEffect(() => {
    setSelectedBrand({
      name: data?.brand.name.toString(),
      id: data?.brand.id,
    });
    setSelectedCategory({
      name: data?.category.name.toString(),
      id: data?.category.id,
    });
  }, [data]);

  const handleProductNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const generateSlug = (name: any) => {
      return name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .trim();
    };

    const name = e.target.value;
    setProductName(name);
    if (name) {
      setSlug(generateSlug(name));
    }
  };

  const logContent = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  return {
    handleProductNameChange,
    logContent,
    data,
    brandDropdownOpen,
    categoryDropdownOpen,
    brands,
    categories,
    editorRef,
    selectedBrand,
    selectedCategory,
    productName,
    slug,
    content,
    setProductName,
    setSlug,
    setContent,
    setSelectedBrand,
    setSelectedCategory,
    setBrandDropdownOpen,
    setCategoryDropdownOpen,
    nextTab,
  };
};
