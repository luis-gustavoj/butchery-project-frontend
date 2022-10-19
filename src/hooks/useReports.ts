import { reports } from "./../services/requests/reports";
import { useQuery } from "@tanstack/react-query";
import { formatAsPercent } from "src/utils/formatAsPercentage";
import { formatAsCurrency } from "src/utils/formatAsCurrency";

type Report = {
  products: {
    id: string;
    name: string;
    price: number;
    weight: number;
  }[];
  totalWeight: number;
  totalPrice: number;
};

const INVISIBLE_LOSE = {
  BOV: 5,
  SUI: 3,
};

const generateReport = (report: Report, category: string) => {
  if (report.products.length === 0) return;

  const totalWeightAfterBoning = report.products.reduce(
    (acc, product) => acc + product.weight,
    0
  );
  const totalChargedByFrig = report.totalPrice * report.totalWeight;
  const weightAfterInvisibleLoss =
    report.totalWeight - (report.totalWeight * INVISIBLE_LOSE[category]) / 100;
  const lossOnBoning =
    ((weightAfterInvisibleLoss - totalWeightAfterBoning) / report.totalWeight) *
    100;
  const revenueAfterBoningPercent = formatAsPercent(
    totalWeightAfterBoning / report.totalWeight
  );
  const realKgPrice = formatAsCurrency(
    totalChargedByFrig / totalWeightAfterBoning
  );
  const products = report.products.map((product) => ({
    name: product.name,
    weight: product.weight,
    percentageAfterBoning: formatAsPercent(product.weight / report.totalWeight),
    priceChargedByFrig: formatAsCurrency(report.totalPrice),
    realKgPriceChargedBy: realKgPrice,
    realPricePayedToFrig: formatAsCurrency(
      (totalChargedByFrig / totalWeightAfterBoning) * product.weight
    ),
    markup: formatAsPercent(
      product.price / (totalChargedByFrig / totalWeightAfterBoning) - 1
    ),
    markdown: formatAsPercent(
      (product.price - totalChargedByFrig / totalWeightAfterBoning) /
        product.price
    ),
    invoicing: formatAsCurrency(product.price * product.weight),
    contributionPercentage: formatAsPercent(
      (product.price * product.weight) /
        ((totalChargedByFrig / totalWeightAfterBoning) * product.weight) -
        1
    ),
    price: formatAsCurrency(product.price),
  }));
  return {
    totalWeightAfterBoning,
    totalChargedByFrig,
    weightAfterInvisibleLoss,
    lossOnBoning,
    revenueAfterBoningPercent,
    products,
  };
};

const parseReportsValue = async (userId: string) => {
  const request = await reports.getAll(userId);

  const { reportData } = request.data[3];

  if (!reportData) return;

  console.log(reportData);

  const bovReport = generateReport(reportData.BOV, "BOV");
  const suiReport = generateReport(reportData.SUI, "SUI");
  const frnReport = generateReport(reportData.FRN, "FRN");
  const cxaReport = generateReport(reportData.CXA, "CXA");

  const updatedReports = {
    BOV: bovReport,
    SUI: suiReport,
    FRN: frnReport,
    CXA: cxaReport,
  };

  return {
    ...request,
    data: updatedReports,
  };
};

export function useReportsQuery(userId: string) {
  return useQuery(["reports"], () => parseReportsValue(userId), {
    enabled: !!userId,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry(failureCount) {
      if (failureCount > 3) {
        return false;
      }
      return true;
    },
  });
}
