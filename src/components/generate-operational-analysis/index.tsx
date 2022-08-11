import { Panel } from "./panel";
import styles from "./styles.module.scss";
import { AnalysisTable } from "./table";

export const OperationAnalysis = () => {
  return (
    <div className={styles.operationalAnalysisContainer}>
      <div>
        <h2>Painel</h2>
        <Panel />
      </div>
      <div>
        <h2>Cortes</h2>
        <div className={styles.container}>
          <div>
            <AnalysisTable />
          </div>
        </div>
      </div>
    </div>
  );
};
