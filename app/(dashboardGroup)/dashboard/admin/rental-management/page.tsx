"use client";

import { useEffect, useState } from "react";

import type { RentalOrder } from "@/types/rental";
import { fetchAllRentalOrders } from "@/lib/api/admin";
import { RentalTable } from "../_components/rental-table";

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

        <div className="text-muted-foreground">Loading rental orders...</div>
      </div>
    );
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
