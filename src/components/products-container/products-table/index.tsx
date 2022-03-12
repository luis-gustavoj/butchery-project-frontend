// Icons
import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";

// Styles
import styles from "./styles.module.scss";

// Types
interface ProductsTableProps {
  products: {
    name: string;
    type: string;
  }[];
  category?: string;
}

export const ProductsTable = ({ products, category }: ProductsTableProps) => {
  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>Nome do corte</th>
          {category === "Bovino" && <th>Tipo</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products !== null &&
          products?.map((product) => (
            <tr key={Math.random()}>
              <td>{product?.name}</td>
              {product.type && <td>{product?.type}</td>}
              <td className={styles.actionsContainer}>
                <button type="button">
                  <EditIcon />
                </button>
                <button type="button">
                  <TrashIcon />
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
