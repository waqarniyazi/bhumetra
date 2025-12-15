import { redirect } from "next/navigation"
import { getOrderById } from "@/lib/services/order.service"
import { getFarmerById } from "@/lib/services/farmer.service"
import { OrderStatus } from "@/lib/types"
import { PaymentPage } from "./components/payment-page"

interface PageProps {
  params: Promise<{ orderId: string }>
}

export default async function OrderPaymentPage({ params }: PageProps) {
  const { orderId } = await params
  const order = await getOrderById(orderId)

  if (!order) {
    redirect("/dashboard/agent/orders")
  }

  // If already paid, redirect to success
  if (order.status !== OrderStatus.PAYMENT_PENDING) {
    redirect(`/dashboard/agent/orders/${orderId}/success`)
  }

  const farmer = await getFarmerById(order.farmerId)

  return <PaymentPage order={order} farmer={farmer!} />
}
