"use client";

import Image from "next/image";
import { User, MapPin, Phone, Mail } from "lucide-react";

import type { RentalOrder, RentalOrderStatus } from "@/types/rental";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

type RentalDetailsDialogProps = {
  order: RentalOrder | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function formatStatus(status: RentalOrderStatus) {
  return status
    .split("_")
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
}

function getStatusVariant(status: RentalOrderStatus) {
  switch (status) {
    case "CANCELLED":
      return "destructive";

    case "PENDING_PAYMENT":
      return "outline";

    case "PAID":
    case "RETURNED":
      return "secondary";

    default:
      return "default";
  }
}

export function RentalDetailsDialog({
  order,
  open,
  onOpenChange,
}: RentalDetailsDialogProps) {
  if (!order) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rental Order Details</DialogTitle>
          <DialogDescription className="break-all">
            Order #{order.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer + Status */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="mb-3 text-sm font-medium">Customer</p>

              <div className="flex items-start gap-3">
                {order.customer.image ? (
                  <Image
                    src={order.customer.image}
                    alt={order.customer.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                    <User className="text-muted-foreground size-5" />
                  </div>
                )}

                <div className="min-w-0 space-y-1">
                  <p className="font-medium">{order.customer.name}</p>

                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Mail className="size-3.5" />
                    <span>{order.customer.email}</span>
                  </div>

                  {order.customer.phone && (
                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <Phone className="size-3.5" />
                      <span>{order.customer.phone}</span>
                    </div>
                  )}

                  {order.customer.address && (
                    <div className="text-muted-foreground flex items-start gap-2 text-sm">
                      <MapPin className="mt-0.5 size-3.5 shrink-0" />
                      <span>{order.customer.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Status</p>

              <div className="mt-2">
                <Badge variant={getStatusVariant(order.status)}>
                  {formatStatus(order.status)}
                </Badge>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Created</p>

              <p className="mt-1 font-medium">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Last Updated</p>

              <p className="mt-1 font-medium">
                {new Date(order.updatedAt).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Rental Period */}
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Rental Period</p>

            <p className="mt-1 font-medium">
              {new Date(order.rentalStartDate).toLocaleDateString()} →{" "}
              {new Date(order.rentalEndDate).toLocaleDateString()}
            </p>

            <p className="text-muted-foreground text-sm">
              {order.totalDays} {order.totalDays === 1 ? "day" : "days"}
            </p>
          </div>

          {/* Rental Items */}
          <div>
            <h3 className="mb-3 font-semibold">Rental Items</h3>

            <div className="space-y-3">
              {order.rentalItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Image
                      src={item.gearItem.image}
                      alt={item.gearItem.name}
                      width={56}
                      height={56}
                      className="size-14 rounded-md object-cover"
                    />

                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {item.gearItem.name}
                      </p>

                      <p className="text-muted-foreground text-sm">
                        {item.gearItem.brand}
                      </p>

                      <p className="text-muted-foreground text-xs">
                        Condition:{" "}
                        {item.gearItem.condition.charAt(0) +
                          item.gearItem.condition.slice(1).toLowerCase()}
                      </p>

                      <p className="text-muted-foreground text-xs">
                        Deposit: $
                        {Number(item.gearItem.depositAmount).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="ml-4 shrink-0 text-right">
                    <p className="font-medium">
                      ${Number(item.totalPrice).toFixed(2)}
                    </p>

                    <p className="text-muted-foreground text-xs">
                      ${Number(item.pricePerDay).toFixed(2)}
                      /day
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Provider Info */}
          <div>
            <h3 className="mb-3 font-semibold">Provider</h3>

            {order.rentalItems.map((item) => {
              const provider = item.gearItem.provider;

              return (
                <div
                  key={provider.id}
                  className="flex items-center gap-3 rounded-lg border p-4"
                >
                  {provider.image ? (
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      width={48}
                      height={48}
                      className="size-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="bg-muted flex size-12 items-center justify-center rounded-full">
                      <User className="text-muted-foreground size-5" />
                    </div>
                  )}

                  <div>
                    <p className="font-medium">{provider.name}</p>

                    <p className="text-muted-foreground text-sm">
                      {provider.email}
                    </p>

                    {provider.phone && (
                      <p className="text-muted-foreground text-sm">
                        {provider.phone}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {order.status === "CANCELLED" ? (
            <Badge variant="destructive">Cancelled</Badge>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {/* Rental Progress */}
              <div>
                <h3 className="mb-3 font-semibold">Rental Progress</h3>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    "PAID",
                    "CONFIRMED",
                    "PICKED_UP",
                    "RETURNED",
                    "COMPLETED",
                  ].map((status, index) => {
                    const statuses = [
                      "PAID",
                      "CONFIRMED",
                      "PICKED_UP",
                      "RETURNED",
                      "COMPLETED",
                    ];

                    const currentIndex = statuses.indexOf(order.status);

                    const statusIndex = index;

                    const isCompleted = currentIndex >= statusIndex;

                    return (
                      <div key={status} className="flex items-center gap-2">
                        <Badge variant={isCompleted ? "default" : "outline"}>
                          {formatStatus(status as RentalOrderStatus)}
                        </Badge>

                        {index < statuses.length - 1 && (
                          <span className="text-muted-foreground">→</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between border-t pt-4">
            <span className="font-medium">Total Amount</span>

            <span className="text-xl font-bold">
              ${Number(order.totalAmount).toFixed(2)}
            </span>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground text-sm">Customer Notes</p>

              <p className="mt-1 text-sm">{order.notes}</p>
            </div>
          )}

          {/* Timestamps */}
          <div className="text-muted-foreground grid gap-2 text-xs sm:grid-cols-2">
            <p>Created: {new Date(order.createdAt).toLocaleString()}</p>

            <p className="sm:text-right">
              Updated: {new Date(order.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
