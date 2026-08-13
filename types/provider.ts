export type RentalStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "COMPLETED"
  | "CANCELLED";

export interface ProviderCustomer {
  id: string;
  name: string;
  email: string;
}

export interface ProviderRentalItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  totalPrice: string;

  gearItem: {
    id: string;
    name: string;
    image: string;
    brand: string;
    categoryName: string;
  };
}

export interface ProviderRentalOrder {
  id: string;
  customerId: string;
  status: RentalStatus;

  rentalStartDate: string;
  rentalEndDate: string;

  totalAmount: string;
  totalDays: number;

  notes: string;

  createdAt: string;
  updatedAt: string;

  customer: ProviderCustomer;

  rentalItems: ProviderRentalItem[];
}

export interface UpdateOrderStatusPayload {
  status: RentalStatus;
}
