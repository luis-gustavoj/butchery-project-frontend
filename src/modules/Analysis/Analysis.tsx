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

const CATEGORIES = ["BOV", "SUI", "FRN", "CXA"];

export const AnalysisModule = () => {
  const { user } = useAuthContext();
  const { data } = useProductsQuery(user?.id);

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
    await reports.create({
      userID: user?.id,
      reportData: reportData,
    });
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
    </Layout>
  );
};
