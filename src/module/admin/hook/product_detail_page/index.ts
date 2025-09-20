import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import productQuery from "../../query/product";
import { useGeneralSection } from "./useGeneralSection";

export const useProductDetailPage = (productId: number) => {
  const [activeTab, setActiveTab] = useState(0);
  const {
    data: product,
    isPending,
    isError,
  } = useQuery(productQuery.detail(productId));
  if (!isPending) {
    console.log("Product detail: " + JSON.stringify(product));
  }
  const nextTab = () => {
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const prevTab = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  const {
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
  } = useGeneralSection(product, nextTab);

  const tabs = [
    { id: 0, title: "Thông tin chung" },
    { id: 1, title: "Thuộc tính" },
    { id: 2, title: "Biến thể" },
    { id: 3, title: "Ảnh" },
  ];

  const [attributes, setAttributes] = useState({
    screen: "6.1",
    chip: "Apple A17 Pro",
    battery: "3274",
  });

  return {
    nextTab,
    prevTab,
    activeTab,
    setActiveTab,
    attributes,
    setAttributes,
    product,
    isPending,
    isError,
    tabs,
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
    handleProductNameChange,
    logContent,
  };
};
