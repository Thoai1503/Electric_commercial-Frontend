import { createBrowserRouter, Outlet } from "react-router-dom";
import { clientRoutes } from "./client";
import { adminRoutes } from "./admin";

export const routerRoot = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [
      ...clientRoutes,
      ...adminRoutes,
      { path: "403-forbidden", element: <h1>403 Forbidden</h1> },
      { path: "*", element: <h1>404 Not Found</h1> },
    ],
  },
]);
