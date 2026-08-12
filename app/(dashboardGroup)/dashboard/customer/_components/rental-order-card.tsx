import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { RentalOrder } from "@/types/rental";
import { RentalStatusBadge } from "@/components/badges/rental-status-badge";
import { ReturnRentalButton } from "@/components/rentals/return-rental-button";
import { ReviewDialog } from "./review-dialog";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(amount));
}

export function RentalOrderCard({ order }: { order: RentalOrder }) {
  const canReview = order.status === "RETURNED" || order.status === "COMPLETED";

  const unreviewedItems = order.rentalItems.filter((item) => !item.hasReviewed);

  const hasActions = order.status === "PICKED_UP" || canReview;

  return (
    <div className="flex h-full flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Order header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-3">
        <div className="space-y-0.5">
          <p className="text-xs text-muted-foreground">
            Order #{order.id.slice(0, 8)}
          </p>

          <p className="text-sm text-muted-foreground">
            {formatDate(order.rentalStartDate)} –{" "}
            {formatDate(order.rentalEndDate)} · {order.totalDays}{" "}
            {order.totalDays === 1 ? "day" : "days"}
          </p>
        </div>

        <RentalStatusBadge status={order.status} />
      </div>

      {/* Rental items */}
      <div className="divide-y">
        {order.rentalItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center gap-4 px-4 py-4"
          >
            {/* Gear image */}
            <Avatar className="h-14 w-14 shrink-0 rounded-md">
              <AvatarImage src={item.gearItem.image} alt={item.gearItem.name} />

              <AvatarFallback>{item.gearItem.name.charAt(0)}</AvatarFallback>
            </Avatar>

            {/* Gear details */}
            <div className="min-w-0 flex-1">
              <Link
                href={`/gears/${item.gearItem.id}`}
                className="font-medium hover:underline"
              >
                {item.gearItem.name}
              </Link>

              <p className="text-sm text-muted-foreground">
                {item.gearItem.brand} · {item.gearItem.categoryName}
              </p>

              <p className="text-sm text-muted-foreground">
                Qty {item.quantity} × {formatCurrency(item.pricePerDay)}/day
              </p>
            </div>

            {/* Item total */}
            <div className="shrink-0">
              <span className="font-semibold">
                {formatCurrency(item.totalPrice)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Order footer */}
      <div className="mt-auto border-t">
        {/* Order total */}
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-sm text-muted-foreground">Order total</span>

          <span className="font-semibold">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>

        {/* Actions */}
        {hasActions && (
          <div className="flex flex-wrap items-center justify-center gap-2 border-t bg-muted/30 px-4 py-3">
            {/* Return gear */}
            {order.status === "PICKED_UP" && (
              <ReturnRentalButton rentalOrderId={order.id} />
            )}

            {/* Review buttons */}
            {canReview && unreviewedItems.length > 0 && (
              <div className="flex flex-wrap w-full gap-2">
                {unreviewedItems.map((item) => (
                  <ReviewDialog
                    key={item.id}
                    gearItemId={item.gearItem.id}
                    gearName={item.gearItem.name}
                    rentalOrderId={order.id}
                  />
                ))}
              </div>
            )}

            {/* Reviewed */}
            {canReview && unreviewedItems.length === 0 && (
              <span className="text-sm text-center font-medium text-emerald-600 dark:text-emerald-400">
                ✓ Reviewed
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
