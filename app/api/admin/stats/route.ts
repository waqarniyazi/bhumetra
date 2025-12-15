import { NextResponse } from "next/server"
import { getAllOrders } from "@/lib/services/order.service"
import { getAllAgents } from "@/lib/services/agent.service"
import { getAllFarmers } from "@/lib/services/farmer.service"

export async function GET() {
  try {
    const [orders, agents, farmers] = await Promise.all([getAllOrders(), getAllAgents(), getAllFarmers()])

    const totalTests = orders.length
    const totalRevenue = orders.filter((o) => o.paymentStatus === "SUCCESS").reduce((sum, o) => sum + o.amount, 0)
    const totalAgents = agents.length
    const totalFarmers = farmers.length

    return NextResponse.json({
      totalTests,
      totalRevenue,
      totalAgents,
      totalFarmers,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
