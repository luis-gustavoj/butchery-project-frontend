import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import styles from "./styles.module.scss";
import React, { useState } from "react";

export const UsersTable = () => {
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
          <th>Nome</th>
          <th>E-mail</th>
          <th>Criado em</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* {products !== null &&
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
            </React.Fragment>
          ))} */}
      </tbody>
    </table>
  );
};
