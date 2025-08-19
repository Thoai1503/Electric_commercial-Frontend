import HomeProList from "../../components/client/HomeProList";
import Client from "../../layout/Client";

export const clientRoutes = [
  {
    path: "/",
    element: <Client />,
    children: [
      { path: "", element: <HomeProList /> },
      {
        path: "products",
        element: <p>Product List</p>,
      },
    ],
  },
];
