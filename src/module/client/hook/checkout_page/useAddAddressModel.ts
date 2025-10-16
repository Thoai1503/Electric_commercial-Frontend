import { useQuery } from "@tanstack/react-query";
import { provinceQuery } from "../../query/province";
import { useState } from "react";
import type { District } from "../../../../type/District";
import { getByProvinceId } from "../../service/district";
import { getByDistrictId } from "../../service/ward";
import type { Ward } from "../../../../type/Ward";

export const useAddAddressModel = () => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const { data: provinceList } = useQuery(provinceQuery.list);

  const handleChangeProvince = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = e.target;
    setDistricts(await getByProvinceId(parseInt(value)));
  };
  const handleChangeDistrict = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value } = e.target;
    setWards(await getByDistrictId(parseInt(value)));
  };

  return {
    provinceList,
    handleChangeProvince,
    districts,
    handleChangeDistrict,
    wards,
  };
};
