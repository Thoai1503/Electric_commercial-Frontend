import { useState } from "react";
import type { MouseEvent } from "react";
import { useLogout } from "../../hook/useLogout";

import { useQuery } from "@tanstack/react-query";
import cartQuery from "../../module/client/query/cart";

const Navbar = () => {
  //const cart = useSelector((state: RootState) => state.cart.items);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null;
  const { data: CartList } = useQuery(cartQuery.getByUser(user?.id));
  const { handleLogout } = useLogout();
  // const logout = () => {
  //   console.log("User logged out");
  //   // dispatch(clearUser());
  // };

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
    backgroundColor: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "8px",
    boxShadow: "0 12px 24px rgba(2, 6, 23, 0.4)",
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
    color: "#bfdbfe",
    textDecoration: "none",
    borderBottom: "1px solid #1e293b",
    transition: "background-color 0.2s ease, color 0.2s ease",
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
        .nav-link-main {
          color: #bfdbfe;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }
        .nav-link-main:hover {
          color: #60a5fa;
        }
        .cart-button {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: linear-gradient(180deg, #0f172a 0%, #111827 100%);
          border: 1px solid #334155;
          border-radius: 50px;
          padding: 0.4rem 0.9rem 0.4rem 0.5rem;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
          box-shadow:
            inset 0 1px 0 rgba(148, 163, 184, 0.18),
            0 8px 18px rgba(2, 6, 23, 0.35);
        }
        .cart-button:hover {
          transform: translateY(-2px);
          border-color: #60a5fa;
          box-shadow:
            inset 0 1px 0 rgba(148, 163, 184, 0.22),
            0 12px 24px rgba(2, 6, 23, 0.45);
        }
        .cart-button:active {
          transform: translateY(0);
        }
        .cart-icon-wrap {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(13, 110, 253, 0.18);
          color: #93c5fd;
        }
        .cart-label {
          color: #e2e8f0;
          font-weight: 600;
          font-size: 0.9rem;
          letter-spacing: 0.01em;
        }
        .cart-count {
          background: #ef4444;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.75rem;
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #111827;
        }
        .login-button {
          background: linear-gradient(135deg, #0d6efd 0%, #1d4ed8 100%);
          border: none;
          color: #eff6ff;
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 6px 18px rgba(13, 110, 253, 0.35);
          text-decoration: none;
          display: inline-block;
        }
        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(13, 110, 253, 0.45);
          color: #eff6ff;
        }
        .user-greeting-hover:hover {
          background: rgba(148, 163, 184, 0.2) !important;
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
                color: "#bfdbfe",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, #0d6efd 0%, #1d4ed8 100%)",
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
                  color: "#bfdbfe",
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
                color: "#93c5fd",
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
                <a href="/" className="nav-link-main">
                  Home
                </a>

                {/* Top sale Dropdown */}
                <div
                  className="nav-item"
                  onMouseEnter={() => handleMouseEnter("topsale")}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href="/f/laptop"
                    className="nav-link-main"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("topsale");
                      }
                    }}
                    style={{ cursor: "pointer" }}
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
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Smartphone Sale
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Laptop Sale
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Accessories Sale
                    </a>
                    <a
                      href="/f/laptop"
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
                    href="/f/laptop"
                    className="nav-link-main"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("special");
                      }
                    }}
                    style={{ cursor: "pointer" }}
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
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Weekly Deals
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Monthly Offers
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Clearance Sale
                    </a>
                    <a
                      href="/f/laptop"
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
                    href="/f/laptop"
                    className="nav-link-main"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("newphones");
                      }
                    }}
                    style={{ cursor: "pointer" }}
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
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      iPhone Series
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Samsung Galaxy
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Xiaomi
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      OPPO
                    </a>
                    <a
                      href="/f/laptop"
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
                    href="/f/laptop"
                    className="nav-link-main"
                    onClick={(e) => {
                      if (window.innerWidth <= 992) {
                        e.preventDefault();
                        toggleDropdown("blogs");
                      }
                    }}
                    style={{ cursor: "pointer" }}
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
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Tech News
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Reviews
                    </a>
                    <a href="/f/laptop" style={dropdownItemStyle}>
                      Tutorials
                    </a>
                    <a
                      href="/f/dien-thoai"
                      style={{ ...dropdownItemStyle, borderBottom: "none" }}
                    >
                      Tips & Tricks
                    </a>
                  </div>
                </div>

                <a href="/cart" className="nav-link-main">
                  Cart
                </a>

                {/* Search Input */}
                <input
                  type="text"
                  className="search-input-mobile"
                  style={{
                    backgroundColor: "#0f172a",
                    color: "#e2e8f0",
                    borderRadius: "25px",
                    padding: "0.6rem 1.2rem",
                    border: "1px solid #1e293b",
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
                <a
                  href="/cart"
                  className="cart-button"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <span className="cart-icon-wrap" aria-hidden="true">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 4H5L7.2 14.2C7.29 14.62 7.52 15 7.86 15.28C8.2 15.56 8.62 15.71 9.06 15.7H18.4C18.82 15.7 19.23 15.56 19.57 15.29C19.9 15.02 20.13 14.65 20.23 14.24L21.5 8.9C21.56 8.66 21.57 8.4 21.51 8.16C21.44 7.92 21.3 7.7 21.1 7.55C20.9 7.39 20.66 7.31 20.4 7.3H6.1"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="9.5" cy="19" r="1.35" fill="currentColor" />
                      <circle cx="17" cy="19" r="1.35" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="cart-label">Giỏ hàng</span>
                  <div className="cart-count">{CartList?.length || 0}</div>
                </a>

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
                        background: "rgba(148, 163, 184, 0.14)",
                        border: "1px solid rgba(148, 163, 184, 0.24)",
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
                            "linear-gradient(135deg, #0d6efd 0%, #1d4ed8 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontWeight: "bold",
                          fontSize: "0.9rem",
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span style={{ color: "#eff6ff", fontWeight: "600" }}>
                        {user.name}
                      </span>
                      <span style={{ color: "#93c5fd", fontSize: "0.8rem" }}>
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
                        href="/profile"
                        style={dropdownItemStyle}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#1e293b")
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
                        href="/order-history"
                        style={dropdownItemStyle}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#1e293b")
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
                          ).style.backgroundColor = "#1e293b")
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
                          ).style.backgroundColor = "#1e293b")
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
                          handleLogout();
                        }}
                        style={{
                          ...dropdownItemStyle,
                          borderBottom: "none",
                          color: "#ff6b6b",
                        }}
                        onMouseOver={(e: MouseEvent<HTMLAnchorElement>) =>
                          ((
                            e.target as HTMLAnchorElement
                          ).style.backgroundColor = "#1e293b")
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
