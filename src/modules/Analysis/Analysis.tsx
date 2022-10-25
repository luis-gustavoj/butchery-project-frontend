import { Button } from "src/components/button";
import { OperationAnalysis } from "src/components/generate-operational-analysis";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { useAuthContext } from "src/contexts/AuthContext";
import { useProductsQuery } from "src/hooks/useProducts";
import { Layout } from "../layout";
import styles from "./styles.module.scss";
import SaveIcon from "@svg/save-icon.svg";
import { reports } from "src/services";
import toast from "react-hot-toast";
import { useState } from "react";
import { queryClient } from "src/provider/ReactQueryProvider";

const CATEGORIES = ["BOV", "SUI", "FRN", "CXA"];

export const AnalysisModule = () => {
  const { user } = useAuthContext();
  const { data } = useProductsQuery(user?.id);
  const [success, setSuccess] = useState(false);

  const bovProducts = data?.data.filter(
    (product) => product.category === "BOV"
  );
  const suiProducts = data?.data.filter(
    (product) => product.category === "SUI"
  );
  const frnProducts = data?.data.filter(
    (product) => product.category === "FRN"
  );
  const cxaProducts = data?.data.filter(
    (product) => product.category === "CXA"
  );

  const handleSaveAnalysis = async () => {
    const reportData = CATEGORIES.reduce((acc, category) => {
      const products = localStorage.getItem(`analysisProducts-${category}`);
      const totalWeight = localStorage.getItem(`totalWeight-${category}`);
      const totalPrice = localStorage.getItem(`totalPrice-${category}`);
      const parsedProducts = JSON.parse(products || "[]");
      return {
        ...acc,
        [category]: {
          products: parsedProducts,
          totalWeight: Number(totalWeight),
          totalPrice: Number(totalPrice),
        },
      };
    }, {});
    toast.promise(
      reports.create({
        userID: user?.id,
        reportData: reportData,
      }),
      {
        success: () => {
          CATEGORIES.forEach((category) => {
            localStorage.removeItem(`analysisProducts-${category}`);
            localStorage.removeItem(`totalWeight-${category}`);
            localStorage.removeItem(`totalPrice-${category}`);
          });

          setSuccess((prev) => !prev);
          setSuccess((prev) => !prev);
          queryClient.invalidateQueries(["select-reports"]);

          return "Análise salva com sucesso!";
        },
        error: () => "Erro ao salvar análise",
        loading: "Salvando análise...",
      }
    );
  };

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Análise de rendimento</h1>
        <Button type="button" onClick={handleSaveAnalysis}>
          <SaveIcon />
          <span>Salvar análise</span>
        </Button>
      </div>
      {!success && (
        <Tabs containerClassName={styles.tabsContainer}>
          <TabContainer label="Bovino" className={styles.tabContainer}>
            <OperationAnalysis products={bovProducts} category="BOV" />
          </TabContainer>
          <TabContainer label="Suíno" className={styles.tabContainer}>
            <OperationAnalysis products={suiProducts} category="SUI" />
          </TabContainer>
          <TabContainer label="Aves" className={styles.tabContainer}>
            <OperationAnalysis products={frnProducts} category="FRN" />
          </TabContainer>
          <TabContainer label="Caixaria" className={styles.tabContainer}>
            <OperationAnalysis products={cxaProducts} category="CXA" />
          </TabContainer>
        </Tabs>
      )}
    </Layout>
  );
};
