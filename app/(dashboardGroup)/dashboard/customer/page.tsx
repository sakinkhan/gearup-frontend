"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchMyPayments } from "@/lib/api/payments";
import { useRentals } from "@/hooks/use-rentals";

import { CustomerDashboardStats } from "./_components/customer-dashboard-stats";
import { PaymentSummary } from "./_components/payment-summary";
import { RecentPayments } from "./_components/recent-payments";
import { RentalOverview } from "./_components/rental-overview";

export default function CustomerDashboardPage() {
  const {
    data: rentals = [],
    isLoading: rentalsLoading,
    isError: rentalsError,
  } = useRentals();

  const {
    data: paymentsResponse,
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["payments", "me"],
    queryFn: fetchMyPayments,
  });

  const payments = paymentsResponse?.data ?? [];

  const isLoading = rentalsLoading || paymentsLoading;
  const isError = rentalsError || paymentsError;

  const rentalStats = useMemo(() => {
    const completed = rentals.filter(
      (rental) => rental.status === "RETURNED" || rental.status === "COMPLETED",
    ).length;

    const inProgress = rentals.filter(
      (rental) =>
        rental.status !== "RETURNED" &&
        rental.status !== "COMPLETED" &&
        rental.status !== "CANCELLED",
    ).length;

    return {
      total: rentals.length,
      inProgress,
      completed,
    };
  }, [rentals]);

  /*
   * Payment statistics
   */
  const paymentStats = useMemo(() => {
    const paidPayments = payments.filter(
      (payment) => payment.status === "PAID",
    );

    const totalSpent = paidPayments.reduce(
      (total, payment) => total + Number(payment.amount),
      0,
    );

    const paymentCount = paidPayments.length;

    const averagePayment = paymentCount > 0 ? totalSpent / paymentCount : 0;

    return {
      totalSpent,
      paymentCount,
      averagePayment,
    };
  }, [payments]);

  /*
   * Most recent payments
   */
  const recentPayments = useMemo(() => {
    return [...payments]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5);
  }, [payments]);

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
        <div>
          <h1 className="text-center text-2xl font-semibold">My Dashboard</h1>

          <p className="mt-3 text-center text-sm text-muted-foreground">
            Track your rentals, payments, and leave reviews once gear is
            returned.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl border bg-muted/30"
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-95 animate-pulse rounded-xl border bg-muted/30" />
          <div className="h-95 animate-pulse rounded-xl border bg-muted/30" />
        </div>

        <div className="h-95 animate-pulse rounded-xl border bg-muted/30" />
      </div>
    );
  }

  /*
   * Error state
   */
  if (isError) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
          <h2 className="font-semibold text-destructive">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't retrieve your rental and payment information. Please try
            again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-center text-2xl font-semibold">My Dashboard</h1>

        <p className="mt-3 text-center text-sm text-muted-foreground">
          Track your rentals, payments, and leave reviews once gear is returned.
        </p>
      </div>

      {/* Summary */}
      <CustomerDashboardStats
        totalRentals={rentalStats.total}
        inProgress={rentalStats.inProgress}
        completed={rentalStats.completed}
        totalSpent={paymentStats.totalSpent}
      />

      {/* Rental + Payment */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RentalOverview
          total={rentalStats.total}
          inProgress={rentalStats.inProgress}
          completed={rentalStats.completed}
        />

        <PaymentSummary
          totalSpent={paymentStats.totalSpent}
          paymentCount={paymentStats.paymentCount}
          averagePayment={paymentStats.averagePayment}
        />
      </div>

      {/* Recent Payments */}
      <RecentPayments payments={recentPayments} />
    </div>
  );
}
