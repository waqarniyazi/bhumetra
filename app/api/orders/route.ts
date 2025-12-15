import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { createOrder } from "@/lib/services/order.service"
import { getGlobalConfig } from "@/lib/services/config.service"
import { calculateOrderAmount, calculateCommissions } from "@/lib/config"
import { UserRole, OrderStatus, PaymentStatus } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || session.role !== UserRole.AGENT) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { farmerId, acres } = body

    if (!farmerId || !acres) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const config = await getGlobalConfig()
    const amount = calculateOrderAmount(acres, config.baseTestPricePerAcre)
    const commission = calculateCommissions(amount, config.commission)

    const order = await createOrder({
      farmerId,
      agentId: session.linkedEntityId,
      acres,
      amount,
      status: OrderStatus.PAYMENT_PENDING,
      paymentStatus: PaymentStatus.PENDING,
      commission,
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 400 })
  }
}
