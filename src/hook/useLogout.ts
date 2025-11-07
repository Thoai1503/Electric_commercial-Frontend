import { useDispatch } from "react-redux";
import { logout } from "../service/user";

import { useMutation } from "@tanstack/react-query";
import { clearUser, setAuthenState } from "../reducers/authenReducer";

export const useLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    logoutProcess();
  };
  const { isPending: isPendingLogout, mutate: logoutProcess } = useMutation({
    mutationFn: () => logout(),
    onSuccess: (data) => {
      alert(data);
      dispatch(
        setAuthenState({
          id: 0,
          email: "",
          name: "",
          accessToken: "",
          refreshToken: "",
          role: null,
        })
      );
      dispatch(clearUser());
      //  navigate("/", { replace: true });
      window.location.pathname = "/";
    },
    onError: (data) => alert(data),
  });
  return { handleLogout, isPendingLogout };
};
