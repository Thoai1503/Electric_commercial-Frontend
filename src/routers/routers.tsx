import { createBrowserRouter } from "react-router-dom";
import { clientRoutes } from "./client";
import { adminRoutes } from "./admin";
import AdminLayout from "../layout/Admin";

// const ROLES = {
//   User: 2,

//   Admin: 1,
// };

export const routerRoot = createBrowserRouter([
  ...clientRoutes,
  //...adminRoutes,
  {
    path: "admin",
    element: <AdminLayout />,
    children: [...adminRoutes], // route con admin
  },
  { path: "403-forbidden", element: <h1>403 Forbidden</h1> },
  { path: "*", element: <h1>404 Not Found</h1> },
]);
