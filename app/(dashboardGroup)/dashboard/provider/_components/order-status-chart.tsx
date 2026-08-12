"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type OrderStatusData = {
  status: string;
  count: number;
};

type OrderStatusChartProps = {
  data: OrderStatusData[];
};

export function OrderStatusChart({ data }: OrderStatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rental Order Status</CardTitle>

        <CardDescription>
          Orders grouped by their current rental stage.
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
                fontSize={12}
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

              <Bar
                dataKey="count"
                name="Orders"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
