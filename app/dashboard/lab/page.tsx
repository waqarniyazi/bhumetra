import { getOrdersByStatus } from "@/lib/services/order.service"
import { OrderStatus } from "@/lib/types"
import { LabOverview } from "./components/lab-overview"

export default async function LabDashboardPage() {
  const pendingOrders = await getOrdersByStatus([OrderStatus.SENT_TO_LAB, OrderStatus.UNDER_TESTING])
  const completedOrders = await getOrdersByStatus([OrderStatus.COMPLETED])

  const stats = {
    pendingSamples: pendingOrders.filter((o) => o.status === OrderStatus.SENT_TO_LAB).length,
    underTesting: pendingOrders.filter((o) => o.status === OrderStatus.UNDER_TESTING).length,
    completedToday: completedOrders.filter((o) => {
      const today = new Date()
      const orderDate = new Date(o.updatedAt!)
      return orderDate.toDateString() === today.toDateString()
    }).length,
    totalCompleted: completedOrders.length,
  }

  return <LabOverview stats={stats} recentPending={pendingOrders.slice(0, 5)} />
}
