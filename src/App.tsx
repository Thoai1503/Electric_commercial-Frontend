//import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routerRoot } from "./routers/routers";

function App() {
  return (
    <>
      <RouterProvider router={routerRoot} />
    </>
  );
}

export default App;
