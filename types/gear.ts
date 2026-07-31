export type GearAvailability = "available" | "out of stock" | "inactive";

export interface Gear {
  id: string;
  name: string;
  images: string[];
  category: string;
  brand: string;
  pricePerDay: number;
  availability: GearAvailability;
}

export interface GearFilters {
  search?: string;
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  availableFrom?: string;
  availableTo?: string;
  availability?: GearAvailability;
  page?: number;
  limit?: number;
}

export interface GearsResponse {
  data: Gear[];
  total: number;
  page: number;
  totalPages: number;
}
