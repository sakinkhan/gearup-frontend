"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchGears } from "@/lib/api/gears";
import type { GearFilters } from "@/types/gear";

export function useGears(filters: GearFilters) {
  return useQuery({
    queryKey: ["gears", filters],
    queryFn: () => fetchGears(filters),
    placeholderData: (prev) => prev,
    select: (res) => ({ gears: res.data, meta: res.meta }),
  });
}
