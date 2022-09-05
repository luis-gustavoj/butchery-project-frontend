import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { CostModal } from "../costs-modal";
import { Cost } from "src/@types";

interface CostsTableProps {
  costs: Cost[];
  handleAddCost: (cost: Cost) => void;
  handleDeleteCost: (cost: Cost) => void;
}

export const CostsTable = ({
  costs,
  handleAddCost,
  handleDeleteCost,
}: CostsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <table className={styles.costsTable}>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tipo</th>
          <th>Valor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {costs !== null &&
          costs?.map((cost) => (
            <React.Fragment key={cost.description}>
              <tr>
                <td>{cost.description}</td>
                <td>{cost.type === "fixed" ? "Fixo" : "Variável"}</td>
                <td>{cost.value}</td>
                <td className={styles.actionsContainer}>
                  <button type="button" onClick={() => handleOpenModal()}>
                    <EditIcon />
                  </button>
                  <button type="button" onClick={() => handleDeleteCost(cost)}>
                    <TrashIcon />
                  </button>
                </td>
              </tr>
              <CostModal
                initialValue={cost}
                handleAddCost={handleAddCost}
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
              />
            </React.Fragment>
          ))}
      </tbody>
    </table>
  );
};
