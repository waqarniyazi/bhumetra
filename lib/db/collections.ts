import { getDatabase } from "./mongodb"
import type {
  User,
  Farmer,
  Agent,
  LabTech,
  Admin,
  Order,
  SoilReport,
  Lead,
  ContactMessage,
  GlobalConfig,
} from "@/lib/types"
import type { Collection } from "mongodb"

export async function getUsersCollection(): Promise<Collection<User>> {
  const db = await getDatabase()
  return db.collection<User>("users")
}

export async function getFarmersCollection(): Promise<Collection<Farmer>> {
  const db = await getDatabase()
  return db.collection<Farmer>("farmers")
}

export async function getAgentsCollection(): Promise<Collection<Agent>> {
  const db = await getDatabase()
  return db.collection<Agent>("agents")
}

export async function getLabTechsCollection(): Promise<Collection<LabTech>> {
  const db = await getDatabase()
  return db.collection<LabTech>("labTechs")
}

export async function getAdminsCollection(): Promise<Collection<Admin>> {
  const db = await getDatabase()
  return db.collection<Admin>("admins")
}

export async function getOrdersCollection(): Promise<Collection<Order>> {
  const db = await getDatabase()
  return db.collection<Order>("orders")
}

export async function getSoilReportsCollection(): Promise<Collection<SoilReport>> {
  const db = await getDatabase()
  return db.collection<SoilReport>("soilReports")
}

export async function getLeadsCollection(): Promise<Collection<Lead>> {
  const db = await getDatabase()
  return db.collection<Lead>("leads")
}

export async function getContactMessagesCollection(): Promise<Collection<ContactMessage>> {
  const db = await getDatabase()
  return db.collection<ContactMessage>("contactMessages")
}

export async function getGlobalConfigCollection(): Promise<Collection<GlobalConfig>> {
  const db = await getDatabase()
  return db.collection<GlobalConfig>("globalConfig")
}
