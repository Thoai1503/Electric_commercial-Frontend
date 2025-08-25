import { createBrowserRouter } from "react-router-dom";
import { clientRoutes } from "./client";
import { adminRoutes } from "./admin";

// const ROLES = {
//   User: 2,

//   Admin: 1,
// };

export const routerRoot = createBrowserRouter([
  ...clientRoutes,
  ...adminRoutes,
  { path: "403-forbidden", element: <h1>403 Forbidden</h1> },
  { path: "*", element: <h1>404 Not Found</h1> },
]);
