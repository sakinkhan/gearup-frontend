"use client";

import { useMemo } from "react";
import { PackageCheck } from "lucide-react";

import { useProviderOrders } from "@/hooks/use-provider-orders";
import { ProviderRentalCard } from "../_components/provider-rental-card";

const ACTIVE_STATUSES = ["PAID", "CONFIRMED", "PICKED_UP", "RETURNED"] as const;

export default function ProviderActiveRentalsPage() {
  const { data: orders = [], isLoading, isError, error } = useProviderOrders();

  const activeOrders = useMemo(() => {
    return orders.filter((order) =>
      ACTIVE_STATUSES.includes(
        order.status as (typeof ACTIVE_STATUSES)[number],
      ),
    );
  }, [orders]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-7 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-muted" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-lg border bg-muted/40"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
        <h2 className="font-semibold text-destructive">
          Unable to load active rentals
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          {error instanceof Error
            ? error.message
            : "Something went wrong while loading your rentals."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Active Rentals</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage incoming orders, current rentals, and returned gear.
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <PackageCheck className="size-4" />

        <span>
          {activeOrders.length}{" "}
          {activeOrders.length === 1 ? "active rental" : "active rentals"}
        </span>
      </div>

      {activeOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <PackageCheck className="size-8 text-muted-foreground" />

          <h2 className="mt-4 font-medium">No active rentals</h2>

          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            New rental orders will appear here when customers place orders for
            your gear.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-1">
          {activeOrders.map((order) => (
            <ProviderRentalCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
