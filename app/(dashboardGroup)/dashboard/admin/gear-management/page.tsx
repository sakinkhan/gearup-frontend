"use client";

import { useEffect, useState } from "react";

import type { Gear } from "@/types/gear";
import { fetchAllGearListings } from "@/lib/api/admin";
import { GearTable } from "../_components/gear-table";
import GlobalLoading from "@/app/loading";

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
    return <GlobalLoading />;
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
