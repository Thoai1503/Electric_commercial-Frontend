import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }, 1500);
  };
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      data-bs-theme="dark"
      style={{ backgroundColor: "	#000000ff" }}
    >
      <div className="container">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="../../assets/logo.png" alt="" width="40" height="40" />
          <span className="text-white fw-bold" style={{ color: "#06b6d4" }}>
            TechStore
          </span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            <li className="nav-item active">
              <a
                className="nav-link"
                href="./index.html"
                style={{ color: "#06b6d4" }}
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                style={{ color: "#06b6d4" }}
                href="./index.html#top-sale"
              >
                Top sale
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="./index.html#special-price"
                style={{ color: "#06b6d4" }}
              >
                Special Price
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="./index.html#new-phones"
                style={{ color: "#06b6d4" }}
              >
                New Phones
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="./index.html#blogs"
                style={{ color: "#06b6d4" }}
              >
                Blogs
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                href="./cart.html"
                style={{ color: "#06b6d4" }}
              >
                Cart
              </a>
            </li>
            <li
              className="nav-item"
              style={{ color: "#06b6d4" }}
              onClick={logout}
            >
              <a className="nav-link" href="#">
                Coming Soon
              </a>
            </li>
          </ul>
          <form action="#" className="font-size-12">
            <a
              href="./cart.html"
              className="d-flex align-items-center rounded-pill bg-primary"
            >
              <span className="font-size-14 px-2 py-2 text-white">
                <i className="fas fa-shopping-cart" aria-hidden="true"></i>
              </span>
              <div className="px-3 py-2 font-size-14 rounded-pill text-black bg-white">
                0
              </div>
            </a>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
