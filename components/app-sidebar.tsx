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
} from "lucide-react";
import { CurrentUser } from "@/lib/auth/get-current-user";
import Link from "next/link";
import GearUpLogo from "./ui/gearup-logo";
import Image from "next/image";

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

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: CurrentUser;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const items =
    user.role === "ADMIN"
      ? adminMenu
      : user.role === "PROVIDER"
        ? providerMenu
        : customerMenu;

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
