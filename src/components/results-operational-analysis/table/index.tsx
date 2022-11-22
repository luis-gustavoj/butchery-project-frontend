import { format } from "path";
import { ParsedAnalysisProduct } from "src/@types";
import { products } from "src/services";
import { formatAsCurrency } from "src/utils/formatAsCurrency";
import { formatAsPercent } from "src/utils/formatAsPercentage";
import styles from "./styles.module.scss";

type AnalysisTableProps = {
  category: string;
  products: ParsedAnalysisProduct[] | undefined;
  panelInfo: {
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
};

export const AnalysisTable = ({
  panelInfo,
  products,
  category,
}: AnalysisTableProps) => {
  return (
    <table className={styles.analysisTable}>
      <thead>
        <tr>
          {category === "BOV" || category === "SUI" ? (
            <>
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
            </>
          ) : (
            <>
              <th>N°</th>
              <th>{category === "FRN" ? "Cortes de Frango" : "Caixaria"}</th>
              <th>{category === "FRN" ? "Peso Corte" : "Peso"}</th>
              <th>Preço do Kg Cobrado pelo Frigorífico</th>
              <th>% Quebra</th>
              <th>Residual (Kg)</th>
              <th>Preço Real do Kg pago ao Frigorífico</th>
              <th>Total Real pago ao Frigorífico</th>
              <th>Margem Custo Markup</th>
              <th>Margem Venda Markdow</th>
              <th>Preço do Kg para Venda</th>
              <th>Faturamento Venda</th>
              <th>Margem de contribuição</th>
            </>
          )}
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) =>
          category === "BOV" || category === "SUI" ? (
            <tr key={`product-${index}`}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>KG {product.weight}</td>
              <td>{product.percentageAfterBoning}</td>
              <td>{product.priceChargedByFrig}</td>
              <td>{product.realKgPriceChargedBy}</td>
              <td>{product.realPricePayedToFrig}</td>
              <td>{product.markup}</td>
              <td>{product.markdown}</td>
              <td>{product.price}</td>
              <td>{product.invoicing}</td>
              <td>{product.contributionPercentage}</td>
            </tr>
          ) : (
            <tr key={`product-${index}`}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>KG {product.weight}</td>
              <td>{product.payedPrice}</td>
              <td>{product.breakPercentage}</td>
              <td>{product.residuary}</td>
              <td>{formatAsCurrency(product.realKgPayedToFrig)}</td>
              <td>{formatAsCurrency(product.realTotalKgPayedToFrig)}</td>
              <td>{product.markup}</td>
              <td>{product.markdown}</td>
              <td>{product.price}</td>
              <td>{product.invoicing}</td>
              <td>{product.contributionValue}</td>
            </tr>
          )
        )}
      </tbody>
      <tfoot>
        <tr>
          <td />
          <td>Total dos cortes</td>
          <td>{panelInfo.totalWeightAfterBoning.toFixed(3)}</td>
          {(category === "CXA" || category === "FRN") && <td />}
          <td>
            {category === "CXA" || category === "FRN"
              ? formatAsPercent(panelInfo.invisibleLoss / 100)
              : panelInfo.revenueAfterBoningPercent}
          </td>
          <td>
            {(category === "CXA" || category === "FRN") &&
              panelInfo.utilizationRate}
          </td>
          <td />
          <td>
            {category === "CXA" || category === "FRN"
              ? formatAsCurrency(panelInfo.totalCost)
              : formatAsCurrency(panelInfo.totalChargedByFrig)}
          </td>
          <td></td>
          <td>
            {category === "CXA" || category === "FRN"
              ? formatAsPercent(
                  (panelInfo.revenue - panelInfo.totalCost) / panelInfo.revenue
                )
              : formatAsPercent(
                  (panelInfo.revenue - panelInfo.totalChargedByFrig) /
                    panelInfo.revenue
                )}
          </td>
          <td />
          <td>{formatAsCurrency(panelInfo.revenue)}</td>
          <td>
            {category === "CXA" || category === "FRN"
              ? formatAsPercent(panelInfo.revenue / panelInfo.totalCost - 1)
              : formatAsPercent(
                  panelInfo.revenue / panelInfo.totalChargedByFrig - 1
                )}
          </td>
        </tr>
        <tr>
          <td />
          <td />
          <td>
            {(category === "CXA" || category === "FRN") && "KG comprados"}
          </td>
          {(category === "CXA" || category === "FRN") && <td />}
          <td />
          <td>
            {(category === "CXA" || category === "FRN") &&
              "Índice de aproveitamento"}
          </td>
          <td />
          <td>
            {category === "CXA" || category === "FRN"
              ? "Custo total (R$)"
              : "Valor Real da Peça"}
          </td>
          <td />
          <td>Markdown</td>
          <td />
          <td>Faturamento Total</td>
          <td>Markup</td>
        </tr>
      </tfoot>
    </table>
  );
};
