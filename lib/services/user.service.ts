import { ObjectId } from "mongodb"
import { getUsersCollection } from "@/lib/db/collections"
import type { User, UserRole } from "@/lib/types"
import bcrypt from "bcryptjs"

export async function createUser(
  user: Omit<User, "_id" | "createdAt" | "updatedAt" | "passwordHash"> & { password: string },
): Promise<User> {
  const collection = await getUsersCollection()
  const now = new Date()
  const passwordHash = await bcrypt.hash(user.password, 10)
  const { password, ...userData } = user
  const doc = { ...userData, passwordHash, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as User)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getUserById(id: string): Promise<User | null> {
  const collection = await getUsersCollection()
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const collection = await getUsersCollection()
  return await collection.findOne({ email })
}

export async function getUserByPhone(phone: string): Promise<User | null> {
  const collection = await getUsersCollection()
  return await collection.findOne({ phone })
}

export async function verifyPassword(user: User, password: string): Promise<boolean> {
  if (!user.passwordHash) return false
  return await bcrypt.compare(password, user.passwordHash)
}

export async function getUsersByRole(role: UserRole): Promise<User[]> {
  const collection = await getUsersCollection()
  return await collection.find({ role }).toArray()
}
