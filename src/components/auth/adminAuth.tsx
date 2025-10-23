import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import type { AppDispatch, RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../../reducers/authenReducer";

const ROLES = {
  Admin: 1,
  User: 2,
};

export interface UserData {
  id: number;
  name: string;
  email: string;
  rule?: 1 | 2 | null;
  role?: number;
}

const AdminAuth = ({ children }: { children?: React.ReactNode }) => {
  //const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { error } = useSelector((state: RootState) => state.authen);

  // Check for both possible token keys
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");
  const user: UserData | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  useEffect(() => {
    dispatch(refreshToken());

    const userRole = user?.role || user?.rule;

    if (userRole !== ROLES.Admin) {
      navigate("/", { replace: true });
      return;
    }
  }, [dispatch]);

  const userRole = user?.role || user?.rule;

  if (userRole !== ROLES.Admin) {
    console.log(
      "AdminAuth - Rendering null, token:",
      !!token,
      "role:",
      userRole
    );
    navigate("/", { replace: true, state: { from: location.pathname } });
    //   return null; // prevent flicker
  }
  if (error) {
    alert("Refresh failed");
    navigate("/login", { replace: true, state: { from: location.pathname } });

    //   return null;
  }

  console.log("AdminAuth - Rendering admin content");
  return <>{children || <Outlet />}</>;
};

export default AdminAuth;
