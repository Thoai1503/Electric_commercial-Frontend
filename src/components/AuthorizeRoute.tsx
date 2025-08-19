import { Navigate, useLocation } from "react-router-dom";

const AuthorizeRoute = ({ children, role }: any) => {
  const user = localStorage.getItem("user");
  const location = useLocation();
  const userRole = user ? JSON.parse(user).role : null;
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (userRole && !userRole.includes(role)) return <h1>403 Forbidden</h1>;
  return children;
};

export default AuthorizeRoute;
