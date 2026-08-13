import { AdminDashboardStats } from "@/types/admin";
import { Gear } from "@/types/gear";
import { RentalOrder } from "@/types/rental";
import type { User, UserStatus } from "@/types/user";

const API_BASE = "/api";

interface ApiEnvelope<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/admin/users`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const body: ApiEnvelope<User[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load users");
  }

  return body.data;
}

export async function updateUserStatus(
  userId: string,
  status: UserStatus,
): Promise<User> {
  const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const body: ApiEnvelope<User> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to update user status");
  }

  return body.data;
}

export async function fetchAllGearListings(): Promise<Gear[]> {
  const res = await fetch(`${API_BASE}/admin/gears`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const body: ApiEnvelope<Gear[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load gear listings");
  }

  return body.data;
}

export async function updateGearStatus(
  gearId: string,
  status: "AVAILABLE" | "INACTIVE",
): Promise<Gear> {
  const res = await fetch(`${API_BASE}/admin/gears/${gearId}/status`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  const body: ApiEnvelope<Gear> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to update gear status");
  }

  return body.data;
}

export async function fetchAllRentalOrders(): Promise<RentalOrder[]> {
  const res = await fetch(`${API_BASE}/admin/rentals`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const body: ApiEnvelope<RentalOrder[]> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load rental orders");
  }

  return body.data;
}

export async function fetchAdminDashboardStats(): Promise<AdminDashboardStats> {
  const res = await fetch(`${API_BASE}/admin/dashboard/stats`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const body: ApiEnvelope<AdminDashboardStats> = await res.json();

  if (!res.ok || !body.success) {
    throw new Error(body.message || "Failed to load dashboard statistics");
  }

  return body.data;
}
