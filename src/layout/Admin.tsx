import { Outlet } from "react-router-dom";
import AppSideBar from "../components/admin/AppSideBar";
import "../scss/style.scss";

const AdminLayout = () => {
  return (
    <div>
      <AppSideBar />
      <h3>Header of AdminLayout</h3>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
