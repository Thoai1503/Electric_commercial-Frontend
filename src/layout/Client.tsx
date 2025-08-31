import { Outlet } from "react-router-dom";
import Navbar from "../components/client/Navbar";
import Menu from "../components/client/home/Menu";

const Client = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row"></div>
        <div className="row mt-5">
          <div className="col-md-3">
            <Menu />
          </div>
          <div className="col-md-9 mt-5">
            <div
              id="carouselExampleDark"
              className="carousel carousel-dark slide"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active" data-bs-interval="10000">
                  <img
                    src="https://www.whatmobile.com.pk/control/news/assets/22032021/6477c5f57fe8c80acae5b93b3e7e1253.jpg"
                    className="d-block w-100"
                    height={500}
                    alt="..."
                  />

                  <div className="carousel-caption d-none d-md-block">
                    <h5>First slide label</h5>
                    <p>
                      Some representative placeholder content for the first
                      slide.
                    </p>
                  </div>
                </div>
                <div className="carousel-item" data-bs-interval="2000">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAMUckymXtsv3ktx49PDwVWaIACRHaCUYqIsh8wGDe6DDkNdGyGIBIHXiptwsipnaH8Q&usqp=CAU"
                    className="d-block w-100"
                    alt="..."
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Second slide label</h5>
                    <p>
                      Some representative placeholder content for the second
                      slide.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img src="..." className="d-block w-100" alt="..." />
                  <div className="carousel-caption d-none d-md-block">
                    <h5>Third slide label</h5>
                    <p>
                      Some representative placeholder content for the third
                      slide.
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <div>Footer</div>
    </div>
  );
};

export default Client;
