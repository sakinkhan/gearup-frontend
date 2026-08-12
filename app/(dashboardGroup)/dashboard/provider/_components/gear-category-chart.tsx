"use client";

import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CategoryData = {
  category: string;
  count: number;
};

type GearCategoryChartProps = {
  data: CategoryData[];
};

const COLORS = [
  "#3b82f6", // Blue
  "#22c55e", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
  "#ec4899", // Pink
  "#f97316", // Orange
];

export function GearCategoryChart({ data }: GearCategoryChartProps) {
  const total = data.reduce((sum, item) => sum + item.count, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gear by Category</CardTitle>

        <CardDescription>Distribution of your listed gear.</CardDescription>
      </CardHeader>

      <CardContent>
        {data.length === 0 ? (
          <div className="flex h-75 items-center justify-center text-sm text-muted-foreground">
            No gear categories available.
          </div>
        ) : (
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="count"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={2}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
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

                <text
                  x="50%"
                  y="48%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground"
                >
                  <tspan x="50%" dy="-4" className="text-2xl font-bold">
                    {total}
                  </tspan>

                  <tspan
                    x="50%"
                    dy="22"
                    className="fill-muted-foreground text-xs"
                  >
                    Total Gear
                  </tspan>
                </text>
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Legend */}
        {data.length > 0 && (
          <div className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {data.map((item, index) => (
              <div
                key={item.category}
                className="flex items-center gap-2 text-xs"
              >
                <span
                  className="size-2.5 rounded-full"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />

                <span className="text-muted-foreground">{item.category}</span>

                <span className="font-medium">{item.count}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
