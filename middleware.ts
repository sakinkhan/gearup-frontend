import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  exp?: number;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;

  // Not logged in
  if (!accessToken) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  let decodedToken: TokenPayload;

  try {
    decodedToken = jwtDecode<TokenPayload>(accessToken);
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Check token expiration
  if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Customer routes
  if (pathname.startsWith("/dashboard/customer")) {
    if (decodedToken.role !== "CUSTOMER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Provider routes
  if (pathname.startsWith("/dashboard/provider")) {
    if (decodedToken.role !== "PROVIDER") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Admin routes
  if (pathname.startsWith("/dashboard/admin")) {
    if (decodedToken.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
