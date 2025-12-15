import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { markOrderAsPaid, getOrderById } from "@/lib/services/order.service"
import { UserRole, OrderStatus } from "@/lib/types"

interface RouteContext {
  params: Promise<{ orderId: string }>
}

export async function POST(request: Request, context: RouteContext) {
  try {
    const session = await getSession()
    if (!session || session.role !== UserRole.AGENT) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { orderId } = await context.params

    // Verify order exists and is pending payment
    const existingOrder = await getOrderById(orderId)
    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    if (existingOrder.status !== OrderStatus.PAYMENT_PENDING) {
      return NextResponse.json({ error: "Order already paid" }, { status: 400 })
    }

    // In production, verify Razorpay payment here
    // const { razorpayPaymentId } = await request.json()

    const order = await markOrderAsPaid(orderId)

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}
