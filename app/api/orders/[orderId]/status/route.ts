import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { updateOrderStatus } from "@/lib/services/order.service"
import { UserRole, OrderStatus } from "@/lib/types"

interface RouteContext {
  params: Promise<{ orderId: string }>
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { orderId } = await context.params
    const body = await request.json()
    const { status } = body

    // Validate status transition based on role
    const allowedTransitions: Record<UserRole, OrderStatus[]> = {
      [UserRole.AGENT]: [OrderStatus.SENT_TO_LAB],
      [UserRole.LAB_TECH]: [OrderStatus.UNDER_TESTING, OrderStatus.COMPLETED],
      [UserRole.ADMIN]: Object.values(OrderStatus) as OrderStatus[],
      [UserRole.FARMER]: [],
    }

    if (!allowedTransitions[session.role].includes(status)) {
      return NextResponse.json({ error: "Invalid status transition" }, { status: 403 })
    }

    const order = await updateOrderStatus(orderId, status)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}
