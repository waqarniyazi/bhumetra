import { redirect } from "next/navigation"
import { getOrderById } from "@/lib/services/order.service"
import { OrderStatus } from "@/lib/types"
import { PaymentSuccessPage } from "./components/payment-success-page"

interface PageProps {
  params: Promise<{ orderId: string }>
}

export default async function OrderSuccessPage({ params }: PageProps) {
  const { orderId } = await params
  const order = await getOrderById(orderId)

  if (!order || order.status === OrderStatus.PAYMENT_PENDING) {
    redirect("/dashboard/agent/orders")
  }

  return <PaymentSuccessPage order={order} />
}
