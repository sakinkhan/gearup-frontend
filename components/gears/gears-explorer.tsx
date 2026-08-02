"use client";

import { useState } from "react";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useGears } from "@/hooks/use-gears";
import { GearFiltersSidebar } from "./gear-filters";
import { GearGrid } from "./gear-grid";
import type { GearFilters } from "@/types/gear";

const DEFAULT_FILTERS: GearFilters = { page: 1 };

export function GearsExplorer() {
  const [filters, setFilters] = useState<GearFilters>(DEFAULT_FILTERS);
  const debouncedFilters = useDebouncedValue(filters, 350);

  const { data, isLoading, isError, isFetching, refetch } =
    useGears(debouncedFilters);

  return (
    <div className="grid gap-6 md:grid-cols-[260px_1fr]">
      <GearFiltersSidebar
        filters={filters}
        onChange={(next) =>
          setFilters((prev) => ({ ...prev, ...next, page: 1 }))
        }
        onReset={() => setFilters(DEFAULT_FILTERS)}
      />
      <GearGrid
        gears={data?.gears ?? []}
        isLoading={isLoading}
        isFetching={isFetching}
        isError={isError}
        onRetry={refetch}
        total={data?.meta?.total}
      />
    </div>
  );
}
