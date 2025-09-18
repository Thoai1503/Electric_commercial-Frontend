import { useState } from "react";
import type { MouseEvent } from "react";
const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const logout = () => {
    setTimeout(() => {
      console.log("User logged out");
      // In a real app, you would handle logout here
      // localStorage.removeItem("token");
      // localStorage.removeItem("user");
      // navigate("/");
    }, 1500);
  };

  const handleMouseEnter = (dropdown: string) => {
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const dropdownStyle: React.CSSProperties = {
    position: "absolute",
    top: "100%",
    left: "0",
    minWidth: "200px",
    backgroundColor: "#1a1a1a",
    border: "1px solid #333",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
    opacity: 0,
    visibility: "hidden",
    transform: "translateY(-10px)",
    transition: "all 0.3s ease-in-out",
  };

  const activeDropdownStyle: React.CSSProperties = {
    ...dropdownStyle,
    opacity: 1,
    visibility: "visible",
    transform: "translateY(0)",
  };

  const dropdownItemStyle: React.CSSProperties = {
    display: "block",
    padding: "10px 15px",
    color: "#48d6f0ff",
    textDecoration: "none",
    borderBottom: "1px solid #333",
    transition: "background-color 0.2s ease",
  };

  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      data-bs-theme="dark"
      style={{ backgroundColor: "#000000ff" }}
    >
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center"
          href="#"
          style={{ color: "#39c9e3ff" }}
        >
          <img src="../../assets/logo.png" alt="" width="40" height="40" />
          <span className="text-white fw-bold" style={{ color: "#48d6f0ff" }}>
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
                style={{ color: "#48d6f0ff" }}
              >
                Home
              </a>
            </li>

            {/* Dropdown cho Top sale */}
            <li
              className="nav-item"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnter("topsale")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="nav-link"
                style={{ color: "#48d6f0ff", cursor: "pointer" }}
                href="./index.html#top-sale"
              >
                Top sale
                <i
                  className="fas fa-chevron-down ms-1"
                  style={{ fontSize: "12px" }}
                ></i>
              </a>
              <div
                style={
                  activeDropdown === "topsale"
                    ? activeDropdownStyle
                    : dropdownStyle
                }
              >
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Smartphone Sale
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Laptop Sale
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Accessories Sale
                </a>
                <a
                  href="#"
                  style={{ ...dropdownItemStyle, borderBottom: "none" }}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Flash Deals
                </a>
              </div>
            </li>

            {/* Dropdown cho Special Price */}
            <li
              className="nav-item"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnter("special")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="nav-link"
                href="./index.html#special-price"
                style={{ color: "#48d6f0ff", cursor: "pointer" }}
              >
                Special Price
                <i
                  className="fas fa-chevron-down ms-1"
                  style={{ fontSize: "12px" }}
                ></i>
              </a>
              <div
                style={
                  activeDropdown === "special"
                    ? activeDropdownStyle
                    : dropdownStyle
                }
              >
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Weekly Deals
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Monthly Offers
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Clearance Sale
                </a>
                <a
                  href="#"
                  style={{ ...dropdownItemStyle, borderBottom: "none" }}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Bundle Deals
                </a>
              </div>
            </li>

            {/* Dropdown cho New Phones */}
            <li
              className="nav-item"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnter("newphones")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="nav-link"
                href="./index.html#new-phones"
                style={{ color: "#48d6f0ff", cursor: "pointer" }}
              >
                New Phones
                <i
                  className="fas fa-chevron-down ms-1"
                  style={{ fontSize: "12px" }}
                ></i>
              </a>
              <div
                style={
                  activeDropdown === "newphones"
                    ? activeDropdownStyle
                    : dropdownStyle
                }
              >
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  iPhone Series
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Samsung Galaxy
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Xiaomi
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  OPPO
                </a>
                <a
                  href="#"
                  style={{ ...dropdownItemStyle, borderBottom: "none" }}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Vivo
                </a>
              </div>
            </li>

            {/* Dropdown cho Blogs */}
            <li
              className="nav-item"
              style={{ position: "relative" }}
              onMouseEnter={() => handleMouseEnter("blogs")}
              onMouseLeave={handleMouseLeave}
            >
              <a
                className="nav-link"
                href="./index.html#blogs"
                style={{ color: "#48d6f0ff", cursor: "pointer" }}
              >
                Blogs
                <i
                  className="fas fa-chevron-down ms-1"
                  style={{ fontSize: "12px" }}
                ></i>
              </a>
              <div
                style={
                  activeDropdown === "blogs"
                    ? activeDropdownStyle
                    : dropdownStyle
                }
              >
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Tech News
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Reviews
                </a>
                <a
                  href="#"
                  style={dropdownItemStyle}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Tutorials
                </a>
                <a
                  href="#"
                  style={{ ...dropdownItemStyle, borderBottom: "none" }}
                  onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "#333")
                  }
                  onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                    ((e.target as HTMLAnchorElement).style.backgroundColor =
                      "transparent")
                  }
                >
                  Tips & Tricks
                </a>
              </div>
            </li>

            <li className="nav-item">
              <a
                className="nav-link"
                href="./cart.html"
                style={{ color: "#48d6f0ff" }}
              >
                Cart
              </a>
            </li>

            <li
              className="nav-item"
              style={{ color: "#48d6f0ff" }}
              onClick={logout}
            >
              <a className="nav-link" href="#" style={{ color: "#48d6f0ff" }}>
                Coming Soon
              </a>
            </li>

            <input
              type="text"
              style={{
                backgroundColor: "white",
                color: "black",
                borderRadius: "7px",
                marginLeft: "10px",
                padding: "5px 10px",
                border: "none",
              }}
              placeholder="Bạn muốn.."
            />
          </ul>

          <div className="font-size-12">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
