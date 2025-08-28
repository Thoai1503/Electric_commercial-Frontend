import { Request } from "../api/http";
import type { UserDataRespone, UserLogin, UserRespone } from "../type/User";

export const userLoginService = async (loginState: UserLogin) => {
  try {
    const { data } = await Request.post<UserRespone>(
      "/api/v1/auth/login",
      loginState
    );

    if (!data.success) {
      return alert("Invalid credentials");
    }
    console.log("User:" + JSON.stringify(data));
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Details Error:", error.message);
    } else {
      console.error("Details Null:", error);
    }
    throw new Error("Error connect server.");
  }
};
