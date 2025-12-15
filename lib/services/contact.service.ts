import { ObjectId } from "mongodb"
import { getContactMessagesCollection } from "@/lib/db/collections"
import type { ContactMessage } from "@/lib/types"

export async function createContactMessage(
  message: Omit<ContactMessage, "_id" | "createdAt" | "isRead">,
): Promise<ContactMessage> {
  const collection = await getContactMessagesCollection()
  const now = new Date()
  const doc = { ...message, isRead: false, createdAt: now }
  const result = await collection.insertOne(doc as ContactMessage)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getAllContactMessages(): Promise<ContactMessage[]> {
  const collection = await getContactMessagesCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function markMessageAsRead(id: string): Promise<ContactMessage | null> {
  const collection = await getContactMessagesCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { isRead: true } },
    { returnDocument: "after" },
  )
  return result
}
