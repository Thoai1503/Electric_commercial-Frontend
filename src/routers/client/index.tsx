import Client from "../../layout/Client";
import Home from "../../page/client/HomePage";
import Login from "../../page/client/Login";
import CartPage from "../../page/client/CartPage";

import CheckOut from "../../page/client/CheckOut";

import SuccessfulCheckout from "../../page/client/SuccessfulCheckout";
import Product from "../../page/client/Product";
import FailedCheckout from "../../page/client/FailedCheckout";

import OrderHistory from "../../page/client/OrderHistory";

import ProductDetail from "../../page/client/ProductDetail";

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
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/f/:category",
        element: <Product />,
      },
      { path: "/checkout", element: <CheckOut /> },
      { path: "/successful", element: <SuccessfulCheckout /> },
      { path: "/failed", element: <FailedCheckout /> },
      { path: "/order-history", element: <OrderHistory /> },
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
