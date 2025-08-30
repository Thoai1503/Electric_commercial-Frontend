import { useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const ROLES = {
  Admin: 1,
  User: 2,
};
export interface UserData {
  id: number;
  name: string;
  email: string;
  rule: 1 | 2 | null;
}

const AdminAuth = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user: UserData | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  useEffect(() => {
    console.log("User: " + user);
    if (!token) {
      // not logged in → redirect to login
      navigate("/", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    if (user?.rule !== ROLES.Admin) {
      // logged in but not admin → back to homepage
      navigate("/", { replace: true });
    }
  }, [token, user, location, navigate]);

  if (!token || user?.rule !== ROLES.Admin) {
    return null; // prevent flicker
  }

  return <>{children || <Outlet />}</>;
};

export default AdminAuth;
