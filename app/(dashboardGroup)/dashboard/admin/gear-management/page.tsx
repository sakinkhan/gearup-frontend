"use client";

import { useEffect, useState } from "react";

import type { Gear } from "@/types/gear";
import { fetchAllGearListings } from "@/lib/api/admin";
import { GearTable } from "../_components/gear-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminGearManagementPage() {
  const [gears, setGears] = useState<Gear[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGears() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAllGearListings();
        setGears(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load gear listings",
        );
      } finally {
        setLoading(false);
      }
    }

    loadGears();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Page header */}
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-80" />
        </div>

        {/* Table skeleton */}
        <div className="rounded-lg border">
          {/* Table header */}
          <div className="flex items-center gap-4 border-b p-4">
            <Skeleton className="h-5 w-8" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-24" />
            <Skeleton className="ml-auto h-5 w-20" />
          </div>

          {/* Table rows */}
          <div className="divide-y">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4 p-4">
                {/* Image */}
                <Skeleton className="h-10 w-10 rounded-md" />

                {/* Gear name */}
                <div className="w-40 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>

                {/* Category */}
                <Skeleton className="h-4 w-24" />

                {/* Price */}
                <Skeleton className="h-4 w-20" />

                {/* Stock */}
                <Skeleton className="h-4 w-16" />

                {/* Status */}
                <Skeleton className="h-6 w-20 rounded-full" />

                {/* Action */}
                <Skeleton className="ml-auto h-8 w-20 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gear Management</h1>

          <p className="text-muted-foreground">
            Manage and monitor all gear listings across GearUp.
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
        <h1 className="text-2xl font-bold tracking-tight">Gear Management</h1>

        <p className="text-muted-foreground">
          Manage and monitor all gear listings across GearUp.
        </p>
      </div>

      <GearTable initialGears={gears} />
    </div>
  );
}
