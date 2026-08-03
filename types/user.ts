export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  image?: string;
  role: UserRole;
  status: UserStatus;
  stripeCustomerId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserPayload {
  name?: string;
  phone?: string;
  address?: string;
  image?: string;
}
