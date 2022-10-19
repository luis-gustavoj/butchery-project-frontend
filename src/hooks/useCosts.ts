import { costs } from "./../services";
import { useQuery } from "@tanstack/react-query";

export function useCostsQuery(userId: string) {
  return useQuery(["costs"], () => costs.getAll(userId), {
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
