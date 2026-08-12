"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchProviderOrders,
  updateProviderOrderStatus,
  type RentalStatus,
} from "@/lib/api/provider-orders";

export function useProviderOrders() {
  return useQuery({
    queryKey: ["provider", "orders"],
    queryFn: fetchProviderOrders,
  });
}

export function useUpdateProviderOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: RentalStatus;
    }) => updateProviderOrderStatus(orderId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider", "orders"],
      });
    },
  });
}
