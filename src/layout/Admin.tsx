import AppSideBar from "../components/admin/AppSideBar";
import "../scss/style.scss";

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import { AppHeader } from "../components/admin";

const AdminLayout = () => {
  return (
    <div>
      <AppSideBar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1" style={{ paddingLeft: "25px" }}>
          <Suspense fallback={<CSpinner color="primary" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
