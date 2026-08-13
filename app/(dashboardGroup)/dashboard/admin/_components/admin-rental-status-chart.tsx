"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AdminDashboardStats } from "@/types/admin";

type AdminRentalStatusChartProps = {
  stats: AdminDashboardStats;
};

export function AdminRentalStatusChart({ stats }: AdminRentalStatusChartProps) {
  const data = [
    {
      status: "Pending Payment",
      count: stats.rentalStatusCounts.PENDING_PAYMENT,
      fill: "#f59e0b",
    },
    {
      status: "Paid",
      count: stats.rentalStatusCounts.PAID,
      fill: "#22c55e",
    },
    {
      status: "Confirmed",
      count: stats.rentalStatusCounts.CONFIRMED,
      fill: "#3b82f6",
    },
    {
      status: "Picked Up",
      count: stats.rentalStatusCounts.PICKED_UP,
      fill: "#8b5cf6",
    },
    {
      status: "Returned",
      count: stats.rentalStatusCounts.RETURNED,
      fill: "#06b6d4",
    },
    {
      status: "Cancelled",
      count: stats.rentalStatusCounts.CANCELLED,
      fill: "#ef4444",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rental Status</CardTitle>

        <CardDescription>
          Rental orders grouped by their current status.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />

              <XAxis
                dataKey="status"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={11}
              />

              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />

              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  backgroundColor: "var(--background)",
                }}
              />

              <Bar dataKey="count" name="Orders" radius={[4, 4, 0, 0]}>
                {data.map((entry) => (
                  <Cell key={entry.status} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
