import { ObjectId } from "mongodb"
import { getOrdersCollection } from "@/lib/db/collections"
import { generateCustomerId } from "@/lib/config"
import type { Order, OrderStatus, PaymentStatus } from "@/lib/types"

export async function createOrder(order: Omit<Order, "_id" | "createdAt" | "updatedAt">): Promise<Order> {
  const collection = await getOrdersCollection()
  const now = new Date()
  const doc = { ...order, createdAt: now, updatedAt: now }
  const result = await collection.insertOne(doc as Order)
  return { ...doc, _id: result.insertedId.toString() }
}

export async function getOrderById(id: string): Promise<Order | null> {
  const collection = await getOrdersCollection()
  return await collection.findOne({ _id: new ObjectId(id) })
}

export async function getOrderByCustomerId(customerId: string): Promise<Order | null> {
  const collection = await getOrdersCollection()
  return await collection.findOne({ customerId })
}

export async function getOrdersByFarmerId(farmerId: string): Promise<Order[]> {
  const collection = await getOrdersCollection()
  return await collection.find({ farmerId }).sort({ createdAt: -1 }).toArray()
}

export async function getOrdersByAgentId(agentId: string): Promise<Order[]> {
  const collection = await getOrdersCollection()
  return await collection.find({ agentId }).sort({ createdAt: -1 }).toArray()
}

export async function getOrdersByStatus(statuses: OrderStatus[]): Promise<Order[]> {
  const collection = await getOrdersCollection()
  return await collection
    .find({ status: { $in: statuses } })
    .sort({ createdAt: -1 })
    .toArray()
}

export async function getAllOrders(): Promise<Order[]> {
  const collection = await getOrdersCollection()
  return await collection.find({}).sort({ createdAt: -1 }).toArray()
}

export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order | null> {
  const collection = await getOrdersCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { status, updatedAt: new Date() } },
    { returnDocument: "after" },
  )
  return result
}

export async function markOrderAsPaid(id: string, razorpayPaymentId?: string): Promise<Order | null> {
  const collection = await getOrdersCollection()

  // Generate unique customer ID
  let customerId = generateCustomerId()

  // Ensure uniqueness
  let existing = await collection.findOne({ customerId })
  while (existing) {
    customerId = generateCustomerId()
    existing = await collection.findOne({ customerId })
  }

  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: "PAID" as OrderStatus,
        paymentStatus: "SUCCESS" as PaymentStatus,
        customerId,
        razorpayPaymentId,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" },
  )
  return result
}

export async function updatePaymentStatus(id: string, paymentStatus: PaymentStatus): Promise<Order | null> {
  const collection = await getOrdersCollection()
  const result = await collection.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { paymentStatus, updatedAt: new Date() } },
    { returnDocument: "after" },
  )
  return result
}
