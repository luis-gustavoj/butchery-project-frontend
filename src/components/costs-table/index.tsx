import TrashIcon from "@svg/trash-icon.svg";
import EditIcon from "@svg/edit-icon.svg";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import { CostModal } from "../costs-modal";
import { Cost } from "src/@types";
import { parseToCurrency } from "src/utils/parseToCurrency";

interface CostsTableProps {
  costs: Cost[];
  handleAddCost: (cost: Cost) => void;
  handleDeleteCost: (id: string) => Promise<void>;
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
            <React.Fragment key={cost.name}>
              <tr>
                <td>{cost.name}</td>
                <td>{cost.type === "FIXED" ? "Fixo" : "Variável"}</td>
                <td>{parseToCurrency(Number(cost.value))}</td>
                <td className={styles.actionsContainer}>
                  <button type="button" onClick={() => handleOpenModal()}>
                    <EditIcon />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteCost(cost.id)}
                  >
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
