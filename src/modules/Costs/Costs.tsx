import { Button } from "src/components/button";
import { Layout } from "../layout";
import styles from "./styles.module.scss";
import PlusIcon from "@svg/plus-icon.svg";
import { useState } from "react";
import { CostModal } from "src/components/costs-modal";
import { Cost } from "src/@types";
import { CostsTable } from "src/components/costs-table";
import { useCostsQuery } from "src/hooks/useCosts";
import { costs } from "src/services";
import { useAuthContext } from "src/contexts/AuthContext";
import { queryClient } from "src/provider/ReactQueryProvider";

export const CostsModule = () => {
  const { user } = useAuthContext();
  const { data } = useCostsQuery(user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddCost = async (cost: Cost) => {
    const res = await costs.create({
      ...cost,
      userID: user?.id,
    });
    queryClient.invalidateQueries(["costs"]);
  };

  const handleDeleteCost = (cost: Cost) => {};

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
        {data?.data && (
          <CostsTable
            costs={data.data}
            handleAddCost={handleAddCost}
            handleDeleteCost={handleDeleteCost}
          />
        )}
      </div>
      <CostModal
        isOpen={isModalOpen}
        onRequestClose={handleToggleModal}
        handleAddCost={handleAddCost}
      />
    </Layout>
  );
};
function useAuth(): { user: any } {
  throw new Error("Function not implemented.");
}
