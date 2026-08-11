import { RentalHistoryList } from "@/app/(dashboardGroup)/_components/rental-history-list";

export default function CustomerRentalsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Rental Orders</h2>
      <RentalHistoryList />
    </div>
  );
}
