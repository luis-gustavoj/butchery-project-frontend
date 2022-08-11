import { Input } from "src/components/input";
import styles from "./styles.module.scss";

export const Panel = () => {
  return (
    <div className={styles.panelContainer}>
      <div>
        <h3>1. Dados de entrada</h3>
        <div className={styles.inputDataContainer}>
          <label>Peso da peça:</label>
          <Input type="number" />
        </div>
        <div className={styles.inputDataContainer}>
          <label>Preço do frigorífico:</label>
          <Input type="number" />
        </div>
        <div className={styles.inputDataContainer}>
          <p>Total Cobrado Frigorífico:</p>
          <p>R$ 3.995,00</p>
        </div>
      </div>
    </div>
  );
};
