import { PaymentHistoryTable } from "../_components/payment-history-table";

export default function CustomerPaymentsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Payment History</h2>
      <PaymentHistoryTable />
    </div>
  );
}
