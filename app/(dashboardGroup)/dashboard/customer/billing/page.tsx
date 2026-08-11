"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Payment = {
  id: string;
  rentalId: string;
  amount: number;
  status: "PAID" | "PENDING" | "FAILED" | "REFUNDED";
  method: string;
  createdAt: string;
};

async function fetchPayments(): Promise<Payment[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/me`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to load payments");
  const body = await res.json();
  return body.data;
}

function statusVariant(status: Payment["status"]) {
  switch (status) {
    case "PAID":
      return "default";
    case "PENDING":
      return "secondary";
    case "FAILED":
      return "destructive";
    default:
      return "outline";
  }
}

export default function BillingPage() {
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", "me"],
    queryFn: fetchPayments,
  });

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <div>
        <h1 className="text-2xl font-semibold">Billing</h1>
        <p className="text-muted-foreground">
          Your rental payment history and receipts.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment history</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          )}

          {isError && (
            <p className="text-sm text-destructive">
              Couldn't load your payment history. Try refreshing.
            </p>
          )}

          {payments && payments.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No payments yet. Rent your first piece of gear to see it here.
            </p>
          )}

          {payments && payments.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="capitalize">{p.method}</TableCell>
                    <TableCell>${Number(p.amount).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusVariant(p.status)}>
                        {p.status.toLowerCase()}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
