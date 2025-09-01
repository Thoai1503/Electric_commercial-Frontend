import React from "react";
import { Navigate } from "react-router-dom";
import { AddNewCatePage } from "../../page/admin/AddNewCatePage";

const Dashboard = React.lazy(() => import("../../page/admin/Dashboard"));
const Product = React.lazy(() => import("../../page/admin/Product"));

export const adminRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "products", element: <Product /> },
  { path: "dashboard", element: <Navigate to="/admin" /> },
  { path: "category/create", element: <AddNewCatePage /> },
];
