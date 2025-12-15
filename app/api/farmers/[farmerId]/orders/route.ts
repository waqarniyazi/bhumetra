import { NextResponse } from "next/server"
import { getOrdersByFarmerId } from "@/lib/services/order.service"

export async function GET(request: Request, { params }: { params: Promise<{ farmerId: string }> }) {
  try {
    const { farmerId } = await params
    const orders = await getOrdersByFarmerId(farmerId)

    return NextResponse.json({ orders })
  } catch (error) {
    console.error("Error fetching farmer orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
