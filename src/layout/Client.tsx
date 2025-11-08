import { Outlet } from "react-router-dom";
import Navbar from "../components/client/Navbar";

import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import "../scss/style.scss";

//import AuthDebug from "../components/client/AuthDebug";
//import "../scss/client.sass";
const Client = () => {
  const authState = useSelector((state: RootState) => state.authen);
  const loading = useSelector((state: RootState) => state.cart.loading);

  console.log("Trạng thái xác thực:" + JSON.stringify(authState));
  return (
    <div style={{ backgroundColor: "#F8F8FC", marginTop: "-80px" }}>
      {/* Debug Component - Remove after fixing */}
      {/* <AuthDebug /> */}

      <Navbar />
      <div className="container" style={{ opacity: loading ? 0.3 : 1 }}>
        <div className="row mt-5">
          {/* <div className="col-md-3">
            <Menu />
          </div>
          <div className="col-md-9 mt-5">
            <Carousel />
          </div> */}
          <Outlet />
        </div>
      </div>

      <div>Footer</div>
    </div>
  );
};

export default Client;
