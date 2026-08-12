"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProviderOrders } from "@/lib/api/provider";

export function useProviderOrders() {
  return useQuery({
    queryKey: ["provider", "orders"],
    queryFn: fetchProviderOrders,
    select: (res) => res.data,
  });
}
