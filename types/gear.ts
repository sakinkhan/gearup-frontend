export type GearStatus = "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";
export type GearCondition = "NEW" | "USED";

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  userId?: string;
  createdAt?: string;
}

export interface GearProvider {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: string;
}

export interface Gear {
  id: string;
  providerId: string;
  categoryName: string;
  name: string;
  brand: string;
  description: string;
  rentalPricePerDay: string; // numeric string from API
  depositAmount: string; // numeric string from API
  stock: number;
  availableStock: number;
  condition: GearCondition;
  status: GearStatus;
  image: string;
  createdAt: string;
  updatedAt: string;
  provider: GearProvider;
  reviews: Review[];
}

export interface GearFilters {
  search?: string;
  categoryName?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: GearStatus;
  startDate?: string;
  endDate?: string;
  page?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
