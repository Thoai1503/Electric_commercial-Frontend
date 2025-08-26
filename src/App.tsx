//import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { routerRoot } from "./routers/routers";
//import "./scss/style.scss";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: undefined,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routerRoot} />
      </QueryClientProvider>
    </>
  );
}

export default App;
