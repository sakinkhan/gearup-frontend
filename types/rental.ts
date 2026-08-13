export type RentalOrderStatus =
  | "PENDING_PAYMENT"
  | "PAID"
  | "CONFIRMED"
  | "PICKED_UP"
  | "RETURNED"
  | "COMPLETED"
  | "CANCELLED";

export interface RentalGearItem {
  id: string;
  providerId: string;

  categoryName: string;
  name: string;
  brand: string;
  description: string;

  rentalPricePerDay: string;
  depositAmount: string;

  stock: number;
  availableStock: number;

  condition: string;
  status: "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";

  image: string;

  createdAt: string;
  updatedAt: string;

  provider: RentalProvider;
}

export interface RentalItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  totalPrice: string;
  hasReviewed: boolean;
  gearItem: RentalGearItem;
}

export interface RentalOrder {
  id: string;
  customerId: string;
  customer: RentalCustomer;

  totalAmount: string;
  rentalStartDate: string;
  rentalEndDate: string;
  totalDays: number;
  status: RentalOrderStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
  rentalItems: RentalItem[];
}

export interface RentalCustomer {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
}

export interface RentalProvider {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
}
