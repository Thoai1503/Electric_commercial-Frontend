import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { userRegisterService } from "../service/user";
import type { UserRegisterData } from "../type/User";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addManyToUserCart } from "../module/client/service/cart";
import { setAuthenState } from "../reducers/authenReducer";
import type { Cart } from "../type/Cart";

export const useRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const handleSubmitRegister = (e: any) => {
    e.preventDefault();
    regiter(submitData);
  };

  const { isPending: isPendingRegister, mutate: regiter } = useMutation({
    mutationFn: (sbdata: UserRegisterData) => userRegisterService(sbdata),
    onSuccess: async (data) => {
      dispatch(
        setAuthenState({
          id: data.user?.id || 0,
          email: data.user?.email || "",
          name: data.user?.name || "",
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          role: data.user?.role || null,
        })
      );
      let cart = localStorage.getItem("cart") as string | null;

      if (cart != null) {
        const parseCart: Cart[] = JSON.parse(cart);

        await addManyToUserCart(data.user?.id || 0, parseCart);

        localStorage.removeItem("cart");
      }

      navigate("/", { replace: true });
    },
    onError: (data) => alert(data),
  });

  return {
    handleChangeRegiter,
    handleSubmitRegister,
    isPendingRegister,
    submitData,
  };
};
