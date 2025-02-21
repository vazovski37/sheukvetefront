// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
  matcher: [
    "/admin/:path*",
    "/waiter/:path*",
    "/profile",
    "/orders",
    "/settings",
    "/login",
    "/"
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  console.log("Middleware executed for path:", url.pathname);

  const token = request.cookies.get("api_token")?.value;
  const userRole = request.cookies.get("role")?.value;

  // ✅ Allow public access to homepage and login page
  if (url.pathname === "/" || url.pathname === "/login") {
    return NextResponse.next();
  }

  // ❌ Redirect unauthorized users to `/login`
  if (!token) {
    console.log("No token found. Redirecting to /login");
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ✅ Admin can access everything under `/admin`
  if (url.pathname.startsWith("/admin") && userRole !== "ADMIN") {
    console.log("Unauthorized access to admin area. Redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Waiters can access `/waiter` routes
  if (url.pathname.startsWith("/waiter") && userRole !== "WAITER") {
    console.log("Unauthorized access to waiter area. Redirecting...");
    return NextResponse.redirect(new URL("/", request.url));
  }
 
  
  if (url.pathname === "/login") {
    if (userRole === "ADMIN") {
      url.pathname = "/admin";
    } else if (userRole === "WAITER") {
      url.pathname = "/waiter";
    }
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Allow request to proceed
}
