import { ObjectId } from "mongodb"
import { getSoilReportsCollection } from "@/lib/db/collections"
import type { SoilReport } from "@/lib/types"

export async function createSoilReport(
  report: Omit<SoilReport, "_id" | "createdAt" | "updatedAt">,
): Promise<SoilReport> {
  const collection = await getSoilReportsCollection()
  const now = new Date()
  const doc = { ...report, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as SoilReport)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getReportByOrderId(orderId: string): Promise<SoilReport | null> {
  const collection = await getSoilReportsCollection()
  return await collection.findOne({ orderId })
}

export async function getReportByCustomerId(customerId: string): Promise<SoilReport | null> {
  const collection = await getSoilReportsCollection()
  return await collection.findOne({ customerId })
}

export async function updateSoilReport(id: string, updates: Partial<SoilReport>): Promise<SoilReport | null> {
  const collection = await getSoilReportsCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: "after" },
  )
  return result
}

export async function getAllReports(): Promise<SoilReport[]> {
  const collection = await getSoilReportsCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}
