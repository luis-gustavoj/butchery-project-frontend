// Icons
import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";

// Styles
import styles from "./styles.module.scss";
import { ProductModal } from "src/components/product-modal";
import React, { useState } from "react";

// Types
interface ProductsTableProps {
  products: {
    name: string;
    type: string;
    id: string;
  }[];
  category?: string;
}

export const ProductsTable = ({ products, category }: ProductsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>Nome do corte</th>
          {category === "BOV" && <th>Tipo</th>}
          <th></th>
        </tr>
      </thead>
      <tbody>
        {products !== null &&
          products?.map((product) => (
            <React.Fragment key={product?.id}>
              <tr>
                <td>{product?.name}</td>
                {product.type && <td>{product?.type}</td>}
                <td className={styles.actionsContainer}>
                  <button type="button" onClick={() => handleOpenModal()}>
                    <EditIcon />
                  </button>
                  <button type="button">
                    <TrashIcon />
                  </button>
                </td>
              </tr>
              <ProductModal
                product={{ ...product, category }}
                isEditing
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
              />
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};
