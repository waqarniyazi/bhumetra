import { getSession } from "@/lib/auth/session"
import { getOrdersByAgentId } from "@/lib/services/order.service"
import { OrderStatus } from "@/lib/types"
import { AgentOverview } from "./components/agent-overview"

export default async function AgentDashboardPage() {
  const session = await getSession()
  const orders = await getOrdersByAgentId(session!.linkedEntityId)

  const stats = {
    totalTests: orders.length,
    paidTests: orders.filter((o) => o.paymentStatus === "SUCCESS").length,
    completedTests: orders.filter((o) => o.status === OrderStatus.COMPLETED).length,
    pendingPayment: orders.filter((o) => o.status === OrderStatus.PAYMENT_PENDING).length,
  }

  const recentOrders = orders.slice(0, 5)

  return <AgentOverview stats={stats} recentOrders={recentOrders} />
}
