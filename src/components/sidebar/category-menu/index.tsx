import joinClassnames from "classnames";

// Styles
import styles from "./styles.module.scss";

// Types
interface CategoryMenuProps {
  children: React.ReactNode;
  title?: string;
  collapsed: boolean;
}

export const CategoryMenu = ({
  children,
  title,
  collapsed,
}: CategoryMenuProps) => {
  const categoryMenuItens = joinClassnames(styles.categoryMenu, {
    [styles.collapsed]: collapsed,
  });

  return (
    <div className={categoryMenuItens}>
      <p className={styles.categoryTitle}>{title}</p>
      <div className={styles.categoryItems}>{children}</div>
    </div>
  );
};
