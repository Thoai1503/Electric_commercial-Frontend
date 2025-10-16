import { useQuery } from "@tanstack/react-query";
import { provinceQuery } from "../../query/province";
import { useState } from "react";
import type { District } from "../../../../type/District";
import { getByProvinceId } from "../../service/district";

export const useAddAddressModel = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const { data: provinceList } = useQuery(provinceQuery.list);

  const handleChangeProvince = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = e.target;
    setDistricts(await getByProvinceId(parseInt(value)));
  };

  return { provinceList, handleChangeProvince, districts };
};
