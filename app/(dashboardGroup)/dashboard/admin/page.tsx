"use client";

import { useEffect, useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminDashboardStats } from "@/lib/api/admin";
import { AdminDashboardStats } from "@/types/admin";
import { AdminDashboardOverview } from "./_components/admin-dashboard-overview";
import { AdminUserOverview } from "./_components/admin-user-overview";
import { AdminGearOverview } from "./_components/admin-gear-overview";
import { AdminRentalStatusChart } from "./_components/admin-rental-status-chart";
import { AdminUserRoleChart } from "./_components/admin-user-role-chart";

function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Main stats */}
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="rounded-xl border bg-card p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
              </div>

              <Skeleton className="size-10 rounded-lg" />
            </div>

            <Skeleton className="mt-4 h-3 w-32" />
          </div>
        ))}
      </div>

      {/* User + Gear overview */}
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="rounded-xl border bg-card">
            <div className="space-y-2 p-6">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>

            <div className="space-y-4 px-6 pb-6">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {[1, 2].map((item) => (
          <div key={item} className="rounded-xl border bg-card">
            <div className="space-y-2 p-6">
              <Skeleton className="h-5 w-44" />
              <Skeleton className="h-4 w-60" />
            </div>

            <div className="p-6 pt-0">
              <Skeleton className="h-70 w-full rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
    return <AdminDashboardSkeleton />;
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
