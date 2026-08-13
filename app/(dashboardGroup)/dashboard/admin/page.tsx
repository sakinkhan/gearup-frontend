"use client";

import { useEffect, useState } from "react";

import { fetchAdminDashboardStats } from "@/lib/api/admin";
import { AdminDashboardStats } from "@/types/admin";
import { AdminDashboardOverview } from "./_components/admin-dashboard-overview";
import { AdminUserOverview } from "./_components/admin-user-overview";
import { AdminGearOverview } from "./_components/admin-gear-overview";
import { AdminRentalStatusChart } from "./_components/admin-rental-status-chart";
import { AdminUserRoleChart } from "./_components/admin-user-role-chart";
import GlobalLoading from "@/app/loading";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchAdminDashboardStats();

        setStats(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load dashboard statistics",
        );
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>

          <p className="text-muted-foreground">
            Overview of your GearUp platform.
          </p>
        </div>

        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>

        <p className="text-muted-foreground">
          Overview of your GearUp platform.
        </p>
      </div>

      <AdminDashboardOverview stats={stats} />
      <div className="grid gap-4 md:grid-cols-2">
        <AdminUserOverview stats={stats} />
        <AdminGearOverview stats={stats} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <AdminRentalStatusChart stats={stats} />
        <AdminUserRoleChart stats={stats} />
      </div>
    </div>
  );
}
