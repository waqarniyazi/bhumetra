import { ObjectId } from "mongodb"
import { getLabTechsCollection } from "@/lib/db/collections"
import type { LabTech, EntityStatus } from "@/lib/types"

export async function createLabTech(labTech: Omit<LabTech, "_id" | "createdAt" | "updatedAt">): Promise<LabTech> {
  const collection = await getLabTechsCollection()
  const now = new Date()
  const doc = { ...labTech, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as LabTech)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getLabTechById(id: string): Promise<LabTech | null> {
  const collection = await getLabTechsCollection()
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function getAllLabTechs(): Promise<LabTech[]> {
  const collection = await getLabTechsCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function updateLabTech(id: string, updates: Partial<LabTech>): Promise<LabTech | null> {
  const collection = await getLabTechsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: "after" },
  )
  return result
}

export async function updateLabTechStatus(id: string, status: EntityStatus): Promise<LabTech | null> {
  return updateLabTech(id, { status })
}
