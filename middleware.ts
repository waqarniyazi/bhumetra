import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"
import { UserRole } from "@/lib/types"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "bhumetra-secret-key-change-in-production")
const SESSION_COOKIE_NAME = "bhumetra-session"

// Define route access rules
const routeAccessRules: Record<string, UserRole[]> = {
  "/dashboard/farmer": [UserRole.FARMER],
  "/dashboard/agent": [UserRole.AGENT],
  "/dashboard/lab": [UserRole.LAB_TECH],
  "/dashboard/admin": [UserRole.ADMIN],
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only check dashboard routes
  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value

  // No token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const userRole = payload.role as UserRole

    // Check if user has access to this route
    for (const [route, allowedRoles] of Object.entries(routeAccessRules)) {
      if (pathname.startsWith(route) && !allowedRoles.includes(userRole)) {
        // Redirect to their appropriate dashboard
        const correctDashboard = getDashboardForRole(userRole)
        return NextResponse.redirect(new URL(correctDashboard, request.url))
      }
    }

    return NextResponse.next()
  } catch {
    // Invalid token, redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url))
    response.cookies.delete(SESSION_COOKIE_NAME)
    return response
  }
}

function getDashboardForRole(role: UserRole): string {
  switch (role) {
    case UserRole.FARMER:
      return "/dashboard/farmer"
    case UserRole.AGENT:
      return "/dashboard/agent"
    case UserRole.LAB_TECH:
      return "/dashboard/lab"
    case UserRole.ADMIN:
      return "/dashboard/admin"
    default:
      return "/login"
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
}
