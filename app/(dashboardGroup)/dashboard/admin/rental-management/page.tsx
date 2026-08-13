"use client";

import { useEffect, useState } from "react";

import type { RentalOrder } from "@/types/rental";
import { fetchAllRentalOrders } from "@/lib/api/admin";
import { RentalTable } from "../_components/rental-table";
import { Skeleton } from "@/components/ui/skeleton";

function RentalManagementSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Rental table */}
      <div className="rounded-xl border bg-card">
        {/* Table header */}
        <div className="flex items-center justify-between border-b p-6">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>

          <Skeleton className="h-9 w-28" />
        </div>

        {/* Table rows */}
        <div className="divide-y">
          {[1, 2, 3, 4, 5, 6, 7].map((row) => (
            <div key={row} className="flex items-center gap-4 p-4">
              {/* Order ID */}
              <div className="w-32 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-20" />
              </div>

              {/* Customer */}
              <div className="flex flex-1 items-center gap-3">
                <Skeleton className="size-10 shrink-0 rounded-full" />

                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>

              {/* Gear */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-20" />
              </div>

              {/* Dates */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-28" />
              </div>

              {/* Amount */}
              <Skeleton className="h-5 w-20" />

              {/* Status */}
              <Skeleton className="h-6 w-24 rounded-full" />

              {/* Action */}
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminRentalManagementPage() {
  const [orders, setOrders] = useState<RentalOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAllRentalOrders();

        setOrders(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load rental orders",
        );
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);

  if (loading) {
    return <RentalManagementSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Rental Management
          </h1>

          <p className="text-muted-foreground">
            Monitor all rental orders across GearUp.
          </p>
        </div>

        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Rental Management</h1>

        <p className="text-muted-foreground">
          Monitor all rental orders across GearUp.
        </p>
      </div>

      <RentalTable initialOrders={orders} />
    </div>
  );
}
