import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RentalStatusBadge } from "@/components/badges/rental-status-badge";
import type { ProviderRentalOrder } from "@/types/provider";

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

export function ProviderRentalCard({ order }: { order: ProviderRentalOrder }) {
  return (
    <div className="flex h-full flex-col rounded-lg border bg-card text-card-foreground shadow-sm">
      {/* Header */}
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

      {/* Customer */}
      <div className="border-b px-4 py-3">
        <p className="text-xs text-muted-foreground">Customer</p>

        <p className="mt-1 font-medium">{order.customer.name}</p>

        <p className="text-sm text-muted-foreground">{order.customer.email}</p>
      </div>

      {/* Rental Items */}
      <div className="divide-y">
        {order.rentalItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 px-4 py-4">
            <Avatar className="size-14 rounded-md">
              <AvatarImage src={item.gearItem.image} alt={item.gearItem.name} />

              <AvatarFallback>{item.gearItem.name.charAt(0)}</AvatarFallback>
            </Avatar>

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

            <div className="shrink-0 text-right">
              <p className="font-semibold">{formatCurrency(item.totalPrice)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t px-4 py-3">
        <span className="text-sm text-muted-foreground">Order total</span>

        <span className="font-semibold">
          {formatCurrency(order.totalAmount)}
        </span>
      </div>
    </div>
  );
}
