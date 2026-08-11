"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGears } from "@/lib/api/gears";

export function useGearBrands() {
  const { data } = useQuery({
    queryKey: ["gears", "all-brands-derived"],
    queryFn: () => fetchGears({ limit: 1000 }),
    staleTime: 5 * 60 * 1000,
  });

  const brands = useMemo(() => {
    if (!data?.data) return [];
    return Array.from(new Set(data.data.map((g) => g.brand))).sort();
  }, [data]);

  return brands;
}
