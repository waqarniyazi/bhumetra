import { NextResponse } from "next/server"
import { getSession } from "@/lib/auth/session"
import { createSoilReport, getReportByOrderId, updateSoilReport } from "@/lib/services/report.service"
import { updateOrderStatus } from "@/lib/services/order.service"
import { UserRole, OrderStatus } from "@/lib/types"

export async function POST(request: Request) {
  try {
    const session = await getSession()
    if (!session || (session.role !== UserRole.LAB_TECH && session.role !== UserRole.ADMIN)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, customerId, soilParams, markComplete } = body

    // Check if report already exists
    const existing = await getReportByOrderId(orderId)
    if (existing) {
      return NextResponse.json({ error: "Report already exists, use PUT to update" }, { status: 400 })
    }

    const report = await createSoilReport({
      orderId,
      customerId,
      soilParams,
    })

    // Update order status
    const newStatus = markComplete ? OrderStatus.COMPLETED : OrderStatus.UNDER_TESTING
    await updateOrderStatus(orderId, newStatus)

    return NextResponse.json(report, { status: 201 })
  } catch (error) {
    console.error("Error creating report:", error)
    return NextResponse.json({ error: "Failed to create report" }, { status: 400 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getSession()
    if (!session || (session.role !== UserRole.LAB_TECH && session.role !== UserRole.ADMIN)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { orderId, soilParams, markComplete } = body

    // Find existing report
    const existing = await getReportByOrderId(orderId)
    if (!existing) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    const report = await updateSoilReport(existing._id!, {
      soilParams,
    })

    // Update order status if marking complete
    if (markComplete) {
      await updateOrderStatus(orderId, OrderStatus.COMPLETED)
    }

    return NextResponse.json(report)
  } catch (error) {
    console.error("Error updating report:", error)
    return NextResponse.json({ error: "Failed to update report" }, { status: 400 })
  }
}
