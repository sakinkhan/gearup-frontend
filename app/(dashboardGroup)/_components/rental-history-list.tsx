"use client";

import { useRentals } from "@/hooks/use-rentals";
import { RentalOrderCard } from "./rental-order-card";
import { Skeleton } from "@/components/ui/skeleton";

function RentalHistorySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-lg border bg-card">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
          <div className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-14 w-14 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/4" />
              <Skeleton className="h-3 w-1/5" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RentalHistoryList() {
  const { data: orders, isLoading, isError } = useRentals();

  if (isLoading) return <RentalHistorySkeleton />;

  if (isError) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Couldn&apos;t load your rental history. Please try again shortly.
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        You haven&apos;t rented any gear yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <RentalOrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
