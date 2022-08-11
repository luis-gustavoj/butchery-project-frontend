import { OperationAnalysis } from "src/components/generate-operational-analysis";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { Layout } from "../layout";
import styles from "./styles.module.scss";

export const AnalysisModule = () => {
  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Análise de rendimento</h1>
      </div>
      <Tabs containerClassName={styles.tabsContainer}>
        <TabContainer label="Bovino" className={styles.tabContainer}>
          <OperationAnalysis />
        </TabContainer>
        <TabContainer label="Suíno" className={styles.tabContainer}>
          <OperationAnalysis />
        </TabContainer>
        <TabContainer label="Aves" className={styles.tabContainer}>
          <OperationAnalysis />
        </TabContainer>
        <TabContainer label="Caixaria" className={styles.tabContainer}>
          <OperationAnalysis />
        </TabContainer>
      </Tabs>
    </Layout>
  );
};
