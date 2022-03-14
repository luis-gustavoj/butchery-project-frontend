// Components
import { SearchInput } from "../input/search-input";

// Styles
import styles from "./styles.module.scss";
import { ProductsTable } from "./products-table";

// Types
interface ProductsContainerProps {
  products: {
    name: string;
    type: string;
    id: string;
  }[];
  category?: string;
}

export const ProductsContainer = ({
  products,
  category,
}: ProductsContainerProps) => {
  return (
    <div className={styles.productsContainer}>
      <div className={styles.filterContainer}>
        <SearchInput type="text" placeholder="Procure items pelo nome" />
      </div>
      <div className={styles.tableContainer}>
        <ProductsTable products={products} category={category} />
      </div>
    </div>
  );
};
