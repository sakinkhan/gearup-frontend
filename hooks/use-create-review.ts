"use client";

import { createReview } from "@/lib/api/reviews";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      toast.success("Review submitted — thanks for the feedback!");
      queryClient.invalidateQueries({ queryKey: ["rentals", "me"] });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong. Please try again.");
    },
  });
}
