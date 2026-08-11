"use client";

import { fetchMyPayments } from "@/lib/api/payments";
import { useQuery } from "@tanstack/react-query";

export function usePayments() {
  return useQuery({
    queryKey: ["payments", "me"],
    queryFn: fetchMyPayments,
    select: (res) => res.data,
  });
}
