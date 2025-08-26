import { Navigate } from "react-router-dom";

import AdminLayout from "../../layout/Admin";
import { element } from "prop-types";
import Dashboard from "../../page/admin/Dashboard";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Navigate to="/admin" /> },
      { path: "", element: <Dashboard /> },
      {
        path: "products",
        element: <h1>Admin Product List</h1>,
      },
    ],
  },
];
