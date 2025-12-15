import { getOrdersByStatus } from "@/lib/services/order.service"
import { OrderStatus } from "@/lib/types"
import { CompletedTestsList } from "./components/completed-tests-list"

export default async function CompletedTestsPage() {
  const orders = await getOrdersByStatus([OrderStatus.COMPLETED])
  return <CompletedTestsList orders={orders} />
}
