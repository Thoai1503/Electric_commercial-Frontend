const Navbar = () => {
  return (
    <nav
      className="navbar bg-body-secondary navbar-expand-lg"
      data-bs-theme="dark"
      style={{ backgroundColor: "#0d6efd" }}
    >
      <a className="navbar-brand" href="#" style={{ margin: "5px" }}>
        <img
          src="/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt=""
          width="30"
          height="24"
          className="d-inline-block align-text-top"
        />
        Bootstrap
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
            <a className="nav-link" href="./index.html">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./index.html#top-sale">
              Top sale
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./index.html#special-price">
              Special Price
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./index.html#new-phones">
              New Phones
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./index.html#blogs">
              Blogs
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="./cart.html">
              Cart
            </a>
          </li>
          <li className="nav-item">
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
    </nav>
  );
};

export default Navbar;
