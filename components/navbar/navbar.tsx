"use client";

import Link from "next/link";

import DesktopNav from "./desktop-nav";
import GuestMenu from "./guest-menu";
import MobileNav from "./mobile-nav";
import UserMenu from "./user-menu";
import GearUpLogo from "../ui/gearup-logo";
import { ThemeToggle } from "../ui/theme-toggle";
import { NavbarUser } from "@/app/utils/navbar-utils/types";

type NavbarProps = {
  user: NavbarUser | null;
};

export function Navbar({ user }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur supports-backdrop-filter:bg-background/70">
      <div className="container relative mx-auto flex h-16 max-w-6xl items-center px-4">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <GearUpLogo />
        </Link>

        {/* Desktop Navigation - Centered */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
          <DesktopNav user={user} />
        </div>

        {/* Right Side */}
        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <ThemeToggle />

          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </div>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <MobileNav user={user} />
        </div>
      </div>
    </header>
  );
}
