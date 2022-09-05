import { Button } from "src/components/button";
import { Layout } from "../layout";
import styles from "./styles.module.scss";
import PlusIcon from "@svg/plus-icon.svg";
import { useState } from "react";
import { CostModal } from "src/components/costs-modal";
import { Cost } from "src/@types";
import { CostsTable } from "src/components/costs-table";

export const CostsModule = () => {
  const [costs, setCosts] = useState<Cost[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddCost = (cost: Cost) => {
    setCosts([...costs, cost]);
  };

  const handleDeleteCost = (cost: Cost) => {
    const filteredCosts = costs.filter(
      (c) => c.description !== cost.description
    );
    setCosts(filteredCosts);
  };

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Cadastro de custos</h1>
        <Button type="button" onClick={handleToggleModal}>
          <PlusIcon />
          <span>Novo custo</span>
        </Button>
      </div>
      <div className={styles.costTableContainer}>
        <CostsTable
          costs={costs}
          handleAddCost={handleAddCost}
          handleDeleteCost={handleDeleteCost}
        />
      </div>
      <CostModal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        handleAddCost={handleAddCost}
      />
    </Layout>
  );
};
