import { Package, CheckCircle2, Archive } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminDashboardStats } from "@/types/admin";

type AdminGearOverviewProps = {
  stats: AdminDashboardStats;
};

export function AdminGearOverview({ stats }: AdminGearOverviewProps) {
  const inactiveGear = stats.totalGear - stats.activeGear;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gear Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
              <Package className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Total Listings</p>
              <p className="text-muted-foreground text-xs">All gear listings</p>
            </div>
          </div>

          <span className="font-semibold">{stats.totalGear}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
              <CheckCircle2 className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Active Listings</p>
              <p className="text-muted-foreground text-xs">
                Currently listed gear
              </p>
            </div>
          </div>

          <span className="font-semibold">{stats.activeGear}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
              <Archive className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Inactive Listings</p>
              <p className="text-muted-foreground text-xs">Deactivated gear</p>
            </div>
          </div>

          <span className="font-semibold">{inactiveGear}</span>
        </div>
      </CardContent>
    </Card>
  );
}
