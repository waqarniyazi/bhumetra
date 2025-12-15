import { NextResponse } from "next/server"
import { getAllOrders } from "@/lib/services/order.service"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")

    let orders = await getAllOrders()

    if (limit) {
      orders = orders.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
