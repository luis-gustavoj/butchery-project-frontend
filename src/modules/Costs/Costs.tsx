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
import toast from "react-hot-toast";

export const CostsModule = () => {
  const { user } = useAuthContext();
  const { data } = useCostsQuery(user?.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddCost = async (cost: Cost) => {
    await toast.promise(
      costs.create({
        ...cost,
        userID: user?.id,
      }),
      {
        loading: "Salvando...",
        success: () => {
          queryClient.invalidateQueries(["costs"]);
          return "Salvo com sucesso!";
        },
        error: "Erro ao salvar custo",
      }
    );
  };

  const handleDeleteCost = async (id: string) => {
    await toast.promise(costs.deleteCost(id), {
      loading: "Excluindo custo...",
      success: () => {
        queryClient.invalidateQueries(["costs"]);
        return "Custo excluído com sucesso!";
      },
      error: "Erro ao excluir custo",
    });
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
