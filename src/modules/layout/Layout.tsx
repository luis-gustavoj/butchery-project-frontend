// Components
import { Sidebar } from "src/components/sidebar";

// Styles
import styles from "./styles.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.pageContainer}>
      <Sidebar />
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
};
