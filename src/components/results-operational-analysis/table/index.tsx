import styles from "./styles.module.scss";

const MOCKED_PRODUCT = {
  name: "Chuleta bovina",
  weight: 18.25,
  revenue: 10.74,
  cost: 23.5,
  realCost: 29.81,
  payedPrice: 544.08,
  markup: 24,
  markdown: 19.38,
  sellPrice: 36.98,
  sellBilling: 674.89,
  contributionMargin: 24,
};

export const AnalysisTable = () => {
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
        {Array(2)
          .fill(0)
          .map((_, index) => {
            return (
              <tr key={`product-${index}`}>
                <td>{index + 1}</td>
                <td>{MOCKED_PRODUCT.name}</td>
                <td>KG {MOCKED_PRODUCT.weight}</td>
                <td>{MOCKED_PRODUCT.revenue}%</td>
                <td>R$ {MOCKED_PRODUCT.cost}</td>
                <td>R$ {MOCKED_PRODUCT.realCost}</td>
                <td>R$ {MOCKED_PRODUCT.payedPrice}</td>
                <td>{MOCKED_PRODUCT.markup}%</td>
                <td>{MOCKED_PRODUCT.markdown}%</td>
                <td>R$ {MOCKED_PRODUCT.sellPrice}</td>
                <td>R$ {MOCKED_PRODUCT.sellBilling}</td>
                <td>{MOCKED_PRODUCT.contributionMargin}%</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};
