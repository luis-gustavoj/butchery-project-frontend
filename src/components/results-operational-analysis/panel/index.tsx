import { formatAsCurrency } from "src/utils/formatAsCurrency";
import { formatAsPercent } from "src/utils/formatAsPercentage";
import styles from "./styles.module.scss";

type PanelProps = {
  panelInfo: {
    totalWeightAfterBoning: number;
    totalChargedByFrig: number;
    weightAfterInvisibleLoss: number;
    lossOnBoning: number;
    revenueAfterBoningPercent: string;
    totalWeight: number;
    totalPrice: number;
    invisibleLoss: number;
  };
};

export const Panel = ({ panelInfo }: PanelProps) => {
  console.log(panelInfo);
  return (
    <div className={styles.panelContainer}>
      <div>
        <h3>1. Dados de entrada</h3>
        <div className={styles.inputDataContainer}>
          <p>Peso da peça:</p>
          <p>KG {panelInfo.totalWeight}</p>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Preço do frigorífico:</p>
          <p>{formatAsCurrency(panelInfo.totalPrice)}</p>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Total Cobrado Frigorífico:</p>
          <p>{formatAsCurrency(panelInfo.totalChargedByFrig)}</p>
        </div>
      </div>
      <div>
        <h3>2. Reajuste</h3>
        <div className={styles.inputDataContainer}>
          <p>Percentual de quebra invisível:</p>
          <p>{formatAsPercent(panelInfo.invisibleLoss / 100)}</p>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Após quebra invisível</p>
          <p>{panelInfo.weightAfterInvisibleLoss} KG</p>
        </div>
      </div>
      <div>
        <h3>3. Manipulação da carne</h3>
        <div className={styles.inputDataContainer}>
          <p>Percentual de perda na desossa:</p>
          <p>{String(panelInfo.lossOnBoning).slice(0, 4)}%</p>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Rendimento na desossa:</p>
          <table>
            <tr>
              <td>{panelInfo.totalWeightAfterBoning}</td>
              <td>KG</td>
            </tr>
            <tr>
              <td>
                {String(panelInfo.revenueAfterBoningPercent).replace("%", "")}
              </td>
              <td>%</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h3>4. Dados de saída</h3>
        <div className={styles.inputDataContainer}>
          <p>Aproveitamento da peça:</p>
          <table>
            <tr>
              <td>
                {String(panelInfo.revenueAfterBoningPercent).replace("%", "")}
              </td>
              <td>%</td>
            </tr>
            <tr>
              <td>{panelInfo.totalWeightAfterBoning}</td>
              <td>KG</td>
            </tr>
          </table>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Custo real do KG da carne:</p>
          <p>
            {formatAsCurrency(
              panelInfo.totalChargedByFrig / panelInfo.totalWeightAfterBoning
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
