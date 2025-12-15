"use server"

import { redirect } from "next/navigation"
import { createSession, deleteSession, getSession } from "./session"
import { UserRole, EntityStatus, Language } from "@/lib/types"
import { getMockUser, verifyMockPassword } from "./mock-users"

interface LoginCredentials {
  identifier: string
  password: string
}

interface SignupData {
  name: string
  phone: string
  email?: string
  password: string
  role: UserRole
  region?: string
  labName?: string
  village?: string
  district?: string
  state?: string
}

export async function login(credentials: LoginCredentials) {
  const { identifier, password } = credentials

  // Try mock users first (for demo purposes)
  const mockUser = getMockUser(identifier)
  if (mockUser && verifyMockPassword(identifier, password)) {
    await createSession(mockUser.user)
    const dashboardPath = getDashboardPath(mockUser.user.role)
    return { success: true, redirectTo: dashboardPath }
  }

  // Try database users (if MongoDB is connected)
  try {
    const { getUserByEmail, getUserByPhone, verifyPassword } = await import("@/lib/services/user.service")

    let user = await getUserByEmail(identifier)
    if (!user) {
      user = await getUserByPhone(identifier)
    }

    if (!user) {
      return {
        success: false,
        error:
          "Invalid credentials. Try demo accounts: farmer@demo.com, agent@demo.com, lab@demo.com, or admin@demo.com",
      }
    }

    const isValid = await verifyPassword(user, password)
    if (!isValid) {
      return { success: false, error: "Invalid password" }
    }

    await createSession(user)
    const dashboardPath = getDashboardPath(user.role)
    return { success: true, redirectTo: dashboardPath }
  } catch (error) {
    // Database not connected, only mock users available
    return {
      success: false,
      error:
        "Invalid credentials. Try demo accounts: farmer@demo.com/farmer123, agent@demo.com/agent123, lab@demo.com/lab123, or admin@demo.com/admin123",
    }
  }
}

export async function signup(data: SignupData) {
  try {
    const { createUser, getUserByEmail, getUserByPhone } = await import("@/lib/services/user.service")
    const { createFarmer } = await import("@/lib/services/farmer.service")
    const { createAgent } = await import("@/lib/services/agent.service")
    const { createLabTech } = await import("@/lib/services/labtech.service")

    // Check if user already exists
    if (data.email) {
      const existingByEmail = await getUserByEmail(data.email)
      if (existingByEmail) {
        return { success: false, error: "Email already registered" }
      }
    }

    const existingByPhone = await getUserByPhone(data.phone)
    if (existingByPhone) {
      return { success: false, error: "Phone number already registered" }
    }

    let linkedEntityId: string

    switch (data.role) {
      case UserRole.FARMER: {
        const farmer = await createFarmer({
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: {
            village: data.village || "",
            district: data.district || "",
            state: data.state || "India",
          },
          language: Language.EN,
        })
        linkedEntityId = farmer._id!
        break
      }
      case UserRole.AGENT: {
        const agent = await createAgent({
          name: data.name,
          phone: data.phone,
          region: data.region || "",
          status: EntityStatus.ACTIVE,
        })
        linkedEntityId = agent._id!
        break
      }
      case UserRole.LAB_TECH: {
        const labTech = await createLabTech({
          name: data.name,
          phone: data.phone,
          labName: data.labName || "",
          status: EntityStatus.ACTIVE,
        })
        linkedEntityId = labTech._id!
        break
      }
      default:
        return { success: false, error: "Invalid role for signup" }
    }

    const user = await createUser({
      role: data.role,
      email: data.email,
      phone: data.phone,
      password: data.password,
      linkedEntityId,
    })

    await createSession(user)
    const dashboardPath = getDashboardPath(user.role)
    return { success: true, redirectTo: dashboardPath }
  } catch (error) {
    return {
      success: false,
      error: "Database not connected. Please use the demo login instead.",
    }
  }
}

export async function logout() {
  await deleteSession()
  redirect("/login")
}

export async function getCurrentUser() {
  return await getSession()
}

function getDashboardPath(role: UserRole): string {
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
      return "/dashboard"
  }
}
