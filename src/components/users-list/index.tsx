import { SearchInput } from "../input/search-input";
import styles from "./styles.module.scss";
import { UsersTable } from "./users-table";

export const ProductsContainer = () => {
  return (
    <div className={styles.productsContainer}>
      <div className={styles.filterContainer}>
        <SearchInput type="text" placeholder="Procure items pelo nome" />
      </div>
      <div className={styles.tableContainer}>
        <UsersTable />
      </div>
    </div>
  );
};
