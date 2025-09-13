import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
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
  const { accessToken, loading, error } = useSelector(
    (state: RootState) => state.authen
  );

  // Check for both possible token keys
  const token =
    localStorage.getItem("accessToken") || localStorage.getItem("token");
  const user: UserData | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  console.log(
    "AuthApp - Loading:",
    loading,
    "AccessToken:",
    accessToken,
    "Error:",
    error
  );

  useEffect(() => {
    console.log("AdminAuth - Token:", token ? "EXISTS" : "MISSING");
    console.log("AdminAuth - User:", user);
    console.log("AdminAuth - User role/rule:", user?.role || user?.rule);

    dispatch(refreshToken());
    // if (!token) {
    //   console.log("AdminAuth - No token found, redirecting to login");
    //   // not logged in → redirect to login
    //   navigate("/", {
    //     replace: true,
    //     state: { from: location.pathname },
    //   });
    //   return;
    // }

    // Check for admin role - handle both 'role' and 'rule' properties
    const userRole = user?.role || user?.rule;

    if (userRole !== ROLES.Admin) {
      console.log("AdminAuth - User is not admin, redirecting to homepage");
      // logged in but not admin → back to homepage
      navigate("/", { replace: true });
      return;
    }

    console.log("AdminAuth - User is admin, allowing access");
  }, [dispatch]);

  // Check for admin role - handle both 'role' and 'rule' properties
  const userRole = user?.role || user?.rule;

  if (!token || userRole !== ROLES.Admin) {
    console.log(
      "AdminAuth - Rendering null, token:",
      !!token,
      "role:",
      userRole
    );
    return null; // prevent flicker
  }
  // if (error) {
  //   navigate("/", { replace: true, state: { from: location.pathname } });

  //   return null;
  // }

  console.log("AdminAuth - Rendering admin content");
  return <>{children || <Outlet />}</>;
};

export default AdminAuth;
