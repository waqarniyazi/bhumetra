import { getOrdersByStatus } from "@/lib/services/order.service"
import { OrderStatus } from "@/lib/types"
import { PendingSamplesList } from "./components/pending-samples-list"

export default async function PendingSamplesPage() {
  const orders = await getOrdersByStatus([OrderStatus.SENT_TO_LAB, OrderStatus.UNDER_TESTING])
  return <PendingSamplesList orders={orders} />
}
