import { getSession } from "@/lib/auth/session"
import { getOrdersByAgentId } from "@/lib/services/order.service"
import { AgentOrdersList } from "./components/agent-orders-list"

export default async function AgentOrdersPage() {
  const session = await getSession()
  const orders = await getOrdersByAgentId(session!.linkedEntityId)

  return <AgentOrdersList orders={orders} />
}
