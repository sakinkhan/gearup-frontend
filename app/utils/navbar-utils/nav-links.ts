import { FolderKanban, HomeIcon, LayoutDashboard } from "lucide-react";

export type UserRole = "CUSTOMER" | "PROVIDER" | "ADMIN";

export const dashboardRouteByRole: Record<UserRole, string> = {
  CUSTOMER: "/dashboard/customer",
  PROVIDER: "/dashboard/provider",
  ADMIN: "/dashboard/admin",
};

export const navLinks = [
  {
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    label: "Gears",
    href: "/gears",
    icon: FolderKanban,
  },
];

export const dashboardLink = {
  label: "Dashboard",
  icon: LayoutDashboard,
};
