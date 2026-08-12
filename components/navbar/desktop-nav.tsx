"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  dashboardLink,
  dashboardRouteByRole,
  navLinks,
} from "@/app/utils/navbar-utils/nav-links";
import { NavbarUser } from "@/app/utils/navbar-utils/types";

type Props = {
  user: NavbarUser | null;
};

export default function DesktopNav({ user }: Props) {
  const pathname = usePathname();
  const DashboardIcon = dashboardLink.icon;

  const dashboardHref = user ? dashboardRouteByRole[user.role] : "";

  return (
    <ul className="ml-10 hidden items-center gap-2 lg:flex">
      {navLinks.map((link) => {
        const Icon = link.icon;

        return (
          <li key={link.href}>
            <Button
              variant="ghost"
              size="sm"
              asChild
              className={cn(pathname === link.href && "bg-accent text-primary")}
            >
              <Link href={link.href}>
                <Icon className="size-4" />
                {link.label}
              </Link>
            </Button>
          </li>
        );
      })}

      {user && (
        <li>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              pathname === dashboardHref && "bg-accent text-primary",
            )}
          >
            <Link href={dashboardHref}>
              <DashboardIcon className="size-4" />
              {dashboardLink.label}
            </Link>
          </Button>
        </li>
      )}
    </ul>
  );
}
