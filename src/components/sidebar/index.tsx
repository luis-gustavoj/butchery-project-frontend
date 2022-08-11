import joinClassnames from "classnames";
import { useEffect, useState } from "react";

// Hooks
import { useWindowSize } from "src/hooks/useWindowSize";

// Components
import { CategoryMenu } from "./category-menu";
import { MenuItem } from "./menu-item";

// Icons
import ButcheryLogo from "@svg/butchery-logo.svg";
import LeftArrowIcon from "@svg/arrow-left.svg";
import RightArrowIcon from "@svg/arrow-right.svg";
import DashboardIcon from "@svg/home-icon.svg";
import ProductsIcon from "@svg/box-icon.svg";
import AnalyticsIcon from "@svg/stats-report-icon.svg";

// Styles
import styles from "./styles.module.scss";
import { useRouter } from "next/router";

// Sidebar menu items in array to map on items
const sideBarMenuItems = [
  {
    icon: <DashboardIcon />,
    link: "/gerenciamento/dashboard",
    description: "Dashboard",
  },
  {
    icon: <ProductsIcon />,
    link: "/gerenciamento/produtos",
    description: "Produtos",
  },
  {
    icon: <AnalyticsIcon />,
    link: "/gerenciamento/analise-de-rendimentos/gerar",
    description: "Gerar análise de rendimentos",
  },
  {
    icon: <AnalyticsIcon />,
    link: "/gerenciamento/analise-de-rendimentos/resultados",
    description: "Visualizar análise de rendimentos",
  },
];

export const Sidebar = () => {
  const { width } = useWindowSize();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const router = useRouter();

  const sideBarClassNames = joinClassnames(styles.sidebar, {
    [styles.collapsed]: isSidebarCollapsed,
  });

  const sideBarHeaderClassnames = joinClassnames(styles.sidebarHeader, {
    [styles.collapsed]: isSidebarCollapsed,
  });

  useEffect(() => {
    width > 1024 ? setIsSidebarCollapsed(false) : setIsSidebarCollapsed(true);
  }, [width]);

  const toggleCollapsed = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={sideBarClassNames}>
      <div className={sideBarHeaderClassnames}>
        {!isSidebarCollapsed && <ButcheryLogo className={styles.logo} />}
        <button type="button" onClick={() => toggleCollapsed()}>
          {isSidebarCollapsed ? <RightArrowIcon /> : <LeftArrowIcon />}
        </button>
      </div>
      <div className={styles.sidebarContent}>
        <CategoryMenu collapsed={isSidebarCollapsed}>
          {sideBarMenuItems.map((menuItem) => (
            <MenuItem
              active={menuItem.link === router.pathname}
              href={menuItem.link}
              icon={menuItem.icon}
              key={menuItem.link}
              collapsed={isSidebarCollapsed}
            >
              {menuItem.description}
            </MenuItem>
          ))}
        </CategoryMenu>
      </div>
      <div className={styles.sidebarFooter}></div>
    </div>
  );
};
