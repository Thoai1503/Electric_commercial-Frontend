import AppSideBar from "../components/admin/dashboard/AppSideBar";
import "../scss/style.scss";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import { AppHeader } from "../components/admin/dashboard";

const AdminLayout = () => {
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <AppSideBar />
        <div className="wrapper d-flex flex-column min-vh-100">
          <AppHeader />
          <div
            className="body flex-grow-1"
            style={{ paddingLeft: "25px", paddingRight: "25px" }}
          >
            <Suspense fallback={<CSpinner color="primary" />}>
              <Outlet />
            </Suspense>
          </div>
        </div>
      </DndProvider>
    </div>
  );
};

export default AdminLayout;
