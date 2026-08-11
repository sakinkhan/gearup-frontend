"use client";

import { fetchMyRentals } from "@/lib/api/rentals";
import { useQuery } from "@tanstack/react-query";

export function useRentals() {
  return useQuery({
    queryKey: ["rentals", "me"],
    queryFn: fetchMyRentals,
    select: (res) => res.data,
  });
}
