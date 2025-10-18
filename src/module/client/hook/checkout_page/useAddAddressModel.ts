import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { provinceQuery } from "../../query/province";
import { useState } from "react";
import type { District } from "../../../../type/District";
import { getByProvinceId } from "../../service/district";
import { getByDistrictId } from "../../service/ward";
import type { Ward } from "../../../../type/Ward";
import type { UserAddress } from "../../../../type/UserAddress";
import { createNewAddress } from "../../service/useraddress";

export const useAddAddressModel = (
  user_id: number,
  onSuccessCallback: () => void
) => {
  const queryClient = useQueryClient();
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [address, setAddress] = useState<Partial<UserAddress>>({
    full_name: "",
    user_id: user_id,
    phone: "",
    address_detail: "",
    address_type: 1,
    province_id: 0,
    district_id: 0,
    ward_id: 0,
    is_default: false,
  });

  const { data: provinceList } = useQuery(provinceQuery.list);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { value, name } = e.target;
    setAddress((pre) => ({ ...pre, [name]: value }));
  };
  const handleSubmit = () => {
    createAddress(address);
  };

  const { isPending, mutate: createAddress } = useMutation({
    mutationFn: (en: Partial<UserAddress>) => createNewAddress(en),
    onSuccess: (data) => {
      if (data == 1) {
        onSuccessCallback();
        queryClient.invalidateQueries({ queryKey: ["user_address", user_id] });
      }
    },
    onError: (error) => {
      alert(error.message);
    },
  });

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
    handleChange,
    handleSubmit,
    isPending,
    address,
    handleChangeDistrict,
    wards,
  };
};
