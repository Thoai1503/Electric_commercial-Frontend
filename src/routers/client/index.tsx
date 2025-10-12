import Client from "../../layout/Client";
import Home from "../../page/client/HomePage";
import Login from "../../page/client/Login";
import CartPage from "../../page/client/CartPage";

import CheckOut from "../../page/client/CheckOut";

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
      {
        path: "/cart",
        element: <CartPage />,
      },
      { path: "/checkout", element: <CheckOut /> },
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
