import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { userRegisterService } from "../service/user";
import type { UserRegisterData } from "../type/User";

export const useRegister = () => {
  const [submitData, setSubmitData] = useState({
    name: "",
    email: "",
    password: "",
    repeated_password: "",
  });
  const handleChangeRegiter = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log("Name :" + name);
    setSubmitData((pre) => ({ ...pre, [name]: value }));
    console.log(submitData);
  };
  const handleSubmitRegister = () => {
    regiter(submitData);
  };

  const { isPending: isPendingRegister, mutate: regiter } = useMutation({
    mutationFn: (sbdata: UserRegisterData) => userRegisterService(sbdata),
    onSuccess: (data) => console.log(data),
    onError: (data) => alert(data),
  });

  return {
    handleChangeRegiter,
    handleSubmitRegister,
    isPendingRegister,
    submitData,
  };
};
