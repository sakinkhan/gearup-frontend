"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Star,
  Boxes,
  ClipboardList,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import GearUpLogo from "./ui/gearup-logo";
import Image from "next/image";
import { CurrentUser } from "@/types/user";

type MenuItem = {
  title: string;
  path: string; // relative to the role's dashboard root, "" = the root itself
  icon: LucideIcon;
};

type Role = CurrentUser["role"];

const roleBasePath: Record<Role, string> = {
  ADMIN: "/dashboard/admin",
  PROVIDER: "/dashboard/provider",
  CUSTOMER: "/dashboard/customer",
};

const roleMenuItems: Record<Role, MenuItem[]> = {
  CUSTOMER: [
    { title: "Dashboard", path: "", icon: LayoutDashboard },
    { title: "Rental Orders", path: "/rentals", icon: Package },
    { title: "Payment History", path: "/payments", icon: CreditCard },
    { title: "My Reviews", path: "/reviews", icon: Star },
  ],
  PROVIDER: [
    { title: "Dashboard", path: "", icon: LayoutDashboard },
    { title: "My Gears", path: "/my-gears", icon: Boxes },
    { title: "Active Rentals", path: "/active-rentals", icon: ClipboardList },
    { title: "Pending Orders", path: "/pending-orders", icon: Package },
  ],
  ADMIN: [
    { title: "Dashboard", path: "", icon: LayoutDashboard },
    { title: "User Management", path: "/user-management", icon: Users },
    { title: "Gear Management", path: "/gear-management", icon: Boxes },
    {
      title: "Rental Management",
      path: "/rental-management",
      icon: ClipboardList,
    },
  ],
};

function buildMenu(role: Role) {
  const base = roleBasePath[role];
  return roleMenuItems[role].map((item) => ({
    title: item.title,
    icon: item.icon,
    url: `${base}${item.path}`,
  }));
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: CurrentUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const items = buildMenu(user.role);
  const { state } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 flex justify-center">
        <Link href="/">
          {state === "collapsed" ? (
            <Image src="/Logo-icon.png" alt="GearUp" width={28} height={28} />
          ) : (
            <GearUpLogo />
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
