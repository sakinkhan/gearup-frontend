"use client";

import {
  deleteProviderGear,
  fetchProviderMyGears,
  UpdateGearPayload,
  updateProviderGear,
} from "@/lib/api/provider-my-gears";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProviderMyGears() {
  return useQuery({
    queryKey: ["provider", "my-gears"],
    queryFn: fetchProviderMyGears,
    staleTime: 60 * 1000,
  });
}

export function useUpdateProviderGear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGearPayload }) =>
      updateProviderGear(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider", "my-gears"],
      });
    },
  });
}

export function useDeleteProviderGear() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProviderGear(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["provider", "my-gears"],
      });
    },
  });
}
