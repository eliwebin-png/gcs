import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedAdminRoute = path.startsWith("/admin") && !path.startsWith("/admin/login");

  if (isProtectedAdminRoute) {
    const token = request.cookies.get("school_admin_token")?.value;
    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", path);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If already logged in and navigating to login page, redirect to dashboard
  if (path === "/admin/login") {
    const token = request.cookies.get("school_admin_token")?.value;
    if (token) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
