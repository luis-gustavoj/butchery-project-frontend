import { ParsedAnalysisProduct } from "src/@types";
import { Panel } from "./panel";
import styles from "./styles.module.scss";
import { AnalysisTable } from "./table";

type OperationAnalysisProps = {
  report: {
    totalWeightAfterBoning: number | string;
    totalChargedByFrig: number | string;
    weightAfterInvisibleLoss: number | string;
    lossOnBoning: number | string;
    revenueAfterBoningPercent: number | string;
    products: ParsedAnalysisProduct[];
  };
};

export const OperationAnalysis = ({ report }: OperationAnalysisProps) => {
  return (
    <div className={styles.operationalAnalysisContainer}>
      <div>
        <h2>Painel</h2>
        <Panel />
      </div>
      <div>
        <h2>Cortes</h2>
        <div className={styles.tableContainer}>
          <div>
            <AnalysisTable products={report.products} />
          </div>
        </div>
      </div>
    </div>
  );
};
