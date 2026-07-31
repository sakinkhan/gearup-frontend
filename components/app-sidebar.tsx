"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  CreditCard,
  Star,
  Boxes,
  ClipboardList,
  Users,
} from "lucide-react";

const customerMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Rental Orders",
    url: "/dashboard/orders",
    icon: Package,
  },
  {
    title: "Payment History",
    url: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "My Reviews",
    url: "/dashboard/reviews",
    icon: Star,
  },
];

const providerMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Gear",
    url: "/dashboard/gears",
    icon: Boxes,
  },
  {
    title: "Active Rentals",
    url: "/dashboard/rentals",
    icon: ClipboardList,
  },
  {
    title: "Pending Orders",
    url: "/dashboard/pending-orders",
    icon: Package,
  },
];

const adminMenu = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Gear",
    url: "/dashboard/gears",
    icon: Boxes,
  },
  {
    title: "Rentals",
    url: "/dashboard/rentals",
    icon: ClipboardList,
  },
];
const items =
  role === "ADMIN"
    ? adminMenu
    : role === "PROVIDER"
      ? providerMenu
      : customerMenu;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 flex justify-center">
        <Image
          src="/Logo-transparent.png"
          alt="GearUp"
          width={130}
          height={40}
        />
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
