import { ObjectId } from "mongodb"
import { getFarmersCollection } from "@/lib/db/collections"
import type { Farmer } from "@/lib/types"

export async function createFarmer(farmer: Omit<Farmer, "_id" | "createdAt" | "updatedAt">): Promise<Farmer> {
  const collection = await getFarmersCollection()
  const now = new Date()
  const doc = { ...farmer, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as Farmer)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getFarmerById(id: string): Promise<Farmer | null> {
  const collection = await getFarmersCollection()
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function getFarmerByPhone(phone: string): Promise<Farmer | null> {
  const collection = await getFarmersCollection()
  return await collection.findOne({ phone })
}

export async function getFarmersByAgentId(agentId: string): Promise<Farmer[]> {
  const collection = await getFarmersCollection()
  return await collection.find({ createdByAgentId: agentId }).toArray()
}

export async function getAllFarmers(): Promise<Farmer[]> {
  const collection = await getFarmersCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function updateFarmer(id: string, updates: Partial<Farmer>): Promise<Farmer | null> {
  const collection = await getFarmersCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: "after" },
  )
  return result
}
