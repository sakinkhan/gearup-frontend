import { CreditCard, Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PaymentSummaryProps {
  totalSpent: number;
  paymentCount: number;
  averagePayment: number;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

export function PaymentSummary({
  totalSpent,
  paymentCount,
  averagePayment,
}: PaymentSummaryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="rounded-xl border p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>

              <p className="mt-1 text-3xl font-bold">
                {formatCurrency(totalSpent)}
              </p>
            </div>

            <Wallet className="size-5 text-muted-foreground" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <CreditCard className="size-4 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">
              Successful Payments
            </span>
          </div>

          <span className="font-semibold">{paymentCount}</span>
        </div>

        <div className="flex items-center justify-between rounded-lg border p-4">
          <span className="text-sm text-muted-foreground">Average Payment</span>

          <span className="font-semibold">
            {formatCurrency(averagePayment)}
          </span>
        </div>

        <p className="pt-2 text-xs text-muted-foreground">
          Total spent includes successful payments only.
        </p>
      </CardContent>
    </Card>
  );
}
