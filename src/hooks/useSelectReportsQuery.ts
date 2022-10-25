import { useQuery } from "@tanstack/react-query";
import { reports } from "src/services";

type Report = {
  createdAt: string;
  id: string;
};

const parseReportsToOptions = async (userId: string) => {
  const { data } = await reports.getAll<Report[]>(userId);

  return data.map((report, ind) => ({
    value: report.id,
    title: `Análise ${ind + 1} - ${new Date(
      report.createdAt
    ).toLocaleDateString()}`,
  }));
};

export function useSelectReportsQuery(userId: string) {
  return useQuery(["select-reports"], () => parseReportsToOptions(userId), {
    enabled: !!userId,
    retry(failureCount) {
      if (failureCount > 3) {
        return false;
      }
      return true;
    },
  });
}
