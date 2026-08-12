export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";

export interface PaymentRentalOrderSummary {
  id: string;
  customerId: string;
  totalAmount: string;
  rentalStartDate: string;
  rentalEndDate: string;
  totalDays: number;
  status: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  rentalOrderId: string;
  transactionId: string;
  provider: "STRIPE" | "SSLCOMMERZ" | string;
  paymentMethod: string | null;
  amount: string;
  currency: string;
  status: PaymentStatus;
  paidAt: string | null;
  createdAt: string;
  rentalOrder: PaymentRentalOrderSummary;
}
