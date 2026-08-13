export interface AdminDashboardStats {
  totalUsers: number;
  totalCustomers: number;
  totalProviders: number;
  totalAdmins: number;
  totalGear: number;
  activeGear: number;
  totalRentals: number;
  activeRentals: number;
  rentalStatusCounts: {
    PENDING_PAYMENT: number;
    PAID: number;
    CONFIRMED: number;
    PICKED_UP: number;
    RETURNED: number;
    COMPLETED: number;
    CANCELLED: number;
  };
}
