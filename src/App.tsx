import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routerRoot } from "./routers/routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

//import "./scss/style.scss";
const queryClient = new QueryClient();
function App() {
  const authState = useSelector((state: RootState) => state.authen);

  console.log("Trạng thái xác thực app gốc:" + JSON.stringify(authState));
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
