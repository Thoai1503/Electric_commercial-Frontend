import React from "react";
import { Navigate } from "react-router-dom";
import { AddNewCatePage } from "../../page/admin/AddNewCatePage";
import ProductDetails from "../../page/admin/ProductDetailsPage";
import ProductPage from "../../page/admin/ProductPage";
import OrderPage from "../../page/admin/OrderPage";
import OrderDetailPage from "../../page/admin/OrderDetailPage";

const Dashboard = React.lazy(() => import("../../page/admin/Dashboard"));
// const Product = React.lazy(
//   () => import("../../page/admin/AddProductProductPage")
// );

export const adminRoutes = [
  { path: "", element: <Dashboard /> },
  { path: "products", element: <ProductPage /> },
  { path: "product/:id", element: <ProductDetails /> },
  { path: "order-detail/:id", element: <OrderDetailPage /> },
  { path: "dashboard", element: <Navigate to="/admin" /> },
  { path: "orders", element: <OrderPage /> },
  { path: "category/create", element: <AddNewCatePage /> },
];
