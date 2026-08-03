"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  CreditCard,
  LifeBuoy,
  LogOut,
  Menu,
  Moon,
  Settings,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";

import GuestMenu from "./guest-menu";

import { logout } from "@/app/service/logout";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { NavbarUser } from "@/app/utils/navbar-utils/types";
import {
  dashboardLink,
  dashboardRouteByRole,
  navLinks,
} from "@/app/utils/navbar-utils/nav-links";
import GearUpLogo from "../ui/gearup-logo";
import { ThemeToggle } from "../ui/theme-toggle";
import { getInitials } from "@/app/utils/navbar-utils/utils";

type Props = {
  user: NavbarUser | null;
};

export default function MobileNav({ user }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const dashboardHref = user ? dashboardRouteByRole[user.role] : "";
  const DashboardIcon = dashboardLink.icon;

  async function handleLogout() {
    setOpen(false);

    await logout();

    toast.success("Logged out successfully");

    router.push("/");

    router.refresh();
  }

  function closeDrawer() {
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-80">
          <SheetHeader>
            <SheetTitle>
              <GearUpLogo />
            </SheetTitle>
          </SheetHeader>

          <div className="mt-8 flex flex-col gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <Button
                  key={link.href}
                  variant="ghost"
                  asChild
                  className={cn(
                    "justify-start px-4 py-2 mx-4",
                    pathname === link.href && "bg-accent text-primary",
                  )}
                >
                  <Link href={link.href} onClick={closeDrawer}>
                    <Icon className="mr-2 size-5" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}

            {user && (
              <Button
                variant="ghost"
                asChild
                className={cn(
                  "justify-start px-4 py-2 mx-4",
                  pathname === dashboardHref && "bg-accent text-primary",
                )}
              >
                <Link href={dashboardHref} onClick={closeDrawer}>
                  <DashboardIcon className="mr-2 size-5" />
                  {dashboardLink.label}
                </Link>
              </Button>
            )}
          </div>

          <Separator className="my-6" />

          {!user && (
            <div onClick={closeDrawer}>
              <GuestMenu mobile />
            </div>
          )}

          {user && (
            <div className="space-y-6">
              <div className="mx-6 flex items-center gap-3">
                <Avatar className="size-12">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />

                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-medium">{user.name}</p>

                  <p className="truncate text-xs text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  asChild
                  className="justify-start px-4 py-2 mx-4"
                >
                  <Link href="/profile" onClick={closeDrawer}>
                    <User className="mr-2 size-5" />
                    Profile
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  asChild
                  className="justify-start px-4 py-2 mx-4"
                >
                  <Link href="/billing" onClick={closeDrawer}>
                    <CreditCard className="mr-2 size-5" />
                    Billing
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  asChild
                  className="justify-start px-4 py-2 mx-4"
                >
                  <Link href="/settings" onClick={closeDrawer}>
                    <Settings className="mr-2 size-5" />
                    Settings
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  asChild
                  className="justify-start px-4 py-2 mx-4"
                >
                  <Link href="/support" onClick={closeDrawer}>
                    <LifeBuoy className="mr-2 size-5" />
                    Support
                  </Link>
                </Button>

                <Button
                  variant="destructive"
                  onClick={handleLogout}
                  className="mt-4 justify-start px-4 py-2 mx-4"
                >
                  <LogOut className="mr-2 size-5" />
                  Sign out
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
