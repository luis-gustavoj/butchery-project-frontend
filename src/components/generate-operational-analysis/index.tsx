import { ProductType } from "src/@types";
import { Panel } from "./panel";
import styles from "./styles.module.scss";
import { AnalysisTable } from "./table";

type OperationalAnalysisProps = {
  products: ProductType[];
  category: string;
};

export const OperationAnalysis = ({
  products,
  category,
}: OperationalAnalysisProps) => {
  const shouldShowPanel = ["BOV", "SUI"].includes(category);

  return (
    <div
      className={styles.operationalAnalysisContainer}
      data-panel={shouldShowPanel}
    >
      {shouldShowPanel && (
        <div>
          <h2>Painel</h2>
          <Panel category={category} />
        </div>
      )}
      <div>
        <h2>Cortes</h2>
        <div className={styles.container}>
          <div>
            {products && (
              <AnalysisTable products={products} category={category} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
