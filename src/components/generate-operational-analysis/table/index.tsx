import styles from "./styles.module.scss";

import { useState } from "react";
import { AnalysisProduct, ProductType } from "src/@types";
import { TableRow } from "./table-row";
import React from "react";

type AnalysisTableProps = {
  products: ProductType[];
  category: string;
};

export const AnalysisTable = ({ products, category }: AnalysisTableProps) => {
  const [analysisProducts, setAnalysisProducts] = useState<AnalysisProduct[]>(
    []
  );

  const handleSaveAnalysisProduct = (product: AnalysisProduct) => {
    const existingProduct = analysisProducts.find((p) => p.id === product.id);
    let newProducts = [];
    if (existingProduct) {
      newProducts = analysisProducts.map((p) => {
        if (p.id === existingProduct.id) {
          return product;
        }
        return p;
      });
      setAnalysisProducts(newProducts);
    } else {
      newProducts = [...analysisProducts, product];
      setAnalysisProducts(newProducts);
    }
    localStorage.setItem(
      `analysisProducts-${category}`,
      JSON.stringify(newProducts)
    );
  };

  const handleRemoveAnalysisProduct = (product: AnalysisProduct) => {
    const newProducts = analysisProducts.filter((p) => p.id !== product.id);
    setAnalysisProducts(newProducts);
    localStorage.setItem(
      `analysisProducts-${category}`,
      JSON.stringify(newProducts)
    );
  };

  React.useEffect(() => {
    const products = localStorage.getItem(`analysisProducts-${category}`);
    if (products) {
      setAnalysisProducts(JSON.parse(products));
    }
  }, [category]);

  const availableProducts = products.filter(
    (p) => !analysisProducts.find((ap) => ap.id === p.id)
  );

  return (
    <div className={styles.analysisTable}>
      <div className={styles.head}>
        <div data-small={category === "CXA" || category === "FRN"}>
          <p>N°</p>
          <p>Corte da carne</p>
          <p>{category === "CXA" ? "Peso" : "Peso do corte"}</p>
          {(category === "CXA" || category === "FRN") &&
            "Preço do Kg Cobrado pelo Frigorífico"}
          <p>Preço do KG para venda</p>
          <p />
        </div>
      </div>
      <div className={styles.body}>
        {analysisProducts.map((analysisProduct, index) => {
          return (
            <TableRow
              availableProducts={availableProducts}
              rowNumber={index + 1}
              product={analysisProduct}
              key={`product-${analysisProduct.id}`}
              handleSaveAnalysisProduct={handleSaveAnalysisProduct}
              handleRemoveAnalysisProduct={handleRemoveAnalysisProduct}
              category={category}
            />
          );
        })}
        <TableRow
          category={category}
          availableProducts={availableProducts}
          handleSaveAnalysisProduct={handleSaveAnalysisProduct}
          handleRemoveAnalysisProduct={handleRemoveAnalysisProduct}
        />
      </div>
    </div>
  );
};
