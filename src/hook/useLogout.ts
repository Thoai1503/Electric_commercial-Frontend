import { useDispatch } from "react-redux";
import { logout } from "../service/user";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { clearUser } from "../reducers/authenReducer";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logoutProcess();
  };

  const { isPending: isPendingLogout, mutate: logoutProcess } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      console.log("Logout successful");

      // Clear user from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Clear Redux auth state
      dispatch(clearUser());

      // Redirect to home
      navigate("/", { replace: true });
    },
    onError: (error: any) => {
      console.error("Logout error:", error?.message || error);

      // Still clear local state even if API call fails
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      dispatch(clearUser());

      // Redirect to home
      navigate("/", { replace: true });
    },
  });

  return { handleLogout, isPendingLogout };
};
