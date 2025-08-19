import { useState } from "react";
//
//import "./App.css";
import { Route, RouterProvider } from "react-router-dom";
import { routerRoot } from "./routers/routers";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={routerRoot} />
    </>
  );
}

export default App;
