import { redirect } from "next/navigation"
import { getOrderById } from "@/lib/services/order.service"
import { getReportByOrderId } from "@/lib/services/report.service"
import { OrderStatus } from "@/lib/types"
import { SoilReportForm } from "./components/soil-report-form"

interface PageProps {
  params: Promise<{ orderId: string }>
}

export default async function SoilReportPage({ params }: PageProps) {
  const { orderId } = await params
  const order = await getOrderById(orderId)

  if (!order) {
    redirect("/dashboard/lab/pending")
  }

  // Check if order is in a valid state for lab work
  const validStatuses = [OrderStatus.SENT_TO_LAB, OrderStatus.UNDER_TESTING, OrderStatus.COMPLETED]
  if (!validStatuses.includes(order.status as OrderStatus)) {
    redirect("/dashboard/lab/pending")
  }

  const existingReport = await getReportByOrderId(orderId)

  return <SoilReportForm order={order} existingReport={existingReport} />
}
