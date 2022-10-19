import { OperationAnalysis } from "src/components/results-operational-analysis";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { useAuthContext } from "src/contexts/AuthContext";
import { useReportsQuery } from "src/hooks/useReports";
import { Layout } from "../layout";
import styles from "./styles.module.scss";

export const ResultsAnalysisModule = () => {
  const { user } = useAuthContext();
  const { data } = useReportsQuery(user?.id);

  console.log(data);

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Análise de rendimento</h1>
      </div>
      {data?.data && (
        <Tabs containerClassName={styles.tabsContainer}>
          {data.data["BOV"] && (
            <TabContainer label="Bovino" className={styles.tabContainer}>
              <OperationAnalysis report={data.data["BOV"]} />
            </TabContainer>
          )}
          {data.data["SUI"] && (
            <TabContainer label="Suíno" className={styles.tabContainer}>
              <OperationAnalysis report={data.data["SUI"]} />
            </TabContainer>
          )}
          {data.data["FRN"] && (
            <TabContainer label="Aves" className={styles.tabContainer}>
              <OperationAnalysis report={data.data["FRN"]} />
            </TabContainer>
          )}
          {data.data["CXA"] && (
            <TabContainer label="Caixaria" className={styles.tabContainer}>
              <OperationAnalysis report={data.data["CXA"]} />
            </TabContainer>
          )}
        </Tabs>
      )}
    </Layout>
  );
};
