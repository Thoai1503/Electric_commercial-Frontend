import React, { useState } from "react";
import type { UserLogin } from "../type/User";
import { userLoginService } from "../service/user";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setAuthenState } from "../reducers/authenReducer";

import type { RootState } from "../store/store";
export const useLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.authen);

  const [loginValue, setLoginValue] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);

  const login = async () => {
    const data = await userLoginService(loginValue);
    return data;
  };
  const {
    isPending,
    isError,
    mutate: loginProcess,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data || !data.success) {
        alert("Invalid credentails");
      }
      const { user: userData } = data;
      console.log(JSON.parse(JSON.stringify(data)));

      // set authenticated state after successfull login
      dispatch(
        setAuthenState({
          id: userData?.id ?? 0,
          email: userData?.email ?? "",
          name: userData?.name ?? "",
          token: data?.token,
          rule: userData?.role ?? null,
        })
      );

      console.log("Authen state: " + authState);
      if (data?.user?.role == 1) {
        setLoginValue({ email: "", password: "" });
        return navigate("/admin");
      }

      setLoginValue({ email: "", password: "" });
      return navigate("/");
    },
    onError: (error) => {
      console.error("Login error:", error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Registering user:", loginValue);
    console.log("Pending: " + isPending);
    loginProcess();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value: input } = e.target;
    console.log("Name :" + name);
    setLoginValue((pre) => ({ ...pre, [name]: input }));
    console.log(loginValue);
  };
  return {
    handleChange,
    loginValue,
    handleSubmit,
    isPending,
    isError,
    showError,
  };
};
