import { cn } from "@/lib/utils";
import type { PaymentStatus } from "@/types/payment";

const paymentStatusBadgeClasses: Record<PaymentStatus, string> = {
  PENDING:
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",

  PAID: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",

  FAILED: "bg-destructive/10 text-destructive border-destructive/20",

  REFUNDED:
    "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
  PENDING: "Pending",
  PAID: "Paid",
  FAILED: "Failed",
  REFUNDED: "Refunded",
};

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        paymentStatusBadgeClasses[status],
      )}
    >
      {paymentStatusLabels[status]}
    </span>
  );
}
