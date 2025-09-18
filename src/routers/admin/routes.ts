import React from "react";
import type { LazyExoticComponent } from "react";
type Route = {
  path: string;
  exact?: boolean;
  name: string;
  element?: LazyExoticComponent<React.ComponentType<any>>;
};

const Dashboard = React.lazy(() => import("../../page/admin/Dashboard"));
const Product = React.lazy(
  () => import("../../page/admin/AddProductProductPage")
);
// const Typography = React.lazy(
//   () => import("./views/theme/typography/Typography")
// );

// Notifications

const routes: Route[] = [
  { path: "/", exact: true, name: "Home" },
  { path: "dashboard", exact: true, name: "Dashboard", element: Dashboard },
  { path: "products", name: "Product", element: Product, exact: true },
];

export default routes;
