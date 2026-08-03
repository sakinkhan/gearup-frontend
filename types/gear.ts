export type GearStatus = "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";
export type GearCondition = "NEW" | "USED";
export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

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
  role: UserRole;
  status: string;
}

export type Gear = {
  id: string;
  providerId: string;

  categoryName: string;
  name: string;
  brand: string;
  description: string;

  rentalPricePerDay: string | number;
  depositAmount: string | number;

  stock: number;
  availableStock: number;

  condition: "NEW" | "GOOD" | "FAIR" | "USED";
  status: "AVAILABLE" | "UNAVAILABLE" | "INACTIVE";

  image: string;

  createdAt: string;
  updatedAt: string;

  provider: {
    id: string;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    image?: string | null;
    role: "CUSTOMER" | "PROVIDER" | "ADMIN";
    status: string;
  };

  reviews: {
    id?: string;
    rating: number;
    comment?: string;
  }[];
};

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
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
}
