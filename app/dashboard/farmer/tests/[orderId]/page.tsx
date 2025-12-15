import { getSession } from "@/lib/auth/session"
import { redirect, notFound } from "next/navigation"
import { UserRole } from "@/lib/types"
import { getFarmerById } from "@/lib/services/farmer.service"
import { getOrderById } from "@/lib/services/order.service"
import { getReportByOrderId } from "@/lib/services/report.service"
import { FarmerDashboardShell } from "../../components/farmer-dashboard-shell"
import { SoilReportView } from "./components/soil-report-view"

export default async function FarmerTestDetailPage({
  params,
}: {
  params: Promise<{ orderId: string }>
}) {
  const { orderId } = await params
  const session = await getSession()

  if (!session || session.role !== UserRole.FARMER) {
    redirect("/login")
  }

  const farmer = await getFarmerById(session.linkedEntityId)

  if (!farmer) {
    redirect("/login")
  }

  const order = await getOrderById(orderId)

  if (!order || order.farmerId !== session.linkedEntityId) {
    notFound()
  }

  const report = await getReportByOrderId(orderId)

  return (
    <FarmerDashboardShell farmerName={farmer.name}>
      <SoilReportView order={order} report={report} />
    </FarmerDashboardShell>
  )
}
