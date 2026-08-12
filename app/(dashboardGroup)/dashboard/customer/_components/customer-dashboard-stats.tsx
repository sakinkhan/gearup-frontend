import { PackageCheck, TrendingUp, Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface CustomerDashboardStatsProps {
  totalRentals: number;
  inProgress: number;
  completed: number;
  totalSpent: number;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

export function CustomerDashboardStats({
  totalRentals,
  inProgress,
  completed,
  totalSpent,
}: CustomerDashboardStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">Total Rentals</p>

            <p className="mt-1 text-2xl font-bold">{totalRentals}</p>
          </div>

          <PackageCheck className="size-5 text-muted-foreground" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">In Progress</p>

            <p className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
              {inProgress}
            </p>
          </div>

          <TrendingUp className="size-5 text-blue-600 dark:text-blue-400" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">Completed</p>

            <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {completed}
            </p>
          </div>

          <PackageCheck className="size-5 text-emerald-600 dark:text-emerald-400" />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center justify-between p-5">
          <div>
            <p className="text-sm text-muted-foreground">Total Spent</p>

            <p className="mt-1 text-2xl font-bold">
              {formatCurrency(totalSpent)}
            </p>
          </div>

          <Wallet className="size-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </div>
  );
}
