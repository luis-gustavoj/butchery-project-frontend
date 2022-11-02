import { ParsedAnalysisProduct } from "src/@types";
import { Panel } from "./panel";
import styles from "./styles.module.scss";
import { AnalysisTable } from "./table";

type OperationAnalysisProps = {
  category: string;
  report: {
    panel: {
      totalWeightAfterBoning: number;
      totalChargedByFrig: number;
      weightAfterInvisibleLoss: number;
      lossOnBoning: number;
      revenueAfterBoningPercent: string;
      totalWeight: number;
      totalPrice: number;
      invisibleLoss: number;
      revenue: number;
      utilizationRate: string;
      totalCost: number;
    };
    products: ParsedAnalysisProduct[];
  };
};

export const OperationAnalysis = ({
  report,
  category,
}: OperationAnalysisProps) => {
  return (
    <div
      className={styles.operationalAnalysisContainer}
      data-panel={category === "BOV" || category === "SUI"}
    >
      {(category === "BOV" || category === "SUI") && (
        <div>
          <h2>Painel</h2>
          <Panel panelInfo={report.panel} />
        </div>
      )}
      <div>
        <h2>Cortes</h2>
        <div className={styles.tableContainer}>
          <div>
            <AnalysisTable
              category={category}
              products={report.products}
              panelInfo={report.panel}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
