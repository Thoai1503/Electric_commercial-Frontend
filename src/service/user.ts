import { http } from "../api/http";
import type { UserLogin, UserRespone } from "../type/User";

export const userLoginService = async (loginState: UserLogin) => {
  try {
    const { data } = await http.post<UserRespone>(
      "/api/v1/auth/login",
      loginState
    );

    if (!data.success) {
      alert("Invalid credentials");
      return data;
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Details Error:", error.message);
    } else {
      console.error("Details Null:", error);
    }

    throw new Error(`${error}`);
  }
};
