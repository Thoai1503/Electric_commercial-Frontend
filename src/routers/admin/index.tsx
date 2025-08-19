import { Navigate } from "react-router-dom";
import Admin from "../../layout/Admin";

export const adminRoutes = [
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { path: "dashboard", element: <Navigate to="/admin" /> },
      {
        path: "products",
        element: <h1>Admin Product List</h1>,
      },
    ],
  },
];
