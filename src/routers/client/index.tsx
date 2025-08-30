import { element } from "prop-types";
import HomeProList from "../../components/client/HomeProList";
import Client from "../../layout/Client";
import Login from "../../page/client/Login";
import Logout from "../../components/auth/logout";

export const clientRoutes = [
  {
    path: "/",
    element: <Client />,
    children: [
      { path: "", element: <HomeProList /> },

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
