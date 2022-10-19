import { ParsedAnalysisProduct } from "src/@types";
import { products } from "src/services";
import styles from "./styles.module.scss";

type AnalysisTableProps = {
  products: ParsedAnalysisProduct[] | undefined;
};

export const AnalysisTable = ({ products }: AnalysisTableProps) => {
  return (
    <table className={styles.analysisTable}>
      <thead>
        <tr>
          <th>N°</th>
          <th>Corte da Carne</th>
          <th>Peso Corte</th>
          <th>Rendimento em % após desossa</th>
          <th>Preço do KG cobrado pelo frígorifico</th>
          <th>Preço real do KG pago ao frígorifico</th>
          <th>Preço real do corte pago ao frígorifico</th>
          <th>Margem custo markup</th>
          <th>Margem venda markdown</th>
          <th>Preço do KG para venda</th>
          <th>Faturamento venda</th>
          <th>Margem de contribuição</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          return (
            <tr key={`product-${index}`}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>KG {product.weight}</td>
              <td>{product.percentageAfterBoning}%</td>
              <td>{product.priceChargedByFrig}</td>
              <td>{product.realKgPriceChargedBy}</td>
              <td>{product.realPricePayedToFrig}</td>
              <td>{product.markup}</td>
              <td>{product.markdown}%</td>
              <td>{product.price}</td>
              <td>{product.invoicing}</td>
              <td>{product.contributionPercentage}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
