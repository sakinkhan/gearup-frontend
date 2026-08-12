"use client";

import { fetchMyReviews } from "@/lib/api/reviews";
import { useQuery } from "@tanstack/react-query";

export function useMyReviews() {
  return useQuery({
    queryKey: ["reviews", "me"],
    queryFn: fetchMyReviews,
    select: (res) => res.data,
  });
}
