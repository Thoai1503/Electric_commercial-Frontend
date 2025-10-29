import { useState } from "react";
import type { MouseEvent } from "react";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = { name: "John Doe" }; // Demo user

  const logout = () => {
    console.log("User logged out");
    // dispatch(clearUser());
  };

  const handleMouseEnter = (dropdown: string) => {
    if (window.innerWidth > 992) {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 992) {
      setActiveDropdown(null);
    }
  };

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
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
    <>
      <style>{`
        @media (max-width: 992px) {
          .mobile-dropdown {
            position: static !important;
            width: 100% !important;
            margin-top: 0.5rem;
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          }
          .mobile-menu {
            max-height: ${mobileMenuOpen ? "1000px" : "0"};
            overflow: hidden;
            transition: max-height 0.3s ease-in-out;
          }
          .search-input-mobile {
            width: 100%;
            margin: 1rem 0;
          }
          .user-section-mobile {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem 0;
          }
        }
        .nav-item {
          position: relative;
        }
        .cart-button {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          border-radius: 50px;
          padding: 0;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }
        .cart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
        }
        .cart-button:active {
          transform: translateY(0);
        }
        .cart-icon {
          padding: 0.75rem 1rem;
          color: white;
          font-size: 1.1rem;
        }
        .cart-count {
          background: white;
          color: #667eea;
          font-weight: 600;
          padding: 0.75rem 1.25rem;
          border-radius: 50px;
          margin-left: -5px;
        }
        .login-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border: none;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 500;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          text-decoration: none;
          display: inline-block;
        }
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
          color: white;
        }
        .user-greeting {
          color: white;
          padding: 0.6rem 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          font-weight: 500;
        }
        .user-greeting-hover:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          transform: translateY(-1px);
        }
        .user-profile-dropdown {
          position: relative;
        }
        @media (max-width: 992px) {
          .user-profile-dropdown .mobile-dropdown {
            right: 0 !important;
          }
        }
      `}</style>

      <nav
        style={{
          backgroundColor: "#000000ff",
          padding: "1rem 0",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "#39c9e3ff",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "0.5rem",
                }}
              >
                <span
                  style={{
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  T
                </span>
              </div>
              <span
                style={{
                  color: "#48d6f0ff",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                TechStore
              </span>
            </a>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                color: "#48d6f0ff",
                fontSize: "1.5rem",
                cursor: "pointer",
              }}
              className="mobile-toggle"
            >
              <style>{`
                @media (max-width: 992px) {
                  .mobile-toggle {
                    display: block !important;
                  }
                }
              `}</style>
              {mobileMenuOpen ? "✕" : "☰"}
            </button>

            {/* Desktop Menu */}
            <div
              className="mobile-menu"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2rem",
                flex: 1,
                justifyContent: "space-between",
                marginLeft: "2rem",
              }}
            >
              <style>{`
                @media (max-width: 992px) {
                  .mobile-menu > div:first-child {
                    flex-direction: column;
                    width: 100%;
                    gap: 0 !important;
                  }
                }
              `}</style>

              <div
                style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}
              >
                <a
                  href="./"
                  style={{
                    color: "#48d6f0ff",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Home
                </a>

                {/* Top sale Dropdown */}
                <div
                  className="nav-item"
                  onMouseEnter={() => handleMouseEnter("topsale")}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="./index.html#top-sale"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("topsale");
                      }
                    }}
                    style={{
                      color: "#48d6f0ff",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Top sale ▾
                  </a>
                  <div
                    className={
                      window.innerWidth <= 992 ? "mobile-dropdown" : ""
                    }
                    style={
                      activeDropdown === "topsale"
                        ? activeDropdownStyle
                        : dropdownStyle
                    }
                  >
                    <a href="#" style={dropdownItemStyle}>
                      Smartphone Sale
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Laptop Sale
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Accessories Sale
                    </a>
                    <a
                      href="#"
                      style={{ ...dropdownItemStyle, borderBottom: "none" }}
                    >
                      Flash Deals
                    </a>
                  </div>
                </div>

                {/* Special Price Dropdown */}
                <div
                  className="nav-item"
                  onMouseEnter={() => handleMouseEnter("special")}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="./index.html#special-price"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("special");
                      }
                    }}
                    style={{
                      color: "#48d6f0ff",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Special Price ▾
                  </a>
                  <div
                    className={
                      window.innerWidth <= 992 ? "mobile-dropdown" : ""
                    }
                    style={
                      activeDropdown === "special"
                        ? activeDropdownStyle
                        : dropdownStyle
                    }
                  >
                    <a href="#" style={dropdownItemStyle}>
                      Weekly Deals
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Monthly Offers
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Clearance Sale
                    </a>
                    <a
                      href="#"
                      style={{ ...dropdownItemStyle, borderBottom: "none" }}
                    >
                      Bundle Deals
                    </a>
                  </div>
                </div>

                {/* New Phones Dropdown */}
                <div
                  className="nav-item"
                  onMouseEnter={() => handleMouseEnter("newphones")}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="./index.html#new-phones"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("newphones");
                      }
                    }}
                    style={{
                      color: "#48d6f0ff",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    New Phones ▾
                  </a>
                  <div
                    className={
                      window.innerWidth <= 992 ? "mobile-dropdown" : ""
                    }
                    style={
                      activeDropdown === "newphones"
                        ? activeDropdownStyle
                        : dropdownStyle
                    }
                  >
                    <a href="#" style={dropdownItemStyle}>
                      iPhone Series
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Samsung Galaxy
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Xiaomi
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      OPPO
                    </a>
                    <a
                      href="#"
                      style={{ ...dropdownItemStyle, borderBottom: "none" }}
                    >
                      Vivo
                    </a>
                  </div>
                </div>

                {/* Blogs Dropdown */}
                <div
                  className="nav-item"
                  onMouseEnter={() => handleMouseEnter("blogs")}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="./index.html#blogs"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("blogs");
                      }
                    }}
                    style={{
                      color: "#48d6f0ff",
                      cursor: "pointer",
                      textDecoration: "none",
                      fontWeight: "500",
                    }}
                  >
                    Blogs ▾
                  </a>
                  <div
                    className={
                      window.innerWidth <= 992 ? "mobile-dropdown" : ""
                    }
                    style={
                      activeDropdown === "blogs"
                        ? activeDropdownStyle
                        : dropdownStyle
                    }
                  >
                    <a href="#" style={dropdownItemStyle}>
                      Tech News
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Reviews
                    </a>
                    <a href="#" style={dropdownItemStyle}>
                      Tutorials
                    </a>
                    <a
                      href="#"
                      style={{ ...dropdownItemStyle, borderBottom: "none" }}
                    >
                      Tips & Tricks
                    </a>
                  </div>
                </div>

                <a
                  href="./cart"
                  style={{
                    color: "#48d6f0ff",
                    textDecoration: "none",
                    fontWeight: "500",
                  }}
                >
                  Cart
                </a>

                {/* Search Input */}
                <input
                  type="text"
                  className="search-input-mobile"
                  style={{
                    backgroundColor: "#454545",
                    color: "white",
                    borderRadius: "25px",
                    padding: "0.6rem 1.2rem",
                    border: "none",
                    outline: "none",
                    minWidth: "200px",
                  }}
                  placeholder="Search products..."
                />
              </div>

              {/* User Section */}
              <div
                className="user-section-mobile"
                style={{ display: "flex", alignItems: "center", gap: "1rem" }}
              >
                <button onClick={logout} className="cart-button">
                  <span className="cart-icon">🛒</span>
                  <div className="cart-count">0</div>
                </button>

                {user ? (
                  <div
                    className="nav-item user-profile-dropdown"
                    onMouseEnter={() => handleMouseEnter("userprofile")}
                    onMouseLeave={handleMouseLeave}
                    style={{ position: "relative" }}
                  >
                    <div
                      onClick={() => {
                        if (window.innerWidth <= 992) {
                          toggleDropdown("userprofile");
                        }
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        cursor: "pointer",
                        padding: "0.6rem 1rem",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "50px",
                        transition: "all 0.3s ease",
                      }}
                      className="user-greeting-hover"
                    >
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ color: "white", fontWeight: "500" }}>
                        {user.name}
                      </span>
                      <span style={{ color: "#48d6f0ff", fontSize: "0.8rem" }}>
                        ▾
                      </span>
                    </div>

                    <div
                      className={
                        window.innerWidth <= 992 ? "mobile-dropdown" : ""
                      }
                      style={{
                        ...(activeDropdown === "userprofile"
                          ? activeDropdownStyle
                          : dropdownStyle),
                        right: 0,
                        left: "auto",
                        minWidth: "220px",
                      }}
                    >
                      <a
                        href="#profile"
                        style={dropdownItemStyle}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#333")
                        }
                        onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "transparent")
                        }
                      >
                        <span style={{ marginRight: "0.5rem" }}>👤</span> My
                        Profile
                      </a>
                      <a
                        href="#orders"
                        style={dropdownItemStyle}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#333")
                        }
                        onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "transparent")
                        }
                      >
                        <span style={{ marginRight: "0.5rem" }}>📦</span> My
                        Orders
                      </a>
                      <a
                        href="#wishlist"
                        style={dropdownItemStyle}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#333")
                        }
                        onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "transparent")
                        }
                      >
                        <span style={{ marginRight: "0.5rem" }}>❤️</span>{" "}
                        Wishlist
                      </a>
                      <a
                        href="#settings"
                        style={dropdownItemStyle}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#333")
                        }
                        onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "transparent")
                        }
                      >
                        <span style={{ marginRight: "0.5rem" }}>⚙️</span>{" "}
                        Settings
                      </a>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                        }}
                        style={{
                          ...dropdownItemStyle,
                          borderBottom: "none",
                          color: "#ff6b6b",
                        }}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#333")
                        }
                        onMouseOut={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "transparent")
                        }
                      >
                        <span style={{ marginRight: "0.5rem" }}>🚪</span> Logout
                      </a>
                    </div>
                  </div>
                ) : (
                  <a href="./login" className="login-button">
                    Login
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div style={{ height: "80px" }}></div>
    </>
  );
};

export default Navbar;
