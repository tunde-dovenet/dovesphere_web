import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin") && nextUrl.pathname !== "/admin";
  const isApiAdminRoute = nextUrl.pathname.startsWith("/api/forms") && req.method !== "GET" && !nextUrl.pathname.includes("/submit");

  if ((isAdminRoute || isApiAdminRoute) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*", "/api/forms/:path*"],
};
