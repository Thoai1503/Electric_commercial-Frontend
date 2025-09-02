import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import { logo } from "../../../assets/brand/logo";
import { sygnet } from "../../../assets/brand/sygnet";

// sidebar nav config
import navigation from "../../../_nav";

export interface Badge {
  color: string;
  text: string;
}

export interface Item {
  component: React.ElementType;
  name?: string | React.ReactNode; // cho phép JSX
  icon?: React.ReactNode;
  badge?: Badge;
  to?: string;
  href?: string;
  items?: Item[];
  [key: string]: any; // giữ cho các props khác của CoreUI
}
export interface AppSidebarNavProps {
  items: Item[];
}

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state: any) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state: any) => state.app.sidebarShow);

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={32} />
          <CIcon
            customClassName="sidebar-brand-narrow"
            icon={sygnet}
            height={32}
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() =>
            dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
