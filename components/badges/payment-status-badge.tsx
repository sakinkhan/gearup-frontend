import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/types/payment";

const paymentStatusBadgeClasses: Record<PaymentStatus, string> = {
  PENDING:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  COMPLETED:
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  FAILED: "bg-destructive/10 text-destructive border-destructive/20",
  REFUNDED: "bg-muted text-muted-foreground border-border",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const classes =
    paymentStatusBadgeClasses[status] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize",
        classes,
      )}
    >
      {status.toLowerCase()}
    </span>
  );
}
