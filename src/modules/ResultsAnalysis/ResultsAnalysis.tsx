import { useState } from "react";
import { SelectInput } from "src/components/input/select-input";
import { OperationAnalysis } from "src/components/results-operational-analysis";
import { Tabs } from "src/components/tabs";
import { TabContainer } from "src/components/tabs/tab-container";
import { useAuthContext } from "src/contexts/AuthContext";
import { useReportsQuery } from "src/hooks/useReports";
import { useSelectReportsQuery } from "src/hooks/useSelectReportsQuery";
import { Layout } from "../layout";
import InfoIcon from "@svg/info-icon.svg";
import styles from "./styles.module.scss";

export const ResultsAnalysisModule = () => {
  const [selectedReport, setSelectedReport] = useState("");
  const { user } = useAuthContext();
  const { data } = useReportsQuery(user?.id, selectedReport);
  const { data: selectOptions } = useSelectReportsQuery(user?.id);

  return (
    <Layout>
      <div className={styles.titleContainer}>
        <h1>Análise de rendimento</h1>
        <SelectInput
          placeholder="Selecione um relatório"
          name="select-report"
          value={selectedReport}
          options={selectOptions}
          onSelectOption={(_, v) => setSelectedReport(v)}
        />
      </div>
      {data?.data ? (
        <Tabs containerClassName={styles.tabsContainer}>
          {data.data["BOV"] && (
            <TabContainer label="Bovino" className={styles.tabContainer}>
              <OperationAnalysis category="BOV" report={data.data["BOV"]} />
            </TabContainer>
          )}
          {data.data["SUI"] && (
            <TabContainer label="Suíno" className={styles.tabContainer}>
              <OperationAnalysis category="SUI" report={data.data["SUI"]} />
            </TabContainer>
          )}
          {data.data["FRN"] && (
            <TabContainer label="Aves" className={styles.tabContainer}>
              <OperationAnalysis category={"FRN"} report={data.data["FRN"]} />
            </TabContainer>
          )}
          {data.data["CXA"] && (
            <TabContainer label="Caixaria" className={styles.tabContainer}>
              <OperationAnalysis category={"CXA"} report={data.data["CXA"]} />
            </TabContainer>
          )}
        </Tabs>
      ) : (
        <div className={styles.noDataSelected}>
          <InfoIcon />
          <p>Selecione um relatório para visualizar</p>
        </div>
      )}
    </Layout>
  );
};
