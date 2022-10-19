import React from "react";
import { useState } from "react";
import { Input } from "src/components/input";
import styles from "./styles.module.scss";

type PanelProps = {
  category: string;
};

export const Panel = ({ category }: PanelProps) => {
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  React.useEffect(() => {
    const totalWeight = localStorage.getItem(`totalWeight-${category}`);
    const totalPrice = localStorage.getItem(`totalPrice-${category}`);
    if (totalWeight) {
      setTotalWeight(Number(totalWeight));
    }
    if (totalPrice) {
      setTotalPrice(Number(totalPrice));
    }
  }, [category]);

  React.useEffect(() => {
    localStorage.setItem(`totalWeight-${category}`, totalWeight.toString());
    localStorage.setItem(`totalPrice-${category}`, totalPrice.toString());
  }, [totalWeight, totalPrice, category]);

  return (
    <div className={styles.panelContainer}>
      <div>
        <h3>1. Dados de entrada</h3>
        <div className={styles.inputDataContainer}>
          <label>Peso da peça:</label>
          <Input
            type="number"
            value={totalWeight}
            onChange={(e) => setTotalWeight(Number(e.target.value))}
          />
        </div>
        <div className={styles.inputDataContainer}>
          <label>Preço do frigorífico:</label>
          <Input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(Number(e.target.value))}
          />
        </div>
        <div className={styles.inputDataContainer}>
          <p>Total Cobrado Frigorífico:</p>
          <p>R$ 3.995,00</p>
        </div>
      </div>
    </div>
  );
};
