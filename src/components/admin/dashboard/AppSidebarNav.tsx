import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import { CBadge, CNavLink, CSidebarNav } from "@coreui/react";
import type {
  NavigationItem,
  Badge,
  AppSidebarNavProps,
} from "../../../type/navigation";

export const AppSidebarNav: React.FC<AppSidebarNavProps> = ({ items }) => {
  const navLink = (
    name?: string | React.ReactNode,
    icon?: React.ReactNode,
    badge?: Badge,
    indent: boolean = false
  ) => (
    <>
      {icon
        ? icon
        : indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )}
      {name && name}
      {badge && (
        <CBadge color={badge.color} className="ms-auto" size="sm">
          {badge.text}
        </CBadge>
      )}
    </>
  );

  const renderNavigationItem = (
    item: NavigationItem,
    index: number,
    indent = false
  ): React.ReactElement => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;

    // Handle CNavTitle (dividers)
    if (
      "items" in item === false &&
      "to" in item === false &&
      "href" in item === false
    ) {
      return <Component key={index}>{name}</Component>;
    }

    // Handle CNavGroup (with nested items)
    if ("items" in item && item.items) {
      return (
        <Component
          compact
          as="div"
          key={index}
          toggler={navLink(name, icon)}
          {...rest}
        >
          {item.items.map((subItem, subIndex) =>
            renderNavigationItem(subItem, subIndex, true)
          )}
        </Component>
      );
    }

    // Handle CNavItem (leaf items)
    return (
      <Component as="div" key={index}>
        {rest.to || rest.href ? (
          <CNavLink
            {...(rest.to && { as: NavLink })}
            {...(rest.href && { target: "_blank", rel: "noopener noreferrer" })}
            {...rest}
          >
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items?.map((item, index) => renderNavigationItem(item, index))}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
