import { Users, UserRound, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminDashboardStats } from "@/types/admin";


type AdminUserOverviewProps = {
  stats: AdminDashboardStats;
};

export function AdminUserOverview({ stats }: AdminUserOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
              <Users className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Customers</p>
              <p className="text-muted-foreground text-xs">
                Registered customers
              </p>
            </div>
          </div>

          <span className="font-semibold">{stats.totalCustomers}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
              <UserRound className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Providers</p>
              <p className="text-muted-foreground text-xs">Gear providers</p>
            </div>
          </div>

          <span className="font-semibold">{stats.totalProviders}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg">
              <ShieldCheck className="size-4" />
            </div>

            <div>
              <p className="text-sm font-medium">Admins</p>
              <p className="text-muted-foreground text-xs">
                Platform administrators
              </p>
            </div>
          </div>

          <span className="font-semibold">{stats.totalAdmins}</span>
        </div>
      </CardContent>
    </Card>
  );
}
