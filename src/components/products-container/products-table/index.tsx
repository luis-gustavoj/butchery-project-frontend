import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import styles from "./styles.module.scss";
import { ProductModal } from "src/components/product-modal";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { products as productsService } from "src/services";
import { queryClient } from "src/provider/ReactQueryProvider";

interface ProductsTableProps {
  products: {
    name: string;
    type: string;
    id: string;
  }[];
  category?: string;
}

export const ProductsTable = ({ products, category }: ProductsTableProps) => {
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  const handleOpenEditModal = (id: string) => {
    setEditingProduct(id);
  };

  const handleCloseModal = () => {
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id: string) => {
    await toast.promise(productsService.deleteProduct(id), {
      loading: "Excluindo produto...",
      success: "Produto excluído com sucesso!",
      error: "Erro ao excluir produto",
    });
    queryClient.invalidateQueries(["products"]);
  };

  return (
    <table className={styles.productsTable}>
      <thead>
        <tr>
          <th>Nome do corte</th>
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
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(product.id)}
                  >
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <TrashIcon />
                  </button>
                </td>
              </tr>
              <ProductModal
                key={product?.id}
                product={{ ...product, category }}
                isEditing
                isOpen={editingProduct === product.id}
                onRequestClose={handleCloseModal}
              />
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};
