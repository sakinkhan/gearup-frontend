import { cn } from "@/lib/utils";
import type { RentalOrderStatus } from "@/types/rental";

export const rentalStatusBadgeClasses: Record<RentalOrderStatus, string> = {
  PENDING_PAYMENT:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  CONFIRMED:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  ACTIVE:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  RETURNED: "bg-muted text-muted-foreground border-border",
  COMPLETED: "bg-primary/10 text-primary border-primary/20",
  CANCELLED: "bg-destructive/10 text-destructive border-destructive/20",
};

const rentalStatusLabels: Record<RentalOrderStatus, string> = {
  PENDING_PAYMENT: "Pending Payment",
  CONFIRMED: "Confirmed",
  ACTIVE: "Active",
  RETURNED: "Returned",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export function RentalStatusBadge({ status }: { status: RentalOrderStatus }) {
  const classes =
    rentalStatusBadgeClasses[status] ??
    "bg-muted text-muted-foreground border-border";
  const label = rentalStatusLabels[status] ?? status;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        classes,
      )}
    >
      {label}
    </span>
  );
}
