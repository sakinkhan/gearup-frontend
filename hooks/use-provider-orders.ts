import type { ProviderRentalOrder } from "@/types/provider";
import { fetchProviderOrders } from "@/lib/api/provider";
import { useQuery } from "@tanstack/react-query";

export function useProviderOrders() {
  return useQuery<ProviderRentalOrder[]>({
    queryKey: ["provider", "orders"],
    queryFn: async () => {
      const response = await fetchProviderOrders();
      return response.data;
    },
  });
}