import { ObjectId } from "mongodb"
import { getLeadsCollection } from "@/lib/db/collections"
import type { Lead, LeadStatus } from "@/lib/types"

export async function createLead(lead: Omit<Lead, "_id" | "createdAt" | "status">): Promise<Lead> {
  const collection = await getLeadsCollection()
  const now = new Date()
  const doc = { ...lead, status: "NEW" as LeadStatus, createdAt: now }
  const result = await collection.insertOne(doc as Lead)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getAllLeads(): Promise<Lead[]> {
  const collection = await getLeadsCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<Lead | null> {
  const collection = await getLeadsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status } },
    { returnDocument: "after" },
  )
  return result
}
