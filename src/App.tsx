//import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routerRoot } from "./routers/routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
//import "./scss/style.scss";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routerRoot} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}

export default App;
