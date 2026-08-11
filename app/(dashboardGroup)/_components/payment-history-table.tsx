"use client";

import { usePayments } from "@/hooks/use-payments";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { PaymentStatusBadge } from "@/components/badges/payment-status-badge";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: string, currency: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency || "AUD",
  }).format(Number(amount));
}

export function PaymentHistoryTable() {
  const { data: payments, isLoading, isError } = usePayments();

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Couldn&apos;t load your payment history. Please try again shortly.
      </div>
    );
  }

  if (!payments || payments.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        No payments yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Paid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {payment.transactionId.slice(0, 18)}…
              </TableCell>
              <TableCell className="text-sm">
                #{payment.rentalOrderId.slice(0, 8)}
              </TableCell>
              <TableCell className="text-sm capitalize">
                {payment.provider.toLowerCase()}
              </TableCell>
              <TableCell className="font-medium">
                {formatCurrency(payment.amount, payment.currency)}
              </TableCell>
              <TableCell>
                <PaymentStatusBadge status={payment.status} />
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDate(payment.paidAt ?? payment.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
