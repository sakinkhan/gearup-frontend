"use client";

import { returnRentalOrder } from "@/lib/api/rentals";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useReturnRental() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: returnRentalOrder,

    onSuccess: () => {
      toast.success("Gear returned successfully");

      queryClient.invalidateQueries({
        queryKey: ["rentals", "me"],
      });
    },

    onError: (error: Error) => {
      toast.error(error.message || "Failed to return the rental");
    },
  });
}
