import joinClassnames from "classnames";
import { cloneElement } from "react";

// Components
import Link from "next/link";

// Styles
import styles from "./styles.module.scss";

// Types
interface MenuItemProps {
  icon?: JSX.Element;
  href: string;
  children: string;
  collapsed: boolean;
  active: boolean;
}

export const MenuItem = ({
  icon,
  children,
  href,
  collapsed,
  active,
}: MenuItemProps) => {
  const menuItensClassnames = joinClassnames(styles.menuItem, {
    [styles.collapsed]: collapsed,
    [styles.active]: active,
  });

  return (
    <Link href={href}>
      <a className={menuItensClassnames}>
        <span className={styles.iconContainer}>{cloneElement(icon)}</span>
        {!collapsed && <span>{children}</span>}
      </a>
    </Link>
  );
};
