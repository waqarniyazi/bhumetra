import { ObjectId } from "mongodb"
import { getAgentsCollection } from "@/lib/db/collections"
import type { Agent, EntityStatus } from "@/lib/types"

export async function createAgent(agent: Omit<Agent, "_id" | "createdAt" | "updatedAt">): Promise<Agent> {
  const collection = await getAgentsCollection()
  const now = new Date()
  const doc = { ...agent, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as Agent)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getAgentById(id: string): Promise<Agent | null> {
  const collection = await getAgentsCollection()
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function getAllAgents(): Promise<Agent[]> {
  const collection = await getAgentsCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function updateAgent(id: string, updates: Partial<Agent>): Promise<Agent | null> {
  const collection = await getAgentsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: "after" },
  )
  return result
}

export async function updateAgentStatus(id: string, status: EntityStatus): Promise<Agent | null> {
  return updateAgent(id, { status })
}
