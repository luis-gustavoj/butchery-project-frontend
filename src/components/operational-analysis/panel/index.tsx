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
      <div>
        <h3>2. Reajuste</h3>
        <div className={styles.inputDataContainer}>
          <p>Percentual de quebra invisível:</p>
          <p>5,0%</p>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Após quebra invisível</p>
          <p>161,5 KG</p>
        </div>
      </div>
      <div>
        <h3>3. Manipulação da carne</h3>
        <div className={styles.inputDataContainer}>
          <p>Percentual de perda na desossa:</p>
          <p>16,2%</p>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Rendimento na desossa:</p>
          <table>
            <tr>
              <td>78,83</td>
              <td>%</td>
            </tr>
            <tr>
              <td>999,99</td>
              <td>KG</td>
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
              <td>78,83</td>
              <td>%</td>
            </tr>
            <tr>
              <td>999,99</td>
              <td>KG</td>
            </tr>
          </table>
        </div>
        <div className={styles.inputDataContainer}>
          <p>Custo real do KG da carne:</p>
          <p>R$ 9999,99</p>
        </div>
      </div>
    </div>
  );
};
