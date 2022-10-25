import { reports } from "./../services/requests/reports";
import { useQuery } from "@tanstack/react-query";
import { costs } from "src/services";

const checkIfIsFromCurrentMonth = (date: string, selectedMonth: string) => {
  const [_, month] = date.split("-");
  if (month === selectedMonth) return true;
  return false;
};

type Report = {
  products: {
    price: number;
    weight: number;
  }[];
};

type ReportResponse = {
  createdAt: string;
  reportData: {
    BOV: Report;
    SUI: Report;
    FRN: Report;
    CXA: Report;
  };
};

type Cost = {
  value: string;
  name: string;
  type: string;
};

const parseDataToChart = (costs: Cost[], reports: ReportResponse[]) => {
  const products = reports.reduce((acc, report) => {
    const { BOV, SUI, FRN, CXA } = report.reportData;
    const products = [
      ...BOV.products,
      ...SUI.products,
      ...FRN.products,
      ...CXA.products,
    ];
    return [...acc, ...products];
  }, [] as Report["products"]);

  const totalIncome = products.reduce(
    (acc, product) => acc + product.price * product.weight,
    0
  );
  const totalSpent = costs.reduce((acc, cost) => acc + Number(cost.value), 0);
  const operationalCosts = costs.map((cost) => ({
    label: cost.name,
    Valor: Number(cost.value),
  }));
  const fixedCosts = costs.filter((cost) => cost.type === "FIXED");
  const variableCosts = costs.filter((cost) => cost.type === "VARIABLE");

  const breakeven = reports
    .map((report, ind) => {
      const totalIncome = Object.values(report.reportData).reduce(
        (acc, category) =>
          acc +
          category.products.reduce(
            (acc, product) => acc + product.price * product.weight,
            0
          ),
        0
      );

      return {
        name: `Análise ${ind + 1} - ${new Date(
          report.createdAt
        ).toLocaleDateString()}`,
        Vendas: totalIncome,
        "Custo fixo": fixedCosts.reduce(
          (acc, cost) => acc + Number(cost.value),
          0
        ),
        "Custo variável": variableCosts.reduce(
          (acc, cost) => acc + Number(cost.value),
          0
        ),
      };
    })
    .filter((report) => report.Vendas > 0);

  const inOut = [
    {
      label: "Entrada",
      Valor: totalIncome,
    },
    {
      label: "Saída",
      Valor: totalSpent,
    },
  ];

  return {
    operationalCosts,
    inOut,
    breakeven,
  };
};

const parseDashboardValues = async (userId: string, month: string) => {
  const { data: allCosts } = await costs.getAll(userId);
  const { data: allReports } = await reports.getAll<ReportResponse[]>(userId);

  const monthCosts = allCosts.filter((cost) =>
    checkIfIsFromCurrentMonth(cost.createdAt, month)
  );
  const monthReports = allReports.filter((report) =>
    checkIfIsFromCurrentMonth(report.createdAt, month)
  );

  const charts = parseDataToChart(monthCosts, monthReports);

  return charts;
};

export function useDashboardQuery(userId: string, month: string) {
  return useQuery(
    ["dashboard", month],
    () => parseDashboardValues(userId, month),
    {
      enabled: !!userId && !!month,
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry(failureCount) {
        if (failureCount > 3) {
          return false;
        }
        return true;
      },
    }
  );
}
