import styles from "./styles.module.scss";

import { useState } from "react";
import { AnalysisProduct } from "src/@types";
import { TableRow } from "./table-row";

export const AnalysisTable = () => {
  const [analysisProducts, setAnalysisProducts] = useState<AnalysisProduct[]>(
    []
  );

  const handleSaveAnalysisProduct = (product: AnalysisProduct) => {
    const existingProduct = analysisProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      const newProducts = analysisProducts.map((p) => {
        if (p.id === product.id) {
          return product;
        }
        return p;
      });
      setAnalysisProducts(newProducts);
    } else {
      setAnalysisProducts([...analysisProducts, product]);
    }
  };

  const handleRemoveAnalysisProduct = (product: AnalysisProduct) => {
    setAnalysisProducts(analysisProducts.filter((p) => p.id !== product.id));
  };

  return (
    <div className={styles.analysisTable}>
      <div className={styles.head}>
        <div>
          <p>N°</p>
          <p>Corte da carne</p>
          <p>Peso do corte</p>
          <p>Preço do KG para venda</p>
          <p />
        </div>
      </div>
      <div className={styles.body}>
        {analysisProducts.map((analysisProduct, index) => {
          return (
            <TableRow
              rowNumber={index + 1}
              product={analysisProduct}
              key={`product-${analysisProduct.id}`}
              handleSaveAnalysisProduct={handleSaveAnalysisProduct}
              handleRemoveAnalysisProduct={handleRemoveAnalysisProduct}
            />
          );
        })}
        <TableRow
          handleSaveAnalysisProduct={handleSaveAnalysisProduct}
          handleRemoveAnalysisProduct={handleRemoveAnalysisProduct}
        />
      </div>
    </div>
  );
};
