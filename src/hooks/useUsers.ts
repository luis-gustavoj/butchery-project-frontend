import { useQuery } from "@tanstack/react-query";
import { users } from "src/services";

export function useUsersQuery() {
  return useQuery(["users"], () => users.getAll(), {
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
