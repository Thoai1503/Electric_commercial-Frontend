// In your client routes file
import HomeProList from "../../components/client/HomeProList";
import Client from "../../layout/Client";
import Login from "../../page/client/Login";

export const clientRoutes = [
  {
    path: "", // Changed from "/"
    element: <Client />,
    children: [
      { path: "", element: <HomeProList /> },
      {
        path: "products", // Removed leading "/"
        element: <p>Product List</p>,
      },
    ],
  },
  {
    path: "login", // Removed leading "/"
    element: <Login />,
  },
  {
    path: "register", // Removed leading "/"
    element: <p>Register Page</p>,
  },
];
