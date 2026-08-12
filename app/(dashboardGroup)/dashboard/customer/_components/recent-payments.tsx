import { CreditCard } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { PaymentStatusBadge } from "@/components/badges/payment-status-badge";

import type { Payment } from "@/types/payment";

interface RecentPaymentsProps {
  payments: Payment[];
}

function formatCurrency(amount: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(Number(amount));
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function RecentPayments({ payments }: RecentPaymentsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Payments</CardTitle>

          <span className="text-sm text-muted-foreground">
            Last {Math.min(payments.length, 5)}
          </span>
        </div>
      </CardHeader>

      <CardContent>
        {payments.length === 0 ? (
          <div className="py-10 text-center">
            <CreditCard className="mx-auto size-8 text-muted-foreground" />

            <p className="mt-3 text-sm font-medium">No payments yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Your payment history will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {payments.slice(0, 5).map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-mono text-sm">
                    #{payment.rentalOrderId.slice(0, 8)}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(payment.createdAt)}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:justify-end">
                  <span className="font-semibold">
                    {formatCurrency(payment.amount)}
                  </span>

                  <PaymentStatusBadge status={payment.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
