// types/navigation.ts
import React from "react";
import { CNavItem, CNavGroup, CNavTitle } from "@coreui/react";

export interface Badge {
  color: string;
  text: string;
}

// Base interface for all navigation items
interface BaseNavigationItem {
  component:
    | typeof CNavItem
    | typeof CNavGroup
    | typeof CNavTitle
    | React.ElementType;
  name?: string | React.ReactNode;
  icon?: React.ReactNode;
  badge?: Badge;
  [key: string]: any; // Allow additional CoreUI props
}

// Navigation item with internal routing
interface NavItemWithTo extends BaseNavigationItem {
  component: typeof CNavItem;
  to: string;
  href?: never;
  items?: never;
}

// Navigation item with external link
interface NavItemWithHref extends BaseNavigationItem {
  component: typeof CNavItem;
  href: string;
  to?: never;
  items?: never;
}

// Navigation group with nested items
interface NavGroup extends BaseNavigationItem {
  component: typeof CNavGroup;
  items: NavigationItem[];
  to?: string; // Optional for groups
  href?: never;
}

// Navigation title/divider
interface NavTitle extends BaseNavigationItem {
  component: typeof CNavTitle;
  name: string | React.ReactNode;
  icon?: never;
  badge?: never;
  to?: never;
  href?: never;
  items?: never;
}

// Union type for all navigation item types
export type NavigationItem =
  | NavItemWithTo
  | NavItemWithHref
  | NavGroup
  | NavTitle;

export interface AppSidebarNavProps {
  items: NavigationItem[];
}

// Redux state types
export interface RootState {
  sidebarUnfoldable: boolean;
  sidebarShow: boolean;
}
