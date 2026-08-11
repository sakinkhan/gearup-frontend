export type RentalOrderStatus =
  | "PENDING_PAYMENT"
  | "CONFIRMED"
  | "ACTIVE"
  | "RETURNED"
  | "CANCELLED"
  | "COMPLETED";

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
}

export interface RentalItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  totalPrice: string;
  gearItem: RentalGearItem;
}

export interface RentalOrder {
  id: string;
  customerId: string;
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
