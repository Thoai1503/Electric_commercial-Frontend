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
  rule?: 1 | 2 | null;
  role?: number; // API might return 'role' instead of 'rule'
}

const AdminAuth = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check for both possible token keys
  const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
  const user: UserData | null = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;

  useEffect(() => {
    console.log("AdminAuth - Token:", token ? "EXISTS" : "MISSING");
    console.log("AdminAuth - User:", user);
    console.log("AdminAuth - User role/rule:", user?.role || user?.rule);
    
    if (!token) {
      console.log("AdminAuth - No token found, redirecting to login");
      // not logged in → redirect to login
      navigate("/", {
        replace: true,
        state: { from: location.pathname },
      });
      return;
    }

    // Check for admin role - handle both 'role' and 'rule' properties
    const userRole = user?.role || user?.rule;
    console.log("AdminAuth - User role:", userRole, "Expected admin role:", ROLES.Admin);
    
    if (userRole !== ROLES.Admin) {
      console.log("AdminAuth - User is not admin, redirecting to homepage");
      // logged in but not admin → back to homepage
      navigate("/", { replace: true });
      return;
    }

    console.log("AdminAuth - User is admin, allowing access");
  }, [token, user, location, navigate]);

  // Check for admin role - handle both 'role' and 'rule' properties
  const userRole = user?.role || user?.rule;
  
  if (!token || userRole !== ROLES.Admin) {
    console.log("AdminAuth - Rendering null, token:", !!token, "role:", userRole);
    return null; // prevent flicker
  }

  console.log("AdminAuth - Rendering admin content");
  return <>{children || <Outlet />}</>;
};

export default AdminAuth;
