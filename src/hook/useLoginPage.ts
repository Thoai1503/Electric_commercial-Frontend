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
  //const location = useLocation();

  const [loginValue, setLoginValue] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [showError] = useState(false);
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const login = async () => {
    // alert("Path: " + location.pathname);
    const data = await userLoginService(loginValue);
    return data;
  };
  const {
    isPending,
    isError,
    error,
    mutate: loginProcess,
  } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (!data || !data.success) {
        alert("Invalid credentails");
      }
      const { user: userData, accessToken } = data;
      console.log(JSON.parse(JSON.stringify(data)));

      // set authenticated state after successfull login
      dispatch(
        setAuthenState({
          id: userData?.id ?? 0,
          email: userData?.email ?? "",
          name: userData?.name ?? "",
          accessToken: accessToken,
          refreshToken: data.refreshToken,
          role: userData?.role ?? null,
        })
      );

      console.log("Authen state: " + JSON.stringify(authState));
      if (data?.user?.role == 1) {
        setLoginValue({ email: "", password: "" });
        return navigate("/admin");
      }

      setLoginValue({ email: "", password: "" });
      return navigate("/");
    },
    onError: (error) => {
      //   alert("Login error:" + error.message);
      //  setShowError(true);
      window.location.href = "/login?error=" + error.message;
      // setTimeout(() => {
      //   setShowError(false);
      // }, 7000);
    },
  });

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // client-side validation before calling server
    const isValid = validate();
    if (!isValid) return;

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
    // clear field-specific error on change
    setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    console.log(loginValue);
  };
  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    const email = (loginValue.email || "").trim();
    const password = loginValue.password || "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email == "" || email.length === 0) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      errors.email = "Enter a valid email address";
    }

    if (!password || password == "" || password.length === 0) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    const isValid = Object.keys(errors).length === 0;
    return isValid;
  };
  return {
    handleChange,
    loginValue,
    handleSubmit,
    isPending,
    isError,
    error,
    showError,
    formErrors,
    validate,
  };
};
