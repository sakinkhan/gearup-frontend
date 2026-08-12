import type { RentalOrderStatus } from "@/types/rental";

export interface ProviderCustomer {
  id: string;
  name: string;
  email: string;
}

export interface ProviderGearItem {
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

export interface ProviderRentalItem {
  id: string;
  rentalOrderId: string;
  gearItemId: string;
  quantity: number;
  pricePerDay: string;
  totalPrice: string;
  gearItem: ProviderGearItem;
}

export interface ProviderRentalOrder {
  id: string;
  customerId: string;
  totalAmount: string;
  rentalStartDate: string;
  rentalEndDate: string;
  totalDays: number;
  status: RentalOrderStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;

  customer: ProviderCustomer;
  rentalItems: ProviderRentalItem[];
}
