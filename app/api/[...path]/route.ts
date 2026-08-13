// app/api/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

async function proxy(req: NextRequest, path: string[]) {
  const BACKEND_URL = process.env.BACKEND_API_URL;

  if (!BACKEND_URL) {
    throw new Error("BACKEND_API_URL is not configured");
  }
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const targetUrl = `${BACKEND_URL}/${path.join("/")}${req.nextUrl.search}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const hasBody = !["GET", "HEAD"].includes(req.method);
  const body = hasBody ? await req.text() : undefined;

  const backendRes = await fetch(targetUrl, {
    method: req.method,
    headers,
    body,
    cache: "no-store",
  });

  const contentType = backendRes.headers.get("content-type") ?? "";
  const responseBody = contentType.includes("application/json")
    ? await backendRes.json()
    : await backendRes.text();

  return NextResponse.json(responseBody, { status: backendRes.status });
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return proxy(req, (await params).path);
}
