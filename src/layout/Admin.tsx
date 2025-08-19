import React from "react";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <h1>Admin Layout</h1>
      <div>Navbar</div>
      <Outlet />
    </div>
  );
};

export default Admin;
