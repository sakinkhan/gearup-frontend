import { Users, Package, ClipboardList } from "lucide-react";

import { AdminStatCard } from "./admin-stat-card";
import { AdminDashboardStats } from "@/types/admin";

type AdminDashboardOverviewProps = {
  stats: AdminDashboardStats;
};

export function AdminDashboardOverview({ stats }: AdminDashboardOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <AdminStatCard
        title="Total Users"
        value={stats.totalUsers}
        description={`${stats.totalCustomers} customers · ${stats.totalProviders} providers`}
        href="/dashboard/admin/user-management"
        icon={Users}
      />

      <AdminStatCard
        title="Active Gear"
        value={stats.activeGear}
        description={`${stats.totalGear} total gear listings`}
        href="/dashboard/admin/gear-management"
        icon={Package}
      />

      <AdminStatCard
        title="Total Rentals"
        value={stats.totalRentals}
        description={`${stats.activeRentals} currently active`}
        href="/dashboard/admin/rental-management"
        icon={ClipboardList}
      />
    </div>
  );
}
