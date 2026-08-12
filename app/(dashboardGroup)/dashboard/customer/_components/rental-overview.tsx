import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RentalOverviewProps {
  inProgress: number;
  completed: number;
  total: number;
}

export function RentalOverview({
  inProgress,
  completed,
  total,
}: RentalOverviewProps) {
  const data = [
    {
      status: "In Progress",
      count: inProgress,
    },
    {
      status: "Completed",
      count: completed,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Rental Overview</CardTitle>

          <span className="text-sm text-muted-foreground">{total} total</span>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Your rental activity
        </p>

        <div className="h-70 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 0,
              }}
            >
              <CartesianGrid vertical={false} />

              <XAxis dataKey="status" tickLine={false} axisLine={false} />

              <YAxis allowDecimals={false} tickLine={false} axisLine={false} />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="var(--primary)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
