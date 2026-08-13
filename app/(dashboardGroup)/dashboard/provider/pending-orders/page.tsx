"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  useProviderOrders,
  useUpdateProviderOrderStatus,
} from "@/hooks/use-provider-orders";
import { RentalStatus } from "@/types/provider";

function getOrderAction(status: RentalStatus) {
  switch (status) {
    case "PAID":
      return {
        label: "Confirm",
        nextStatus: "CONFIRMED" as const,
        disabled: false,
      };

    case "CONFIRMED":
      return {
        label: "Mark Picked Up",
        nextStatus: "PICKED_UP" as const,
        disabled: false,
      };

    case "PICKED_UP":
      return {
        label: "Mark Returned",
        nextStatus: "RETURNED" as const,
        disabled: false,
      };

    case "RETURNED":
      return {
        label: "Returned",
        nextStatus: "RETURNED" as const,
        disabled: true,
      };

    case "COMPLETED":
      return {
        label: "Completed",
        nextStatus: "COMPLETED" as const,
        disabled: true,
      };

    case "CANCELLED":
      return {
        label: "Cancelled",
        nextStatus: "CANCELLED" as const,
        disabled: true,
      };

    case "PENDING_PAYMENT":
      return {
        label: "Confirm",
        nextStatus: "CONFIRMED" as const,
        disabled: true,
      };

    default:
      return {
        label: "Unavailable",
        nextStatus: status,
        disabled: true,
      };
  }
}

function getStatusBadgeClass(status: RentalStatus) {
  switch (status) {
    case "PAID":
      return "bg-primary";

    case "CONFIRMED":
      return "bg-blue-500 text-white";

    case "PICKED_UP":
      return "bg-orange-500 text-white";

    case "RETURNED":
      return "bg-green-600 text-white";

    case "COMPLETED":
      return "bg-green-600 text-white";

    case "CANCELLED":
      return "bg-destructive text-white";

    case "PENDING_PAYMENT":
      return "bg-muted-foreground text-white";

    default:
      return "bg-muted";
  }
}

const PendingOrdersPage = () => {
  const updateOrder = useUpdateProviderOrderStatus();

  const { data: orders = [], isLoading, isError, error } = useProviderOrders();

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Order Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Review incoming rental orders and manage their status.
          </p>
        </div>

        <Card>
          <CardContent className="py-10 text-center text-sm text-muted-foreground">
            Loading orders...
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Order Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Review incoming rental orders and manage their status.
          </p>
        </div>

        <Card>
          <CardContent className="py-10 text-center text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load orders."}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Order Management</h1>

        <p className="text-sm text-muted-foreground">
          Review incoming rental orders and manage their status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Incoming Orders</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="px-4 py-3 font-medium">Order</th>

                  <th className="px-4 py-3 font-medium">Customer</th>

                  <th className="px-4 py-3 font-medium">Gear</th>

                  <th className="px-4 py-3 font-medium">Rental Period</th>

                  <th className="px-4 py-3 font-medium">Status</th>

                  <th className="px-4 py-3 text-right font-medium">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => {
                  const action = getOrderAction(order.status);
                  return (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-4 py-4 font-medium">
                        #{order.id.slice(0, 8)}
                      </td>

                      <td className="px-4 py-4">{order.customer?.name}</td>

                      <td className="px-4 py-4">
                        <div className="space-y-1">
                          {order.rentalItems.map((item) => (
                            <div key={item.id} className="font-medium">
                              {item.gearItem.name}
                              <span className="ml-1 text-xs text-muted-foreground">
                                x {item.quantity}
                              </span>
                            </div>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {new Date(order.rentalStartDate).toLocaleDateString()} →{" "}
                        {new Date(order.rentalEndDate).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4">
                        <Badge className={getStatusBadgeClass(order.status)}>
                          {order.status.replaceAll("_", " ")}
                        </Badge>
                      </td>

                      <td className="px-4 py-4 text-right">
                        <Button
                          size="xs"
                          disabled={action.disabled || updateOrder.isPending}
                          onClick={() =>
                            updateOrder.mutate({
                              orderId: order.id,
                              status: action.nextStatus,
                            })
                          }
                        >
                          {action.label}
                          <ArrowRight className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingOrdersPage;
