import { useQuery } from "@tanstack/react-query";
import { provinceQuery } from "../../query/province";

export const useAddAddressModel = () => {
  const { data: provinceList } = useQuery(provinceQuery.list);

  return { provinceList };
};
