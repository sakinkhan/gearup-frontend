"use client";

import { Package, ClipboardList, Activity } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useProviderMyGears } from "@/hooks/use-provider-my-gears";
import { useProviderOrders } from "@/hooks/use-provider-orders";
import { OrderStatusChart } from "./_components/order-status-chart";
import { GearCategoryChart } from "./_components/gear-category-chart";
import { GearInventoryChart } from "./_components/gear-inventory-chart";

const ProviderDashboardPage = () => {
  const { data: gears = [], isLoading: gearsLoading } = useProviderMyGears();

  const { data: orders = [], isLoading: ordersLoading } = useProviderOrders();

  const isLoading = gearsLoading || ordersLoading;

  const totalGears = gears.length;

  const activeRentals = orders.filter(
    (order) => order.status === "CONFIRMED" || order.status === "PICKED_UP",
  ).length;
  const orderStatusData = [
    {
      status: "Paid",
      count: orders.filter((order) => order.status === "PAID").length,
    },
    {
      status: "Confirmed",
      count: orders.filter((order) => order.status === "CONFIRMED").length,
    },
    {
      status: "Picked Up",
      count: orders.filter((order) => order.status === "PICKED_UP").length,
    },
    {
      status: "Returned",
      count: orders.filter((order) => order.status === "RETURNED").length,
    },
  ];

  const inventoryData = gears.map((gear) => ({
    name: gear.name,
    available: gear.availableStock,
    total: gear.stock,
  }));

  const categoryCounts = gears.reduce<Record<string, number>>((acc, gear) => {
    acc[gear.categoryName] = (acc[gear.categoryName] || 0) + 1;

    return acc;
  }, {});

  const categoryData = Object.entries(categoryCounts).map(
    ([category, count]) => ({
      category,
      count,
    }),
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "PAID",
  ).length;

  const availableGears = gears.filter(
    (gear) => gear.status === "AVAILABLE" && gear.availableStock > 0,
  ).length;

  const totalStock = gears.reduce((sum, gear) => sum + gear.stock, 0);

  const availableStock = gears.reduce(
    (sum, gear) => sum + gear.availableStock,
    0,
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-8 w-56 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-80 animate-pulse rounded-md bg-muted" />
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="size-11 animate-pulse rounded-lg bg-muted" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  <div className="h-7 w-12 animate-pulse rounded bg-muted" />
                  <div className="h-3 w-32 animate-pulse rounded bg-muted" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-6 lg:grid-cols-2">
          {[1, 2].map((item) => (
            <Card key={item}>
              <CardHeader>
                <div className="h-6 w-40 animate-pulse rounded bg-muted" />
              </CardHeader>

              <CardContent>
                <div className="h-[280px] animate-pulse rounded-md bg-muted" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inventory Chart */}
        <Card>
          <CardHeader>
            <div className="h-6 w-48 animate-pulse rounded bg-muted" />
          </CardHeader>

          <CardContent>
            <div className="h-[320px] animate-pulse rounded-md bg-muted" />
          </CardContent>
        </Card>

        {/* Inventory Overview */}
        <Card>
          <CardHeader>
            <div className="h-6 w-44 animate-pulse rounded bg-muted" />
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-28 animate-pulse rounded bg-muted" />
                <div className="h-8 w-16 animate-pulse rounded bg-muted" />
              </div>

              <div className="space-y-2 text-right">
                <div className="ml-auto h-4 w-24 animate-pulse rounded bg-muted" />
                <div className="ml-auto h-8 w-16 animate-pulse rounded bg-muted" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Provider Dashboard
        </h1>

        <p className="text-sm text-muted-foreground">
          Overview of your gear and rental activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Package className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Gear</p>

              <p className="text-2xl font-bold">{totalGears}</p>

              <p className="text-xs text-muted-foreground">
                {availableGears} currently available
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <Activity className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Active Rentals</p>

              <p className="text-2xl font-bold">{activeRentals}</p>

              <p className="text-xs text-muted-foreground">
                Confirmed or picked up
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <ClipboardList className="size-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Pending Orders</p>

              <p className="text-2xl font-bold">{pendingOrders}</p>

              <p className="text-xs text-muted-foreground">
                Awaiting confirmation
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <OrderStatusChart data={orderStatusData} />

        <GearCategoryChart data={categoryData} />
      </div>

      <GearInventoryChart data={inventoryData} />
      {/* Inventory summary */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Available stock</p>
              <p className="text-2xl font-bold text-primary">
                {availableStock}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total stock</p>
              <p className="text-2xl font-bold text-primary">{totalStock}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProviderDashboardPage;
