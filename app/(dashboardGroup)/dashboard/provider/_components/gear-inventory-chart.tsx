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

type InventoryData = {
  name: string;
  available: number;
  total: number;
};

type GearInventoryChartProps = {
  data: InventoryData[];
};

const COLORS = [
  "#2563eb", // Blue
  "#16a34a", // Green
  "#f59e0b", // Amber
  "#dc2626", // Red
  "#7c3aed", // Violet
  "#0891b2", // Cyan
  "#db2777", // Pink
  "#ea580c", // Orange
];

export function GearInventoryChart({ data }: GearInventoryChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gear Inventory Availability</CardTitle>

        <CardDescription>
          Currently available stock for each gear item.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-75 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 10,
                right: 20,
                left: 10,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />

              <XAxis
                type="number"
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                dataKey="name"
                type="category"
                tickLine={false}
                axisLine={false}
                width={130}
                tickMargin={8}
                fontSize={12}
              />

              <Tooltip
                cursor={{ fill: "var(--muted)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) {
                    return null;
                  }

                  const item = payload[0].payload as InventoryData;

                  return (
                    <div className="rounded-lg border bg-background px-3 py-2 shadow-sm">
                      <p className="text-sm font-medium">{item.name}</p>

                      <p className="text-xs text-muted-foreground">
                        Available:{" "}
                        <span className="font-medium text-foreground">
                          {item.available}
                        </span>{" "}
                        / {item.total}
                      </p>
                    </div>
                  );
                }}
              />

              <Bar dataKey="available" name="Available" radius={[0, 4, 4, 0]}>
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
