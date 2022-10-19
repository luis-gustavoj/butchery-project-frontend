import { products } from "./../services/requests/products";
import { useQuery } from "@tanstack/react-query";

export function useProductsQuery(userId: string) {
  return useQuery(["products"], () => products.getAll(userId), {
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
