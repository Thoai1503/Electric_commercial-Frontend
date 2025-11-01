import { useQuery } from "@tanstack/react-query";
import { orderQuery } from "../../query/order";
import { useState } from "react";

export const useOrderPage = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { data: orderList } = useQuery(orderQuery.list(query, page));
  const handleSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(name, value);
    setPage(1);
    setQuery(value);
  };
  const changePage = (newPage: number) => {
    setPage(newPage);
  };
  return {
    orderList,
    handleSearch,
    changePage,
    page,
  };
};
