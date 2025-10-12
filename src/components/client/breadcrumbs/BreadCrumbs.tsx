import { Link, useLocation } from "react-router-dom";
import React from "react";

const styles: { [k: string]: React.CSSProperties } = {
  nav: {
    padding: "12px 0",
    fontSize: 14,
  },
  list: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    listStyle: "none",
    padding: 0,
    margin: 0,
    flexWrap: "wrap",
  },
  item: {
    display: "flex",
    alignItems: "center",
    color: "#5a6470",
    whiteSpace: "nowrap",
  },
  link: {
    color: "#1f6feb",
    textDecoration: "none",
  },
  linkHover: {
    textDecoration: "underline",
  },
  current: {
    color: "#222",
    fontWeight: 600,
  },
  separator: {
    margin: "0 6px",
    color: "#c9ced4",
  },
};

const formatLabel = (value: string) =>
  decodeURIComponent(value)
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav aria-label="breadcrumb" style={styles.nav}>
      <ol style={styles.list}>
        <li style={styles.item}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          {pathnames.length > 0 && <span style={styles.separator}>›</span>}
        </li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = formatLabel(value);

          return (
            <li key={to} style={styles.item}>
              {last ? (
                <span style={{ ...styles.current }}>
                  {label === "Cart" ? "Giỏ hàng" : label}
                </span>
              ) : (
                <>
                  <Link to={to} style={styles.link}>
                    {label}
                  </Link>
                  <span style={styles.separator}>›</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
