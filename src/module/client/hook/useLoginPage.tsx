import React, { useState } from "react";
import type { UserLogin } from "../../../type/User";
import { userLoginService } from "../../../service/user";
import { useNavigate, useLocation } from "react-router-dom";
export const useLoginPage = () => {
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const data = await userLoginService(loginValue);
      console.log("Data :" + JSON.stringify(data));
      console.log("Token :" + data?.token);
      if (!data || !data.success) {
        alert("Invalid credentails");
      }
      if (data?.user?.role == 1) {
        setLoginValue({ email: "", password: "" });
        return navigate("/admin");
      }

      setLoginValue({ email: "", password: "" });
      return navigate("/");
    } catch (error: any) {
      alert("Invalid credentails");
      console.log("Error: " + error.message);
    }
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
  };
};
