import Client from "../../layout/Client";
import Home from "../../page/client/HomePage";
import Login from "../../page/client/Login";

export const clientRoutes = [
  {
    path: "/",
    element: <Client />,
    children: [
      { path: "", element: <Home /> },

      {
        path: "/products",
        element: <p>Product List</p>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <p>Register Page</p>,
  },
];
