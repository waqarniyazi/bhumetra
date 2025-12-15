import { UserRole, EntityStatus, Language } from "@/lib/types"
import type { User, Farmer, Agent, LabTech, Admin } from "@/lib/types"

// Mock users for demo/testing purposes
export const MOCK_USERS: Record<string, { user: User; entity: Farmer | Agent | LabTech | Admin; password: string }> = {
  "farmer@demo.com": {
    password: "farmer123",
    user: {
      _id: "mock-farmer-user-001",
      role: UserRole.FARMER,
      email: "farmer@demo.com",
      phone: "9876543210",
      linkedEntityId: "mock-farmer-001",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    entity: {
      _id: "mock-farmer-001",
      name: "Ramesh Kumar",
      phone: "9876543210",
      email: "farmer@demo.com",
      address: {
        line1: "Village Road",
        village: "Sundarnagar",
        tehsil: "Sadar",
        district: "Varanasi",
        state: "Uttar Pradesh",
        pinCode: "221001",
      },
      landSizeInAcres: 5,
      language: Language.HI,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Farmer,
  },
  "agent@demo.com": {
    password: "agent123",
    user: {
      _id: "mock-agent-user-001",
      role: UserRole.AGENT,
      email: "agent@demo.com",
      phone: "9876543211",
      linkedEntityId: "mock-agent-001",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    entity: {
      _id: "mock-agent-001",
      name: "Suresh Yadav",
      phone: "9876543211",
      region: "Varanasi, Uttar Pradesh",
      status: EntityStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Agent,
  },
  "lab@demo.com": {
    password: "lab123",
    user: {
      _id: "mock-lab-user-001",
      role: UserRole.LAB_TECH,
      email: "lab@demo.com",
      phone: "9876543212",
      linkedEntityId: "mock-lab-001",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    entity: {
      _id: "mock-lab-001",
      name: "Dr. Priya Singh",
      phone: "9876543212",
      labName: "Bhumetra Central Lab",
      status: EntityStatus.ACTIVE,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as LabTech,
  },
  "admin@demo.com": {
    password: "admin123",
    user: {
      _id: "mock-admin-user-001",
      role: UserRole.ADMIN,
      email: "admin@demo.com",
      phone: "9876543213",
      linkedEntityId: "mock-admin-001",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    entity: {
      _id: "mock-admin-001",
      name: "Vikram Sharma",
      email: "admin@demo.com",
      phone: "9876543213",
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Admin,
  },
}

export function getMockUser(identifier: string) {
  // Check by email
  if (MOCK_USERS[identifier]) {
    return MOCK_USERS[identifier]
  }
  // Check by phone
  for (const [email, data] of Object.entries(MOCK_USERS)) {
    if (data.user.phone === identifier) {
      return data
    }
  }
  return null
}

export function verifyMockPassword(identifier: string, password: string): boolean {
  const mockUser = getMockUser(identifier)
  if (!mockUser) return false
  return mockUser.password === password
}
