import { Outlet } from "react-router-dom";
import Navbar from "../components/client/Navbar";
import Menu from "../components/client/home/Menu";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Carousel from "../components/client/home/Carousel";

//import AuthDebug from "../components/client/AuthDebug";
//import "../scss/client.sass";
const Client = () => {
  const authState = useSelector((state: RootState) => state.authen);

  console.log("Trạng thái xác thực:" + JSON.stringify(authState));
  return (
    <div>
      {/* Debug Component - Remove after fixing */}
      {/* <AuthDebug /> */}

      <Navbar />
      <div className="container">
        <div className="row"></div>
        <div className="row mt-5">
          <div className="col-md-3">
            <Menu />
          </div>
          <div className="col-md-9 mt-5">
            <Carousel />
          </div>
          <Outlet />
        </div>
      </div>

      <div>Footer</div>
    </div>
  );
};

export default Client;
