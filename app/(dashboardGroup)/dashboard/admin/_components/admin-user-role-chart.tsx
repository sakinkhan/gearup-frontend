"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminDashboardStats } from "@/types/admin";

type AdminUserRoleChartProps = {
  stats: AdminDashboardStats;
};

export function AdminUserRoleChart({ stats }: AdminUserRoleChartProps) {
  const data = [
    {
      role: "Customers",
      count: stats.totalCustomers,
    },
    {
      role: "Providers",
      count: stats.totalProviders,
    },
    {
      role: "Admins",
      count: stats.totalAdmins,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Role Distribution</CardTitle>

        <CardDescription>Breakdown of users by platform role.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="role"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ role, percent }) =>
                  `${role} ${((percent ?? 0) * 100).toFixed(0)}%`
                }
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.role}
                    fill={
                      entry.role === "Admins"
                        ? "#a855f7"
                        : entry.role === "Providers"
                          ? "#3b82f6"
                          : "#22c55e"
                    }
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                }}
              />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
