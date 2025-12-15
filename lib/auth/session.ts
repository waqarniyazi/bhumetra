import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import type { User, UserRole } from "@/lib/types"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "bhumetra-secret-key-change-in-production")

const SESSION_COOKIE_NAME = "bhumetra-session"
const SESSION_EXPIRY_DAYS = 7

export interface SessionPayload {
  userId: string
  role: UserRole
  linkedEntityId: string
  email?: string
  phone?: string
  expiresAt: Date
}

export async function createSession(user: User): Promise<string> {
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000)

  const token = await new SignJWT({
    userId: user._id,
    role: user.role,
    linkedEntityId: user.linkedEntityId,
    email: user.email,
    phone: user.phone,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresAt)
    .setIssuedAt()
    .sign(JWT_SECRET)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  })

  return token
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value

  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)

    return {
      userId: payload.userId as string,
      role: payload.role as UserRole,
      linkedEntityId: payload.linkedEntityId as string,
      email: payload.email as string | undefined,
      phone: payload.phone as string | undefined,
      expiresAt: new Date((payload.exp as number) * 1000),
    }
  } catch {
    return null
  }
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export async function requireAuth(allowedRoles?: UserRole[]): Promise<SessionPayload> {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  if (allowedRoles && !allowedRoles.includes(session.role)) {
    throw new Error("Forbidden")
  }

  return session
}
